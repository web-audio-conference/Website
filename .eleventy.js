module.exports = function(config) {
  config.addCollection('posts', collection => {
    return collection.getFilteredByGlob('src/posts/*.md');
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    templateFormats: ['html', 'md', 'css', 'liquid'],
    htmlTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid'
  };
};
