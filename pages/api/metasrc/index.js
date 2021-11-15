
const ethers = require("ethers");
const base64 = require('base-64');
const web3 = require ('web3');
const { corruptionABI } = require("./abi.js");
const corruptionAddress = "0x64449bc72c47dc79d840ba724f53afdb3a8d64b6";




class Corruption {
  constructor(rpcProvider) {
    rpcProvider = "https://mainnet.infura.io/v3/752f065f467246a686ba54b11f77dcfd"
    const rpc = new ethers.providers.JsonRpcProvider(rpcProvider);
    const Corruption = new ethers.Contract(corruptionAddress, corruptionABI, rpc);
    this.Corruption = Corruption;
  }

  async tokenURI(corruptionId) {
    const r = /\d+/;

    let id = corruptionId.split("id=")[1]
    id = id.match(r)

    let insight = corruptionId.split("insight=")[1]
    insight = insight.match(r)
    let insightInt = parseInt(insight) 

    let token = await this.Corruption.tokenURI(parseInt(id), insightInt);    
    token = base64.decode(token.split(',')[1])
    let image = JSON.parse(token).image
    image = base64.decode(image.split(",")[1])
    return image;
  }

}

module.exports = Corruption;
