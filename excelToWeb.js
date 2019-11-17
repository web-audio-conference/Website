const fs = require("fs");
const path = require("path");
const excel2json = require("xls-to-json");

let mdPath = "src/posts/";
let jsonPath = "src/_data/papers/json/";

module.exports = function(excelFile, sheetname) {
  // Parsing excel sheet 1 and writing md files from it
  excel = path.join("src/_data/papers/excel/", excelFile);

  excel2json(
    {
      input: excel, // input xls
      output: jsonPath, // output json
      sheet: sheetname, // specific sheetname
      rowsToSkip: 2 // number of rows to skip at the top of the sheet; defaults to 0
    },
    function(err, result) {
      if (err) {
        console.error(err);
      } else {
        fs.writeFileSync(
          path.join(jsonPath, "excelTest.json"),
          JSON.stringify(result),
          "utf8"
        );

        for (let x in result) {
          if (result[x]["Abstract"].includes('"')) {
            result[x]["Abstract"] = result[x]["Abstract"].replace(/"/g, "'");
          }

          let data = `--- 
title: "${result[x]["Paper Title"]}"
abstract: "${result[x]["Abstract"]}"
ID: "${result[x]["Paper ID"]}"
author: "${result[x]["Author Names"]}"
track: "${result[x]["Track Name"]}"
tags: year2017
ISSN: 2663-5844
---`;

          fs.writeFileSync(
            path.join(mdPath, `2017_${result[x]["Paper ID"]}.md`),
            data
          );
        }
      }
    }
  );
};
