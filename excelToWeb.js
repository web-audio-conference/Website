const fs = require("fs");
const path = require("path");
const excel2json = require("xls-to-json");

let mdPath = "src/posts/";
let jsonPath = "src/_data/papers/json/";

module.exports = function (excelFile, sheetname, commonFields) {
  // Parsing excel sheet 1 and writing md files from it
  const excel = path.join("src/_data/papers/excel/", excelFile);
  excel2json(
    {
      input: excel, // input xls
      output: path.join(jsonPath, `${sheetname}.json`), // output json
      sheet: sheetname, // specific sheetname
      rowsToSkip: 2, // number of rows to skip at the top of the sheet; defaults to 0
    },
    function (err, result) {
      if (err) {
        console.error(err);
      } else {
        for (let x in result) {
          if (result[x]["Abstract"].includes('"')) {
            result[x]["Abstract"] = result[x]["Abstract"].replace(/"/g, "'");
          }

          let webAuthor = "";
          let bibtexAuthor = "";

          if (result[x]["Author Names"].includes(";")) {
            let authorsWithUni = result[x]["Author Names"].split(";");

            authorsWithUni.forEach((authorWUni) => {
              let author = authorWUni.split("(")[0];
              author = author.trim();
              webAuthor += author + ", ";
              let seperatedName = author.split(" ");
              if (seperatedName.length > 2) {
                let lastName = seperatedName.pop();
                seperatedName.unshift(`${lastName},`);
                var bibtexFormAuthor = seperatedName.join(" ");
              } else {
                var bibtexFormAuthor = seperatedName.reverse().join(", ");
              }
              bibtexAuthor += bibtexFormAuthor + " and ";
            });
            webAuthor = webAuthor.slice(0, -2);
            bibtexAuthor = bibtexAuthor.slice(0, -5);
          } else {
            let author = result[x]["Author Names"];
            author = author.split("(")[0];
            author = author.trim();
            webAuthor = author;
            let seperatedName = author.split(" ");
            if (seperatedName.length > 2) {
              let lastName = seperatedName.pop();
              seperatedName.unshift(`${lastName},`);
              bibtexAuthor = seperatedName.join(" ");
            } else {
              bibtexAuthor = seperatedName.reverse().join(", ");
            }
          }

          let pdfLink = `/_data/papers/pdf/${commonFields.year}/${commonFields.year}_${result[x]["Paper ID"]}.pdf`;

          let media = result[x]["Media"] != "" ? result[x]["Media"] : "none";
          console.log(media);

          let data = `---
title: "${result[x]["Paper Title"]}"
abstract: "${result[x]["Abstract"]}"
address: "${commonFields.address}"
booktitle: "${commonFields.booktitle}"
editor: "${commonFields.editor}"
month: "${commonFields.month}"
publisher: "${commonFields.publisher}"
series: "${commonFields.series}"
pages: "${result[x]["Pages"]}"
ID: "${result[x]["Paper ID"]}"
author: "${bibtexAuthor}"
webAuthor: "${webAuthor}"
track: "${result[x]["Track Name"]}"
year: "${commonFields.year}"
tags: year${commonFields.year}
media: ${media}
pdflink: "${pdfLink}"
ISSN: "${commonFields.issn}"
---`;

          fs.writeFileSync(
            path.join(
              mdPath,
              `${commonFields.year}_${result[x]["Paper ID"]}.md`
            ),
            data
          );
        }
      }
    }
  );
};
