
var Corruption = require('../src/index.js');

export default async (req, res) => {

  const {
    query,
    method,
  } = req

  switch (method) {
    case 'GET':
      let corruption = new Corruption("https://mainnet.infura.io/v3/dc503cd8a1f249a1a6500d0f5f331eca");
      let attributes = undefined;
      if (query["skipInfura"] === undefined) {
        attributes = await corruption.attributes(query.id);
      } else {
        attributes = await corruption.attributesNoInfura(query.id, query.id + 1);
        attributes = attributes[0];
      }
      res.end(JSON.stringify(attributes))
      break
    case 'OPTIONS':
      res.end(JSON.stringify({data: 'OK'}));
      break;
    default:
      res.setHeader('Allow', ['GET', 'OPTIONS'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
