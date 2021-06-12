module.exports = exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const {relativeDirectory} = getNode(node.parent);
    createNodeField({
      node,
      name: 'slug',
      value: `/${relativeDirectory}`,
    });
  }

  return;
};
