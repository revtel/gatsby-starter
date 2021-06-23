const path = require('path');
const onCreateNode = require('./gatsby/onCreateNode');

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
    path: `/products`,
    component: path.resolve(`src/Templates/ProductList/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/product`,
    component: path.resolve(`src/Templates/ProductDetail/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/articles`,
    component: path.resolve(`src/Templates/ArticleList/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/article`,
    component: path.resolve(`src/Templates/ArticleDetail/index.js`),
    context: {...commonContext},
  });

  /**
   * **************************************************
   * Profile routes
   * **************************************************
   */

  createPage({
    path: `/profile`,
    component: path.resolve(`src/Templates/Profile/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/profile/orders`,
    component: path.resolve(`src/Templates/OrderList/index.js`),
    context: {...commonContext},
  });

  /**
   * **************************************************
   * Checkout routes
   * **************************************************
   */

  createPage({
    path: `/checkout`,
    component: path.resolve(`src/Templates/Cart/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/checkout/info`,
    component: path.resolve(`src/Templates/CheckoutInfo/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/checkout/review`,
    component: path.resolve(`src/Templates/CheckoutReview/index.js`),
    context: {...commonContext},
  });

  /**
   * **************************************************
   * Admin routes
   * **************************************************
   */

  createPage({
    path: `/admin`,
    component: path.resolve(`src/Templates/Admin/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/admin/settings`,
    component: path.resolve(`src/Templates/AdminSettings/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/admin/articles`,
    component: path.resolve(`src/Templates/AdminArticles/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/admin/products`,
    component: path.resolve(`src/Templates/AdminProductList/index.js`),
    context: {...commonContext},
  });

  createPage({
    path: `/admin/images`,
    component: path.resolve(`src/Templates/AdminImageList/index.js`),
    context: {...commonContext},
  });

  /**
   * **************************************************
   * Promo JSON generated routes
   * **************************************************
   */

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
    const {path: subPath, ...extraCtx} = JSON.parse(content);
    createPage({
      path: `/promo/${subPath}`,
      component: path.resolve(`src/Templates/PromoLanding/index.js`),
      context: extraCtx,
    });
  }

  /**
   * **************************************************
   * Markdown generated routes
   * **************************************************
   */

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
};

exports.onCreateNode = onCreateNode;
