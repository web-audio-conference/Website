const bibtexParse = require("bibtex-parse");
const fs = require("fs");
const path = require("path");
//const pdfNumPg = require("./pdfNumPg.js");

let mdPath = "src/posts/";
let jsonPath = "src/_data/papers/json/";

module.exports = function(bibs) {
  // Parsing bibfiles and writing md files from it

  bibFiles = fs.readdirSync(bibs);

  bibFiles.forEach(function(file) {
    let bib = fs.readFileSync(path.join(bibs, file), "utf8");
    let parsed = bibtexParse.parse(bib);

    fs.writeFileSync(
      path.join(jsonPath, "bibtojson.json"),
      JSON.stringify(parsed),
      "utf8"
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

      let newAuthors = "";

      if (parsed.entries[i].properties.hasOwnProperty("abstract")) {
        abstract = parsed.entries[i].properties.abstract.value;

        if (abstract.includes('"')) {
          abstract = abstract.replace(/"/g, "'");
        }
        if (abstract.includes("- ")) {
          abstract = abstract.replace(/- /gi, "");
        }
      } else {
        abstract = "";
      }

      address = parsed.entries[i].properties.address.value;
      author = parsed.entries[i].properties.author.value;

      if (author.includes(" and ")) {
        let authors = author.split(" and ");
        authors.forEach(function(element) {
          let revAuthor = element
            .split(",")
            .reverse()
            .join(" ");
          newAuthors += revAuthor + ",";
        });
        webAuthor = newAuthors.slice(1, -1);
      } else if (author.includes(",")) {
        let revAuthor = author.split(",").reverse();
        newAuthors += revAuthor;
        webAuthor = newAuthors.replace(",", " ").slice(1);
      } else {
        webAuthor = author;
      }

      booktitle = parsed.entries[i].properties.booktitle.value;
      editor = parsed.entries[i].properties.editor.value;
      month = parsed.entries[i].properties.booktitle.value;
      publisher = parsed.entries[i].properties.publisher.value;
      series = parsed.entries[i].properties.series.value;
      title = parsed.entries[i].properties.title.value;
      year = parsed.entries[i].properties.year.value;
      id = parsed.entries[i].id;
      type = parsed.entries[i].properties.type.value;

      if (parsed.entries[i].type == "inproceedings") {
        pdflink = `/_data/papers/pdf/${year}/${year}_${id
          .split("_")
          .slice(-1)}.pdf`;
      } else {
        pdflink = "none";
      }

      if (parsed.entries[i].properties.hasOwnProperty("url")) {
        media = parsed.entries[i].properties.url.value;
      } else {
        media = "none";
      }
      /*
      if (parsed.entries[i].type == "inproceedings") {
        try {
          pages = pdfNumPg(year, id).then(res => {
            return res;
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        pages = "";
      }
*/
      data = `--- 
title: "${title}" 
abstract: "${abstract}" 
address: "${address}" 
author: "${author}"
webAuthor: "${webAuthor}" 
booktitle: "${booktitle}" 
editor: "${editor}" 
month: "${month}"
pages: "" 
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
  });
};
