const path = require('path');
const onCreateNode = require('./gatsby/onCreateNode');
const config = require('./data.json');
const AppPages = require('./src/AppPages');

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const env = process.env.REV_ENV || 'stg';
  const commonContext = {env};

  for (const page of AppPages.pages) {
    createPage({
      path: page.path,
      component: path.resolve(page.component),
      context: {...commonContext, ...page.context},
    });
  }

  if (AppPages.config.generateAdmin) {
    const adminResourcePageNodes = (
      await graphql(
        `
          {
            allFile(filter: {relativeDirectory: {eq: "admin"}}) {
              edges {
                node {
                  internal {
                    content
                  }
                }
              }
            }
          }
        `,
      )
    ).data.allFile.edges.map(({node}) => node);

    for (const node of adminResourcePageNodes) {
      const {
        internal: {content},
      } = node;
      const resource = JSON.parse(content);
      createPage({
        path: resource.path,
        component: path.resolve(`src/Generators/AdminResource/index.js`),
        context: {resource, config},
      });
    }
  }

  if (AppPages.config.generatePromo) {
    const promoPageNodes = (
      await graphql(
        `
          {
            allFile(filter: {relativeDirectory: {eq: "promo"}}) {
              edges {
                node {
                  internal {
                    content
                  }
                }
              }
            }
          }
        `,
      )
    ).data.allFile.edges.map(({node}) => node);
    for (const node of promoPageNodes) {
      const {
        internal: {content},
      } = node;
      const {path: promoPath, ...extraCtx} = JSON.parse(content);
      createPage({
        path: promoPath,
        component: path.resolve(`src/Generators/PromoLanding/index.js`),
        context: extraCtx,
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
