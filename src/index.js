/** @format */

export default function({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        const { callee, arguments: callArgs } = path.node;

        if (
          callee.type === 'MemberExpression' &&
          callee.object.name === 'React' &&
          callee.property.name === 'createElement'
        ) {
          const [type, maybeProps, ...maybeChildren] = callArgs;
          let props, children;
          if (typeof maybeProps === 'object' || maybeProps === null) {
            children = maybeChildren;
            props = maybeProps;
          } else {
            children = [maybeProps, ...maybeChildren];
            props = null;
          }

          const newChildren = children.reduce((acc, child) => {
            if (acc.length === 0 || child.type !== 'StringLiteral') {
              acc.push(child);
              return acc;
            }

            const prev = acc[acc.length - 1];
            if (prev && prev.type === 'StringLiteral') {
              prev.value = prev.value + child.value;
            } else {
              acc.push(child);
            }

            return acc;
          }, []);

          path.node.arguments = [type, props, ...newChildren];
        }
      },
    },
  };
}
