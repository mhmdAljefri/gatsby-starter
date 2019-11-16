/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { resolve } = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  return await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
        filter: { frontmatter: { isDraft: { ne: true } }}
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              path
              lang
              title
              tags
              templateName
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;
    let enPostsTags = [];
    let arPostsTags = [];

    posts.forEach(({ node }) => {
      const {
        templateName,
        path,
        id,
        title,
        tags,
        lang: mdLang
      } = node.frontmatter;
      const lang = mdLang || 'en';

      if (_.isArray(tags)) {
        if (lang === 'en') {
          enPostsTags = enPostsTags.concat(tags);
        } else {
          arPostsTags = arPostsTags.concat(tags);
        }
      }

      if (templateName) {
        createPage({
          path,
          tags,
          component: resolve(`./src/templates/${String(templateName)}.js`),
          context: {
            id,
            lang,
            slug: node.fields.slug,
            title,
          } // additional data can be passed via context
        });
      }
    });

    // remove duplications
    enPostsTags = _.uniq(enPostsTags);
    arPostsTags = _.uniq(arPostsTags);
    enPostsTags.forEach(tag => {
      const tagPath = `/en/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: resolve(`./src/templates/tags.js`),
        context: {
          tag,
          title: 'Tags',
          lang: 'en'
        }
      });
    });
    // TODO DRY this code for both languages
    arPostsTags.forEach(tag => {
      const tagPath = `/ar/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: resolve(`./src/templates/tags.js`),
        context: {
          tag,
          title: 'الوسوم',
          lang: 'ar'
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  fmImagesToRelative(node);

  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: resolve(__dirname, 'src/components'),
        data: resolve(__dirname, 'src/data'),
        theme: resolve(__dirname, 'src/theme'),
        hooks: resolve(__dirname, 'src/hooks'),
        contexts: resolve(__dirname, 'src/contexts'),
      }
    }
  });
};
