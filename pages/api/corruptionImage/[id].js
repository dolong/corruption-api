
var Corruption = require('../src/index.js');

export default async (req, res) => {

  const {
    query: { id },
    method,
  } = req
  
  
  switch (method) {
    case 'GET':
      let corruption = new Corruption("https://mainnet.infura.io/v3/752f065f467246a686ba54b11f77dcfd");
      var tokenURI = await corruption.tokenURI(id);
      res.end(JSON.stringify(tokenURI))
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
