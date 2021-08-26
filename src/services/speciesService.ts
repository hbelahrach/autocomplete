import { Trie } from "../models/trie";
import { getTrie } from "./trieService"

export  async function find(prefix?: string) {
        const trie : Trie  =  await getTrie();
        return trie.find(prefix);
}