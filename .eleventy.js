const bibtexParse = require('bibtex-parse');
const fs = require('fs');
const path = require('path');

module.exports = function(config) {
  let bibs = 'src/_data/papers/bib';
  let mdPath = 'src/posts/';
  let title, abstract;

  bibFiles = fs.readdirSync(bibs);

  bibFiles.forEach(function(file) {
    newFileName = file.slice(0, -4);

    let bib = fs.readFileSync(path.join(bibs, file), 'utf8');
    let parsed = bibtexParse.parse(bib);

    /*     fs.writeFileSync(
      path.join(jsons, newFileName + '.11tydata.json'),
      JSON.stringify(parsed),
      'utf8'
    ); */

    title = parsed.entries[0].properties.title.value.slice(1, -1);
    if (title.includes('{\\&}')) {
      title = title.replace(/{\\&}/gi, '&');
    }
    abstract = parsed.entries[0].properties.abstract.value;
    if (abstract.includes('{\\&}')) {
      abstract = abstract.replace(/{\\&}/gi, '&');
    }

    fs.writeFileSync(
      path.join(mdPath, newFileName + '.md'),
      '---\ntitle: "' +
        title +
        '"' +
        '\nabstract: "' +
        abstract +
        '"' +
        '\ntags: ' +
        'year' +
        newFileName.slice(0, 4) +
        '\n---'
    );
  });

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
