const Express = require("express");
const router = Express.Router();
const axios = require("axios");

let data = [];
let appearance = new Array(100).fill(false);

async function getData() {
  data = (await axios.get("https://picsum.photos/v2/list?page=1&limit=100"))
    .data;
}

getData();

function checkIfHaveFive() {
  let falseAppearance = 0;
  for (let i = 0; i < 100 && falseAppearance < 5; i++) {
    if (appearance[i] === false) {
      falseAppearance++;
    }
  }
  if (falseAppearance < 5) {
    return false;
  } else {
    return true;
  }
}

router.get("/gallery", async (req, res) => {
  let dataArray = [];
  let indexArray = [];
  let indexOfIndexArray = 0;
  let available = checkIfHaveFive();
  while (indexOfIndexArray < 5 && available) {
    let randomIndex = Math.floor(Math.random() * 11);
    if (
      !indexArray.includes(randomIndex) &&
      !appearance[randomIndex] &&
      data[randomIndex]
    ) {
      dataArray[indexOfIndexArray] = data[randomIndex];
      indexArray.push(randomIndex);
      appearance[randomIndex] = true;
      indexOfIndexArray++;
    } else {
      available = checkIfHaveFive();
    }
  }
  if (!available) {
    res.send({ error: "all data reviewed" });
    return;
  }
  console.log(dataArray);
  res.send(dataArray);
});

// router.post("/transaction", async (req, res) => {
//   const { amount, category, vendor } = req.body;
//   new Transaction({ amount, category, vendor }).save();
//   res.send("Added");
// });

// router.delete("/transaction", (req, res) => {
//   const { _id } = req.body;
//   if (!_id) {
//     res.status(400).send("error");
//     return null;
//   }
//   Transaction.findByIdAndDelete({ _id }, (err, deletedTransaction) => {
//     if (deletedTransaction != undefined) {
//       res.send("Deleted");
//     } else {
//       res.send("ID not found");
//     }
//   });
// });

module.exports = router;
