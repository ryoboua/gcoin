import CryptoJS from 'crypto-js'

// Define what a gcoin block is
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

const createGenesisBlock = () => {
    // constructing the first block
    return new Block(0, Date.now(), {
        pow: 9,
        transactions: null
    }, '0' )
}

const nextBlock = lastBlock => {
    const index = lastBlock.index + 1
    const timestamp = Date.now()
    const data = lastBlock.data
    const previous_hash = lastBlock.hash

    return new Block(index, timestamp, data, previous_hash)
}


export const BLOCKCHAIN = [createGenesisBlock()]
let previousBlock = BLOCKCHAIN[0]

// const numberOfBlocksToAdd = 20

// for (let i = 0; i < numberOfBlocksToAdd; i++){
//     const blockToAdd = nextBlock(previousBlock)
//     BLOCKCHAIN.push(blockToAdd)
//     previousBlock = blockToAdd
// }
console.log(BLOCKCHAIN)
console.log('BlockChain Initiated \n')
const gCoin = {
    BLOCKCHAIN, Block
}
export default gCoin
