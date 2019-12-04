const bibtexParse = require("bibtex-parse");
const fs = require("fs");
const path = require("path");
const pdfNumPg = require("./pdfNumPg.js");

let mdPath = "src/posts/";
let jsonPath = "src/_data/papers/json/";

module.exports = function(bibs) {
  // Parsing bibfiles and writing md files from it

  const bibFiles = fs.readdirSync(bibs);

  bibFiles.forEach(function(file) {
    const bib = fs.readFileSync(path.join(bibs, file), "utf8");
    const parsed = bibtexParse.entries(bib);

    fs.writeFileSync(
      path.join(jsonPath, "bibtojson2.json"),
      JSON.stringify(parsed),
      "utf8"
    );

    for (let i in parsed) {
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
        media,
        track,
        type,
        webAuthor;

      let newAuthors = "";

      if (parsed[i].hasOwnProperty("ABSTRACT")) {
        abstract = parsed[i].ABSTRACT;

        if (abstract.includes('"')) {
          abstract = abstract.replace(/"/g, "'");
        }
        if (abstract.includes("- ")) {
          abstract = abstract.replace(/- /gi, "");
        }
      } else {
        abstract = "";
      }

      address = parsed[i].ADDRESS;
      author = parsed[i].AUTHOR;

      if (author.includes(" and ")) {
        const authors = author.split(" and ");
        authors.forEach(function(element) {
          let revAuthor = element
            .split(",")
            .reverse()
            .join(" ");
          newAuthors += revAuthor + ",";
        });
        webAuthor = newAuthors.slice(1, -1);
      } else if (author.includes(",")) {
        const revAuthor = author.split(",").reverse();
        newAuthors += revAuthor;
        webAuthor = newAuthors.replace(",", " ").slice(1);
      } else {
        webAuthor = author;
      }

      booktitle = parsed[i].BOOKTITLE;
      editor = parsed[i].EDITOR;
      month = parsed[i].MONTH;
      publisher = parsed[i].PUBLISHER;
      series = parsed[i].SERIES;
      title = parsed[i].TITLE;
      year = parsed[i].YEAR;
      id = parsed[i].key;
      type = parsed[i].type;
      track = parsed[i].TYPE;

      if (type == "inproceedings") {
        pdflink = `/_data/papers/pdf/${year}/${year}_${id
          .split("_")
          .slice(-1)}.pdf`;
      } else {
        pdflink = "none";
      }

      if (parsed[i].hasOwnProperty("URL")) {
        media = parsed[i].URL;
      } else {
        media = "none";
      }
      /*
      if (parsed[i].type == "inproceedings") {
        try {
          pdfNumPg(year, id).then(pages => {
            data = `--- 
title: "${title}" 
abstract: "${abstract}" 
address: "${address}" 
author: "${author}"
webAuthor: "${webAuthor}" 
booktitle: "${booktitle}" 
editor: "${editor}" 
month: "${month}"
pages: "1-${pages}" 
publisher: "${publisher}" 
series: "${series}"
track: "${track}"  
year: "${year}" 
id: "${id}" 
tags: year${year}
media: ${media} 
pdflink: ${pdflink}
ISSN: 2663-5844
---`;

            fs.writeFileSync(path.join(mdPath, `${id}.md`), data);
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        pages = "";
      }
*/
      const data = `--- 
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
track: "${track}"  
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
