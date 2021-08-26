import { TrieNode } from './trieNode';

class Trie {
    root: TrieNode

    constructor() {
        this.root = new TrieNode("/");
    }

    insert(word: string){
        let node = this.root;
        for(const char of word) {
            if(node.children[char]) {
                node = node.children[char];
            } else {
                node.children[char] = new TrieNode(char);
                node = node.children[char];
            }
        }
    }

    contains(word: string) {
        let node = this.root;
        for(const char of word) {
            if(node.children[char]) {
                node = node.children[char];
            } else {
                return false;
            }
        }
        return true;
    }

    find(prefix?: string) {
        const words: string[] = [];
        let node = this.root;

        if(!prefix) {
            return node.getWords();
        }

        for(const char of prefix) {
            if(!node.children[char]) {
                return words;
            }
            node = node.children[char];
        }

        return node.getWords().map((word) => prefix.slice(0,prefix.length - 1) + word);
    }

    serialize() {
        return JSON.stringify(this);
    }

    deserialize(json: string) {
      const strie = JSON.parse(json);
      if(strie && strie.root) {
          const newNode = new TrieNode();
          newNode.deserialize(strie.root)
          this.root = newNode
      }
    }
}

export { Trie };