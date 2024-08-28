exports.name = '/sim';
exports.index = async (req, res, next) => {
const fs = require('fs');
const dataSim = require('./data/data.json');
const stringSimilarity = require('string-similarity');
if(!req.query.type) return res.json({ error: 'Missing data to launch '})
if(req.query.type == 'ask') {
  var ask = encodeURI(req.query.ask)
  if (!ask) return res.jsonp({ error: 'Data to launch the program is missing' });
  var msg = [];
  for (let id of dataSim) { 
      const data = id.ask
      msg.push(data)
  }
  
  var checker = stringSimilarity.findBestMatch(decodeURI(ask), msg)
  if (checker.bestMatch.rating >= 0.5) {
  var search = checker.bestMatch.target;
  }
  if(search == undefined) return res.jsonp({
      answer: 'আপনি যেটা প্রশ্ন করছেন সেটা আমাকে শিখানো নাই🥺🥺দয়া করে আমাকে শিখান'
  })
  function recoverKey() {
      var data = dataSim.filter(i => i.ask.toLowerCase() == search.toLowerCase())
      return data
  }
  var find = recoverKey()
  var f2 = find[Math.floor(Math.random() * find.length)];
  var a = f2.ans[Math.floor(Math.random() * f2.ans.length)];
    return res.jsonp({
      answer: a
  })
}
if(req.query.type == 'teach') {
    const path = require('path').join(__dirname, 'data', 'data.json');
    var id = dataSim.length
    var ask = req.query.ask
    var ans = req.query.ans
    if(!ask || !ans) return res.json({ error: 'Missing data to run command' });
    var f = dataSim.find(i => i.ask == ask);
    console.log(f)
    if(f != undefined) {
      if(f.ans.includes(ans)) return res.json({ error: 'The answer already exists'})
      f.ans.push(ans);
    }
    else {
      dataSim.push({
        id,
        ask,
        ans: [
          ans
        ]
      })
    }
    fs.writeFileSync(path, JSON.stringify(dataSim, null, 2), 'utf-8');
    return res.json({ 
      msg: 'সফল ভাবে আমাকে শিখান,
      data: {
        ask: ask,
        ans: ans
      }
    })
  } 
}
