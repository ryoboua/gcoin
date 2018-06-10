import CryptoJS from 'crypto-js'

// Defining what a gcoin block is
export class Block {
    constructor(index, timestamp, data, previousHash){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.hashBlock()
    }
    hashBlock(){
        const sha256 = CryptoJS.algo.SHA256.create()
        .update(this.index.toString())
        .update(this.timestamp.toString())
        .update(JSON.stringify(this.data))
        .update(this.previousHash)
        const hash = sha256.finalize()
        return hash.toString(CryptoJS.enc.Hex)
    }
}
export const createBlockChain = () => {
    console.log('BlockChain Initiated \n')

    //Building Blockchain
    // constructing the first block known as Genesis Block
    // return an array, first array is Genesis Block
    return [
        new Block(0, Date.now(), { pow: 9, transactions: null }, '0' )
    ]
}
