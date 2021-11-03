const fs = require("fs");
const path = require('path');

const year = "2021";
const dir = `src/_data/papers/pdf/${year}/`;
const folderName = "CameraReadys 2-60/";
const subfolderName = 'CameraReady'


let folders = fs.readdirSync(path.resolve(__dirname, dir, folderName));
console.log(folders.length)

for (let folder of folders){
  let files = fs.readdirSync(path.resolve(__dirname, dir, folderName, folder, subfolderName))
  for (let file of files){

      var oldPath = path.resolve(__dirname, dir, folderName, folder, subfolderName, file);
      var newPath = path.resolve(__dirname, dir, year+'_'+ folder +'.pdf');

      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed to '+ newPath)
      })
  }
}
