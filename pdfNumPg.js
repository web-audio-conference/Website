const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

module.exports = function(year) {
  let pdfDir = fs.readdirSync(`src/_data/papers/pdf/${year}`);

  pdfDir.forEach(function(file) {
    let dataBuffer = fs.readFileSync(
      path.join('src/_data/papers/pdf/2018', file)
    );

    pdfParse(dataBuffer).then(function(data) {
      // number of pages
      return data.numpages;
    });
  });
};
