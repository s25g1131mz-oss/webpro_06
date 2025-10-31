const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/jankenradio", (req, res) => {

  const value = req.query.radio; 
  let win = Number(req.query.win)||0;
  let total = Number(req.query.total)||0;

  let hand = ''; 
  if (value == '1') hand = 'ぐー';
  else if (value == '2') hand = 'ちょき';
  else hand = 'ぱー';

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'ぐー';
  else if (num == 2) cpu = 'ちょき';
  else cpu = 'ぱー';

  let judgement = '';
  total += 1;

  if (hand == cpu) {
    judgement = 'あいこ';
  } else if (
    (hand == 'ぐー' && cpu == 'ちょき') ||
    (hand == 'ちょき' && cpu == 'ぱー') ||
    (hand == 'ぱー' && cpu == 'ぐー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }

  console.log({ hand, cpu, judgement, win, total });

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render('jankenradio', display);
});

app.listen(8000, () => console.log("Example app listening on port 8000!"));
