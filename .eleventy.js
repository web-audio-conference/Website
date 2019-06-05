module.exports = function(config) {
  config.addCollection('posts', collection => {
    return collection.getFilteredByGlob('src/posts/*.md');
  });

  config.addPassthroughCopy('src/assets');  // To pass through css, images and scripts to output folder (dist)

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    templateFormats: ['html', 'md', 'css', 'liquid'],
    htmlTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
    passthroughFileCopy: true
  };
};
