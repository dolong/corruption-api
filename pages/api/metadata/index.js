
var Corruption = require('../src/index.js');

export default async (req, res) => {

  const {
    query,
    method,
  } = req

  switch (method) {
    case 'GET':
      if (query["start"] === undefined  || query["end"] === undefined) {
        res.status(400).end(JSON.stringify({error: 'Bad request: query params start & end required (ints)'}))
        return;
      }
      let corruption = new Corruption("https://mainnet.infura.io/v3/dc503cd8a1f249a1a6500d0f5f331eca");
      const attributes = await corruption.attributesNoInfura(query.start, query.end + 1);
      res.end(JSON.stringify(attributes));
      break;
    case 'OPTIONS':
      res.end(JSON.stringify({data: 'OK'}));
      break;
    default:
      res.setHeader('Allow', ['GET', 'OPTIONS'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
