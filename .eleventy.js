const bibToWeb = require("./bibToWeb");
const excelToWeb = require("./excelToWeb");

module.exports = function (config) {
  const commonFields = {
    // Change values to the current
    address: "Barcelona, Spain",
    booktitle: "Proceedings of the International Web Audio Conference", // No changes required
    editor: "Joglar-Ongay, Luis and Serra, Xavier and Font, Frederic and Tovstogan, Philip and Stolfi, Ariane and A. Correya, Albin and Ramires, Antonio and Bogdanov, Dmitry and Faraldo, Angel and Favory, Xavier", //Write in bibtex format
    month: "July",
    publisher: "UPF",
    series: "WAC '21",
    year: "2021",
    issn: "2663-5844", // No changes required
  };

  const xlToParse = "WAC21Metadata.xls"; //Change to current year's xls-file
  const tracks = [
    "Keynote",
    "Workshop",
    "Performance",
    "Artwork",
    "Demo",
    "Talk",
    "Paper",
  ];
  
  for (let track of tracks) {
    excelToWeb(xlToParse, track, commonFields);
  }

  bibToWeb("src/_data/papers/bib/");

  config.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob(["src/posts/*.md"]);
  });

  config.addPassthroughCopy("src/assets"); // To pass through css, images and scripts to output folder (dist)

  config.addPassthroughCopy("src/_data/papers");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    templateFormats: ["html", "md", "css", "liquid"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
    passthroughFileCopy: true,
  };
};
