import { Trie } from "../models/trie";
import util from 'util';
import { client } from "../redis";
client.get = util.promisify(client.get);
client.set = util.promisify(client.set);

import { loadData } from "./dataLoaderService";

let trie: Trie;

export async function getTrie() : Promise<Trie> {
        if(trie) {
            return trie;
        }
        const strie : any = await client.get("trie");
        trie = new Trie();
        if(strie) {
            trie.deserialize(strie);
        } else {
            await loadData(trie);
            client.set("trie", trie.serialize());
        }
        return trie;
    }