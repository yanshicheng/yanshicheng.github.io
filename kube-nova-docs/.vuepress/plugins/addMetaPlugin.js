// .vuepress/addMetaPlugin.js
module.exports = (options = {}) => ({
  name: 'add-meta-plugin',
  enhanceAppFiles: [
    {
      name: 'add-meta',
      content: `
        export default ({ Vue, options, router, siteData }) => {
          document.addEventListener('DOMContentLoaded', () => {
            const meta = document.createElement('meta');
            meta.name = 'baidu-site-verification';
            meta.content = 'codeva-i1I7g2e68F';
            document.head.insertBefore(meta, document.head.firstChild);
          });
        }
      `
    }
  ]
})
