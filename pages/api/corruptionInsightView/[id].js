
var Corruption = require('../metasrc/index.js');

export default async (req, res) => {

  const {
    query: { id },
    method,
  } = req
  
  
  let corruption = new Corruption("https://mainnet.infura.io/v3/dc503cd8a1f249a1a6500d0f5f331eca");
  var tokenURI = await corruption.tokenURI(id);

  res.end((`<div style="width: 500px;">${tokenURI}</div>`))

}
