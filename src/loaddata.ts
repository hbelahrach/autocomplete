import csv from "csv-parser";
import fs from "fs";
import {Trie} from "./models/trie";

const trie = new Trie();

fs.createReadStream(__dirname  + "/../data.csv")
  .pipe(csv())
  .on('data', (row) => {
    trie.insert(row['Species Common Name'].toLowerCase());

  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

export default trie;