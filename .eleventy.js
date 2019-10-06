const bibtexParse = require('bibtex-parse');
const fs = require('fs');
const path = require('path');
const excel2json = require('xls-to-json');

module.exports = function(config) {
  let bibs = 'src/_data/papers/bib/';
  let excels = 'src/_data/papers/excel/';
  let mdPath = 'src/posts/';
  let jsonPath = 'src/_data/papers/json/';

  /*
  // Parsing excel sheet 1 and writing md files from it
  excel = path.join(excels, "CameraReadyPapers2017.xls");

  excel2json(
    {
      input: excel, // input xls
      output: jsonPath, // output json
      sheet: "Performances and Artworks", // specific sheetname
      rowsToSkip: 2 // number of rows to skip at the top of the sheet; defaults to 0
    },
    function(err, result) {
      if (err) {
        console.error(err);
      } else {
        
        fs.writeFileSync(
          path.join(jsonPath, "test.json"),
          JSON.parse(result),
          "utf8");
        
        //console.log(result.length);
        for (let x in result) {
          fs.writeFileSync(
            path.join(mdPath, `2017_${result[x]["Paper ID"]}.md`),
            "---\ntitle: "" +
              result[x]["Paper Title"] +
              """ +
              "\nabstract: "" +
              result[x]["Abstract"] +
              """ +
              "\ntags: " +
              "year2017" +
              "\n---"
          );
        }
      }
    }
  );
*/
  // Parsing bibfiles and writing md files from it
  bibFiles = fs.readdirSync(bibs);

  bibFiles.forEach(function(file) {
    year = file.slice(3, 6);

    let bib = fs.readFileSync(path.join(bibs, file), 'utf8');
    let parsed = bibtexParse.parse(bib);
    fs.writeFileSync(
      path.join(jsonPath, 'bibtojson.json'),
      JSON.stringify(parsed),
      'utf8'
    );

    for (let i in parsed.entries) {
      let title,
        abstract,
        booktitle,
        pages,
        author,
        editor,
        year,
        month,
        publisher,
        address,
        issn,
        id,
        pdflink;

      abstract = parsed.entries[i].properties.abstract.value;
      if (abstract.includes('"')) {
        abstract = abstract.replace(/"/g, "'");
      }
      if (abstract.includes('- ')) {
        abstract = abstract.replace(/- /gi, '');
      }
      address = parsed.entries[i].properties.address.value;
      author = parsed.entries[i].properties.author.value;
      booktitle = parsed.entries[i].properties.booktitle.value;
      editor = parsed.entries[i].properties.editor.value;
      month = parsed.entries[i].properties.booktitle.value;
      if (parsed.entries[i].properties.hasOwnProperty('pages')) {
        pages = parsed.entries[i].properties.pages.value;
      } else {
        pages = '';
      }
      publisher = parsed.entries[i].properties.publisher.value;
      series = parsed.entries[i].properties.series.value;
      title = parsed.entries[i].properties.title.value;
      year = parsed.entries[i].properties.year.value;
      id = parsed.entries[i].id;
      type = parsed.entries[i].properties.type.value;

      pdflink = `/_data/papers/pdf/2017/${id.slice(-2)}.pdf`;
      if (id.slice(-2).includes('_')) {
        pdflink = `/_data/papers/pdf/2017/${id.slice(-1)}.pdf`;
      }
      data = `--- 
  title: "${title}" 
  abstract: "${abstract}" 
  address: "${address}" 
  author: "${author}" 
  booktitle: "${booktitle}" 
  editor: "${editor}" 
  month: "${month}"
  pages: "${pages}" 
  publisher: "${publisher}" 
  series: "${series}"
  type: "${type}"  
  year: "${year}" 
  id: "${id}" 
  tags: year${year} 
  pdflink: ${pdflink}
---`;

      fs.writeFileSync(path.join(mdPath, `${id}.md`), data);
    }
    /*
    title = parsed.entries[0].properties.title.value.slice(1, -1);
    if (title.includes("{\\&}")) {
      title = title.replace(/{\\&}/gi, "&");
    }
    abstract = parsed.entries[0].properties.abstract.value;
    if (abstract.includes("{\\&}")) {
      abstract = abstract.replace(/{\\&}/gi, "&");
    }
    */
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
