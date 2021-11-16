
const ethers = require("ethers");
const base64 = require('base-64');
const web3 = require ('web3');
const { corruptionABI } = require("./abi.js");
const corruptionAddress = "0x5bdf397bb2912859dbd8011f320a222f79a28d2e";


const randomStrings = [
  "/",
  "$",
  "|",
  "8",
  "_",
  "?",
  "#",
  "%",
  "^",
  "~",
  ":",
  "#022FB7",
  "#262A36",
  "#A802B7",
  "#3CB702",
  "#B76F02",
  "#B70284",
  "#0D1302",
  "#020A13",
  "#130202",
  "#1A1616",
  "#000000",
  "#040A27",  
  "GENERATION",
  "INDIVIDUAL",
  "TECHNOLOGY",
  "EVERYTHING",
  "EVERYWHERE",
  "UNDERWORLD",
  "ILLUMINATI",
  "TEMPTATION",
  "REVELATION",
  "CORRUPTION"
]


const maxMultiplier = 24;

class Corruption {
  constructor(rpcProvider) {
    rpcProvider = "https://mainnet.infura.io/v3/752f065f467246a686ba54b11f77dcfd"
    const rpc = new ethers.providers.JsonRpcProvider(rpcProvider);
    const Corruption = new ethers.Contract(corruptionAddress, corruptionABI, rpc);
    this.Corruption = Corruption;
  }

  /*
  * Need to write this for big int modulos
  */
  modulo (divident, divisor) {
    var cDivident = '';
    var cRest = '';

    for (var i in divident ) {
        var cChar = divident[i];
        var cOperator = cRest + '' + cDivident + '' + cChar;

        if ( cOperator < parseInt(divisor) ) {
                cDivident += '' + cChar;
        } else {
                cRest = cOperator % divisor;
                if ( cRest == 0 ) {
                    cRest = '';
                }
                cDivident = '';
        }

    }
    cRest += '' + cDivident;
    if (cRest == '') {
        cRest = 0;
    }
    return cRest;
  }

  async insight(corruptionId) {
    let insight = await this.Corruption.insight(corruptionId);    
    return JSON.parse(insight);
  }

  async insightMap(corruptionId) {
    let insightMap = await this.Corruption.insightMap(corruptionId);
    const insightMapParsed = {
      savedXP: JSON.parse(insightMap[0]),
      lastSavedBlock : JSON.parse(insightMap[1])
    }
    return insightMapParsed;
  }


  async tokenURI(corruptionId) {
    let token = await this.Corruption.tokenURI(corruptionId);    
    token = base64.decode(token.split(',')[1])
    let image = JSON.parse(token).image
    image = base64.decode(image.split(",")[1])
    return image;
  }

  async phrase(corruptionId) {
    const hash = ethers.utils.solidityKeccak256(['string', 'uint256'], ["PHRASE", corruptionId])      
    let intString = (web3.utils.hexToNumberString(hash))
    let int = parseInt(this.modulo(intString, 10)) + 23
    return randomStrings[int];
  }
  
  async backgroundColor(corruptionId) {
    const hash = ethers.utils.solidityKeccak256(['string', 'uint256'], ["BGCOLOR", corruptionId])    
    let intString = (web3.utils.hexToNumberString(hash))
    let int = parseInt(this.modulo(intString, 6))
    return randomStrings[int];
  }

  async hiddenAttribute(corruptionId) {
    const hash = ethers.utils.solidityKeccak256(['string', 'uint256'], ["FGCOLOR", corruptionId])      
    let intString = (web3.utils.hexToNumberString(hash))
    let int = parseInt(this.modulo(intString, 6)) + 27
    return randomStrings[int];
  }
  
  async border(corruptionId) {
    const hash = ethers.utils.solidityKeccak256(['string', 'uint256'], ["BORDER", corruptionId])      
    let intString = (web3.utils.hexToNumberString(hash))
    let int = this.modulo(intString, 11)
    return randomStrings[int];
  }

  async corruptor(corruptionId) {
    const hash = ethers.utils.solidityKeccak256(['string', 'uint256'], ["CORRUPTOR", corruptionId])      
    let intString = (web3.utils.hexToNumberString(hash))
    let int = this.modulo(intString, 11)
    return randomStrings[int];
  }

  async unsavedInsight(tokenID) {
    const insightMap = await this.insightMap(tokenID) 
    var w3 = new web3("https://mainnet.infura.io/v3/752f065f467246a686ba54b11f77dcfd");    
    const currentBlock = await w3.eth.getBlockNumber()
    const lastBlock = insightMap.lastSavedBlock
    const savedXP = insightMap.savedXP
    
    if (lastBlock == 0) {
        return 0;
    }

    const delta = currentBlock - lastBlock;
    const maxMultipler = 24

    const multiplier = delta / 200000;
    if (multiplier > maxMultiplier) {
        multiplier = maxMultiplier;
    }

    const total = savedXP + (delta * (multiplier + 1) / 10000);

    return total;
  }

  corruption(corruptionId) {
    return  corruptionId % 1024;
  }

  async attributes(corruptionId) {
    const insight = await this.insight(corruptionId);
    const insightMap = await this.insightMap(corruptionId);
    const phrase = await this.phrase(corruptionId);
    const hiddenAttribute = await this.hiddenAttribute(corruptionId);
    const border = await this.border(corruptionId);
    const corruptor = await this.corruptor(corruptionId);
    const corruption = this.corruption(corruptionId);
    const unsavedInsight = await this.unsavedInsight(corruptionId);
    return {
      id: corruptionId,
      insight: insight,
      insightMap: insightMap,
      unsavedInsight: unsavedInsight,
      phrase: phrase,
      hiddenAttribute: hiddenAttribute,
      border: border,
      corruptor: corruptor,
      corruption: corruption
    }
  }
  async numberOfNFTsInWallet(address) {
    let balance = await this.Corruption.balanceOf(address);

    return balance.toNumber();
  }

  async corruptionIdsInWallet(address) {
    const numberOfNFTs = await this.numberOfNFTsInWallet(address);
    let corruptionIds = [];
    let tasks = [];
    for (var i = 0;i < numberOfNFTs; i++) {
      tasks.push(this.Corruption.tokenOfOwnerByIndex(address, i));
    }

    const data = await Promise.all(tasks);
    for (const corruptionIdBN of data) {
      corruptionIds.push(corruptionIdBN.toString());
    }

    return corruptionIds;
  }
}

module.exports = Corruption;
