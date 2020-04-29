const bibToWeb = require("./bibToWeb");
const excelToWeb = require("./excelToWeb");

module.exports = function (config) {
  const commonFields = {
    address: "Trondheim",
    booktitle: "Proceedings of the International Web Audio Conference 2019",
    editor: "",
    month: "December",
    publisher: "NTNU",
    series: "WAC'19",
    year: "2019",
    issn: "",
  };

  const xlToParse = "WAC19Metadata.xls";
  const tracks = [
    "Keynote",
    "Workshop",
    "Performance",
    "Artwork",
    "Demo",
    "Talk",
    "Poster",
    "Paper",
  ];

  for (let track of tracks) {
    excelToWeb(xlToParse, track, commonFields);
    console.log(xlToParse, track, commonFields);
  }

  //bibToWeb("src/_data/papers/bib/");

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
