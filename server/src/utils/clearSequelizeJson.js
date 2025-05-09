const fs = require('fs');
const path = require('path');

const filesToClear = [
  path.resolve('sequelize-data.json'),
  path.resolve('sequelize-meta.json'),
];

console.log(filesToClear);

filesToClear.forEach((filePath) => {
  fs.writeFile(filePath, JSON.stringify([]), (error) => {
    if (error) {
      console.error(`Error clearing file ${filePath}: `, error);
    } else {
      console.log(`Cleared file ${filePath}`);
    }
  });
});
