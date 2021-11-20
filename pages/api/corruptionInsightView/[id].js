
var Corruption = require('../metasrc/index.js');

export default async (req, res) => {
  
  const {
    query: { id },
    method,
  } = req
  
  const r = /\d+/;
  
  let cid = id.split("id=")[1]
  cid = cid.match(r)

  let insight = id.split("insight=")[1]
  insight = insight.match(r)
  let insightInt = parseInt(insight) 

  if (insightInt > 20)
    res.end((`<div style="width: 500px;">No mutations after 20 for now</div>`))
  else {
    let corruption = new Corruption();
    var tokenURI = await corruption.tokenURI(id);
    res.end((`<div style="width: 500px;">${tokenURI}</div>`))
  }
}
