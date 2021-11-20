
var Corruption = require('../metasrc/index.js');

export default async (req, res) => {
  
  const {
    query: { id },
    method,
  } = req

  const script = `<script>const input = ${id};
  const frame = document.getElementById('frame');

  let insight = 1;
  let maxInsight = 21;

  setInterval(function (){
    if (insight < maxInsight) {
      const token = input.value;
      frame.src = \`https://corruption-api.vercel.app/api/corruptionInsightView/id=${id}&insight=\${insight}\`;
      insight++;
    }
  },500);</script>`

  const html = `<html>` + `<iframe id="frame" src="https://corruption-api.vercel.app/api/corruptionInsightView/id=${id}&insight=1" width="500" height="1000"></iframe></br>` + script + `Thanks @mmoustafa</html>`

  res.end((html))
}
