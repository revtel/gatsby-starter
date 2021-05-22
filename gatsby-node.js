const path = require('path');

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const env = process.env.REV_ENV || 'stg';
  const commonContext = {env};

  createPage({
    path: `/`,
    component: path.resolve(`src/Templates/Landing/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/test`,
    component: path.resolve(`src/Templates/Test/index.js`),
    context: {...commonContext},
  });
};
