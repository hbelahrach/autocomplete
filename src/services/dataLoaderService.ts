import csv from "csv-parser";
import fs from "fs";
import { Trie } from "../models/trie";
import path from "path";

export function loadData (trie: Trie) {
        return new Promise((resolve) => {
            fs.createReadStream(path.join(__dirname, "/../../data.csv"))
            .pipe(csv())
            .on('data', (row) => {
              trie.insert(row['Species Common Name'].toLowerCase());
            })
            .on('end', () => {
              console.log('CSV file successfully processed');
              resolve(trie);
            });
        })
    }