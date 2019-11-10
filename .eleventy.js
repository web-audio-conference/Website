const bibToWeb = require('./bibToWeb');
const excelToWeb = require('./excelToWeb');

module.exports = function(config) {
  bibToWeb('src/_data/papers/bib/');

  //excelToWeb('CameraReadyPapers2017.xls');

  config.addCollection('posts', collection => {
    return collection.getFilteredByGlob(['src/posts/*.md']);
  });

  config.addPassthroughCopy('src/assets'); // To pass through css, images and scripts to output folder (dist)

  config.addPassthroughCopy('src/_data/papers');

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
