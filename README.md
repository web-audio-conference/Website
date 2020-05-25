# Web Audio Conference website

## Get started

1. Install Node.js from [Node.js](https://nodejs.org/en/) or [NVM](https://github.com/nvm-sh/nvm).
2. Clone the repository
3. Run "npm install" to install dependencies.
4. Run "npm start" to build folder called "dist" and to serve it on your local network.

## Website purpose

This website serves all previous proceedings of the Web Audio Conference since its beginning in 2015. All proceedings are listed by year and track (Papers, Posters, Talks etc), and each conference item has its own webpage, displaying its abstract, BibTeX, and link to PDF and video if these are available.

## Built with

- Basics: HTML, CSS, Javascript, Markdown, Liquid, YAML
- [11ty](https://www.11ty.io/) - Static site generator
- [Bootstrap](https://getbootstrap.com/) - Front-end component library (Styling, responsive design)
- External Node packages (npm modules)
  - [bibtex-parse](https://www.npmjs.com/package/bibtex-parse) - Parse BibTeX to JSON
  - [xls-to-json](https://www.npmjs.com/package/xls-to-json) - Converts XLS files to JSON
  - BibTex collections generated with Mendeley and special characters handled in JabRef.

## Process of adding a new year

- Export the xls-file from CMT.
- Go through the xls-file.
  1. Make sure it has no special caracters in the author names, captitalised names etc.
  2. Add columns in the xls-files for pagination and Media-links. You can take a look at the [xls-file from 2019](src/_data/papers/excel) and see how it should be added. The media-links are links to external sources, eg. Youtube.
  3. The script separates names by the character ";". Make sure that character is not used for anything else in "Author Names". The script removes the institutions in parantheses, so you do not have to remove those manually. Just make sure there are no ";" in there.
- Add all the pdf's to a new folder with the current year in [this folder](src/_data/papers/pdf).
- Every pdf should be named in the format "year_id". You can use the script [pdfRename](pdfRename.js) to rename every pdf in the new folder to this format. The ID should already be present in the old title, coming from the CMT system. to run it write "node pdfRename.js" in the terminal.
- Go to [ProceedingsTemp.html](ProceedingsTemp.html), and edit all occurences of 2019 to the year of the new proceedings. Also make sure to add/remove tracks to fit your xls-file if needed.
- Copy the edited code and paste it above the last year (line 30) in [proceedings.html](src/proceedings.html).
- Go to [eleventy.js](.eleventy.js) and edit the commonFields object values (line 7 to 14) to the values of the current proceedings. The commonFields object holds key-value pairs that are common to all conference items, eg. address, publisher, issn.
- Change the name of the xls-file to the current year's xls-file on line 17.
- Make sure you have saved both eleventy.js and proceedings.html.
- Run "npm start" in the terminal. This will build the dist-folder which can be served on https://webaudioconf.com/.

If you encounter problems, it might be due to unexpected differences in the xls-file for the current year to the last year. You can debug what is going wrong in the terminal. We have not made the system handle all possible exceptions. If you have to (and please, if you want to) you can update [excelToWeb.js](excelToWeb.js) and make it handle your exceptions.

All updates to the system that will improve the smooothness and lead to fewer steps needed for updating the proceedings are very much welcome!

## BibTeX format

Every conference item page displays a BibTeX format, and it takes this form:

```
@inproceedings{YYYY_ID,
  abstract = {Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.},
  address = {City, Country},
  author = {Surname1, Name1 and Surname2, Name2 and Surname3, Name3},
  booktitle = {Proceedings of the  International Web Audio  Conference},
  editor = {Surname4, Name4 and Surname5, Name5 and Surname6, Name6},
  month = {Month},
  pages = {0--00},
  publisher = {PublisherName},
  series = {WAC 'YY},
  title = {Title of the Paper},
  year = {YYYY},
  ISSN = {2663-5844}
}
```

Dynamic content that is fed by the xls-file includes:

- ID
- Abstract
- Author
- Pages
- Title

Content that is directly changed in the [eleventy.js](.eleventy.js)-file includes:

- Address
- Editor
- Month
- Publisher
- Series
- Year

Content that always stays the same:

- Booktitle
- ISSN

## How it has been built

Since there are a lot of proceedings, and there will be plenty more every year into the future, it is preferable to have this part of the website "build itself".

Every conference item from 2015 until 2018 is built by extracting data from BibTeX-collections. This has been achieved using the bibtex-parse package, which is used in the module called "bibToWeb.js". In this module we convert the BibTeX-collection to JSON, loop through the JSON data, and extract the data we want to have diplayed on the website, or present in the BibTeX we display on the conference item pages. The extracted data is then written to markdown-files as YAML. When the loop is finished it has built a markdown-file for each conference item, and these files are what is passed to the output directory (dist) during the build process.

When 11ty builds the website it looks in its configuration file, called .eleventy.js. Here we run the bibToWeb.js module, so that it is included in the build process. If this is how 11ty wants us to do things... We have no idea, but it turned out to work.

## From 2019 and into the future!

From 2019 and forward we build these conference item pages from excel files. This has been achived using the module called xls-to-json, which converts excel-sheets to JSON, and is used in the module called excelToWeb.js. The extraction and build process is then almost identical to the one in bibToWeb. A step by step description on how to use the system is explained in section ["Process of adding a new year"](#Process-of-adding-a-new-year).

## Code optimalization and improved automation of adding a new year

The code is written to do its work, and few iterations are made. If you want to contribute, please do all the improvements you see necessary. Maybe the most needed work to be done is the automation of the steps involving changes to proceedings.html, where you have to edit a bunch of code in the ProceedingsTemp.html and then paste it into proceedings.html. it should be possible to eliminate these steps completely. Not all the files that are passed to the dist-folder are necessary to serve, so if you want you can exclude them in eleventy.js.

## Improving design

Design has not been the main focus of the work done on this project. If you have some design and css skills, please make a new design branch and push some design updates!

## Credits

### Proceedings 2015-2019

#### Website developed by:

- Jørgen Varpe

#### BibTeX metadata made by:

- Eigil Aandahl

#### Technical supervision by:

- Gerard Roma

#### Usability supervision and project coordination by:

- Anna Xambó

#### Code contribution by:

- Jan Monschke

#### Supported by:

- Audio Communication Group at Technische Universität Berlin

#### Special thanks to:

Norbert Schnell, Guillaume Pelerin, Jason Freeman, Alessia Milo, Florian Thalmann, Sebastian Ewert, Ken O’Hanlon, Christoph Guttandin, Jan Monschke, Athanasios Lykartsis and Stefan Weinzierl.

#### Related publications:

- Jørgen Varpe, Eigil Aandahl (2019) [The new WAC website: towards a sustainable conference](https://webaudioconf.com/posts/2019_46/). In Proceedings of the Web Audio Conference 2019 (WAC ’19). Trondheim, Norway. pp. 113.
