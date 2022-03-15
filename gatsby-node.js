const path = require('path');
const onCreateNode = require('./gatsby/onCreateNode');
const onCreateWebpackConfig = require('./gatsby/onCreateWebpackConfig');
const config = require('./data.json');
const AppPages = require('./src/AppPages');

function queryJsonByDir(dirname) {
  return `
    {
      allFile(filter: {relativeDirectory: {eq: "${dirname}"}}) {
        edges {
          node {
            name
            relativeDirectory
            internal {
              content
            }
          }
        }
      }
    }
  `;
}

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const _createPage = ({path: pagePath, component, context}) => {
    if (config.um) {
      createPage({
        path: pagePath,
        component: path.resolve('src/Templates/UnderMaintain/index.js'),
        context: {...commonContext, ...context},
      });
    } else {
      createPage({
        path: pagePath,
        component: path.resolve(component),
        context: {...commonContext, ...context},
      });
    }
  };

  const env = process.env.REV_ENV || 'stg';
  const commonContext = {env};

  for (const page of AppPages.pages) {
    _createPage({
      path: page.path,
      component: path.resolve(page.component),
      context: {...commonContext, ...page.context},
    });
  }

  if (AppPages.config.generateAdmin) {
    const adminResourcePageNodes = (
      await graphql(queryJsonByDir('admin'))
    ).data.allFile.edges.map(({node}) => node);

    const customAdminResourcePageNodes = (
      await graphql(queryJsonByDir('custom-admin'))
    ).data.allFile.edges.map(({node}) => node);

    const finalAdminNodes = new Map();

    for (const node of adminResourcePageNodes) {
      finalAdminNodes.set(node.name, node);
    }

    for (const node of customAdminResourcePageNodes) {
      finalAdminNodes.set(node.name, node);
    }

    for (const [_, node] of finalAdminNodes) {
      const {
        name,
        relativeDirectory,
        internal: {content},
      } = node;
      const resource = JSON.parse(content);
      console.log(
        `[Admin] create ${resource.path} from ${relativeDirectory}/${name}.json...`,
      );
      createPage({
        path: resource.path,
        component: path.resolve(`src/Generators/AdminResource/index.js`),
        context: {resource, config},
      });
    }
  }

  if (AppPages.config.generateMarkdown) {
    const allMdNodes = (
      await graphql(
        `
          {
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,
      )
    ).data.allMarkdownRemark.edges.map(({node}) => node);

    for (const node of allMdNodes) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/Templates/BlogDetail/index.js`),
        context: {slug: node.fields.slug},
      });
    }
  }
};

exports.onCreateNode = onCreateNode;
exports.onCreateWebpackConfig = onCreateWebpackConfig;
