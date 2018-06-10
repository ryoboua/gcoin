console.log({starting: true})

import express from 'express'
import { Block, createBlockChain } from './gCoin'
const app = express()

app.listen(3000, () => { console.log({ running: true })})

const BLOCKCHAIN = createBlockChain()
const minerAddress = 'q3nf394hjg-random-miner-address-34nf3i4nflkn3oi'

const thisNodesTracsactions = []
const peerNodes = []

app.post('/transaction', (req, res) => {

    console.log('New transaction Submitted \n')
    console.log('From IP: 127.1.1 \n')
    console.log('To IP: 123.4.5 \n')
    console.log('Amount of 100 gCoins \n')

    res.send('Transaction submission successful\n')
})
app.get('/blocks', (req, res) => {
    res.send(consensus())

})
const proofOfWork = lastpow => {
    let incrementor = lastpow + 1

    while(!(incrementor % 9 === 0 && incrementor % lastpow === 0)){
        incrementor++
    }
    return incrementor
}
const consensus = () => {
    let longestChain = BLOCKCHAIN
    const otherChains = findOtherChains()
    for(let index in otherChains){
        if(longestChain.length < otherChains[index].length)
            return longestChain = otherChains[index]
    }
    return updateBlockChain(longestChain)
}

const updateBlockChain = chain => chain.length <= BLOCKCHAIN.length ? BLOCKCHAIN : chain

const findOtherChains = () => {
    // this function should return blockchain ledger of other peers
    return [
        ['Genesis Block 0','Block 1','Block 2','Block 3','Block 4','Block 5'],
    ]
}
app.get('/mine', (req, res) => {
    const lastBlock = BLOCKCHAIN[BLOCKCHAIN.length -1]
    const lastPow = lastBlock.data.pow

    const pow = proofOfWork(lastPow)
    //Once we find a valid proof of work,
    //we know we can mine a block so
    //we reward the miner by adding a transaction
    thisNodesTracsactions.push({
        from: 'network',
        to: minerAddress,
        amount: 1
    })
    //create a new block
    const newBlockData = {
        pow,
        transactions: thisNodesTracsactions
    }
    const newBlockIndex = lastBlock.index + 1
    const newBlockTimeStamp = Date.now()
    const newBlockHash = lastBlock.hash

    const minedBlock = new Block(
        newBlockIndex,
        newBlockTimeStamp,
        newBlockData,
        newBlockHash
    )
    BLOCKCHAIN.push(minedBlock)
    res.send(BLOCKCHAIN)
})
