const bibtexParse = require('bibtex-parse');
const fs = require('fs');
const path = require('path');
//const parser = new (require('simple-excel-to-json')).XlsParser();
const excel2json = require('xls-to-json');

module.exports = function(config) {
  let bibs = 'src/_data/papers/bib';
  let excels = 'src/_data/papers/excel/';
  let mdPath = 'src/posts/';
  let jsonPath = 'src/_data/papers/json/';
  let title, abstract;

  excel = path.join(excels, 'CameraReadyPapers2017.xls');

  excel2json(
    {
      input: excel, // input xls
      output: jsonPath, // output json
      sheet: 'Performances and Artworks', // specific sheetname
      rowsToSkip: 2 // number of rows to skip at the top of the sheet; defaults to 0
    },
    function(err, result) {
      if (err) {
        console.error(err);
      } else {
        //console.log(result);
        fs.writeFileSync(
          path.join(jsonPath, 'test.json'),
          JSON.parse(result),
          'utf8'
        );
      }
    }
  );

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
