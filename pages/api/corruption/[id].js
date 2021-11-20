
var Corruption = require('../src/index.js');

export default async (req, res) => {

  const {
    query: { id },
    method,
  } = req
  
  
  switch (method) {
    case 'GET':
      let corruption = new Corruption("https://mainnet.infura.io/v3/dc503cd8a1f249a1a6500d0f5f331eca");
      var attributes = await corruption.attributes(id);
      res.end(JSON.stringify(attributes))
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
