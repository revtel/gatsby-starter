/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const data = require('./data.json');

const GatsbyConfig = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `RevtelSite`,
        short_name: `RevtelSite`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/favicon.ico`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    // this is required for promo page generation, which uses json format
    `gatsby-transformer-json`,
    // this is for markdown files
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              // TODO: not sure why this doesn't work... for now we will compensate
              // the offset in BlogDetail page manually
              offsetY: 80,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-less',
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': 'orange',
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
  ],
};

if (data.gaId !== '') {
  console.log('****** gaId', data.gaId);
  GatsbyConfig.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      // The property ID; the tracking code won’t be generated without it
      trackingId: data.gaId,
      // Defines where to place the tracking script - `true` in the head and `false` in the body
      head: false,
      // Setting this parameter is optional
      anonymize: true,
      // Setting this parameter is also optional
      respectDNT: true,
      // Avoids sending pageview hits from custom paths
      exclude: [],
      // Delays sending pageview hits on route update (in milliseconds)
      pageTransitionDelay: 0,
      // Defers execution of google analytics script after page load
      optimizeId: 'ec',
    },
  });
}

if (data.gtmId !== '') {
  console.log('****** gtmId', data.gtmId);
  GatsbyConfig.plugins.push({
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: data.gtmId,
      includeInDevelopment: false,
      defaultDataLayer: {platform: 'gatsby FE'},
      enableWebVitalsTracking: true,
      routeChangeEventName: 'route-change',
    },
  });
}

if (data.fbPixelId !== '') {
  console.log('****** fbPixelId', data.fbPixelId);
  GatsbyConfig.plugins.push({
    resolve: `gatsby-plugin-facebook-pixel`,
    options: {
      pixelId: data.fbPixelId,
    },
  });
}

module.exports = GatsbyConfig;
