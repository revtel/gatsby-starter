const path = require('path');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

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

  const promoPages = (
    await graphql(
      `
        query MyQuery {
          allFile(filter: {relativeDirectory: {eq: "promo"}}) {
            edges {
              node {
                id
                name
                dir
                ext
                absolutePath
              }
            }
          }
        }
      `,
    )
  ).data.allFile.edges;

  for (const {node} of promoPages) {
    const {path: promoPath, ...extraCtx} = JSON.parse(
      (await readFile(node.absolutePath)).toString(),
    );
    createPage({
      path: `/promo/${promoPath}`,
      component: path.resolve(`src/Templates/PromoLanding/index.js`),
      context: extraCtx,
    });
  }
};
