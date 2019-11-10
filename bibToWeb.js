const bibtexParse = require('bibtex-parse');
const fs = require('fs');
const path = require('path');

let mdPath = 'src/posts/';
let jsonPath = 'src/_data/papers/json/';

module.exports = function(bibs) {
  // Parsing bibfiles and writing md files from it
  bibFiles = fs.readdirSync(bibs);

  bibFiles.forEach(function(file) {
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
        id,
        pdflink,
        media;

      let newAuthors = '';
      let newEditors = '';

      if (parsed.entries[i].properties.hasOwnProperty('abstract')) {
        abstract = parsed.entries[i].properties.abstract.value;

        if (abstract.includes('"')) {
          abstract = abstract.replace(/"/g, "'");
        }
        if (abstract.includes('- ')) {
          abstract = abstract.replace(/- /gi, '');
        }
      } else {
        abstract = '';
      }

      address = parsed.entries[i].properties.address.value;
      author = parsed.entries[i].properties.author.value;

      if (author.includes(' and ')) {
        let authors = author.split(' and ');
        authors.forEach(function(element) {
          let revAuthor = element
            .split(',')
            .reverse()
            .join(' ');
          newAuthors += revAuthor + ',';
        });
        author = newAuthors.slice(1, -1);
      } else if (author.includes(',')) {
        let revAuthor = author.split(',').reverse();
        newAuthors += revAuthor;
        author = newAuthors.replace(',', ' ').slice(1);
      } else {
        author = author;
      }

      booktitle = parsed.entries[i].properties.booktitle.value;
      editor = parsed.entries[i].properties.editor.value;

      if (editor.includes(' and ')) {
        let editors = editor.split(' and ');
        editors.forEach(function(element) {
          let revEditor = element
            .split(',')
            .reverse()
            .join(' ');
          newEditors += revEditor + ',';
        });
        editor = newEditors.slice(1, -1);
      } else if (editor.includes(',')) {
        let revEditor = editor.split(',').reverse();
        newEditors += revEditor;
        editor = newEditor.replace(',', ' ').slice(1);
      } else {
        author = author;
      }

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

      pdflink = `/_data/papers/pdf/${year}/${year}_${id
        .split('_')
        .slice(-1)}.pdf`;

      if (parsed.entries[i].properties.hasOwnProperty('url')) {
        media = parsed.entries[i].properties.url.value;
      } else {
        media = 'none';
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
media: ${media} 
pdflink: ${pdflink}
ISSN: 2663-5844
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
};
