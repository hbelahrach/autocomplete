class TrieNode {
    character: string
    children : {[key: string]: TrieNode}

    constructor(character?: string) {
        this.character = character;
        this.children = {};
    }

    getWords(chars: string[] = [], words: string[] = []) {
        if(this.character !== "/") {
            chars.push(this.character);
        }
        for(const [key, child] of Object.entries(this.children)) {
            child.getWords(chars, words);
        }
        if(Object.keys(this.children).length === 0){
            words.push(chars.join(""));
        }
        chars.pop();
        return words;
    }

    deserialize(json: any) {
      const snode = json;
      if(snode) {
        this.character = snode.character;
        for(const [key, value] of Object.entries(snode.children)) {
            if(key) {
                const newNode = new TrieNode();
                newNode.deserialize(value);
                this.children[key] = newNode;
            }
        }
      }
    }
}

export {TrieNode};