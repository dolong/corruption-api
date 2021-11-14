
var Corruption = require('./src/index.js');

export default async (req, res) => {

    let corruption = new Corruption("https://mainnet.infura.io/v3/752f065f467246a686ba54b11f77dcfd1");

    var attributes = await corruption.attributes(1);

  
    res.end(JSON.stringify(attributes))
  }