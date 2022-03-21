const express = require("express");
const app = express();

/*
app.listen(3001,()=>{
console.log("yoo");
}
);
*/
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "anteKessie1279",
  database: "project2",
});

app.post("/create", (req, res) => {
  const orderno = req.body.orderno;
  const name = req.body.name;
  const age = req.body.age;
  const mobileno = req.body.mobileno;
  const testedby = req.body.testedby;
  const date = req.body.date;

  db.query(
    "INSERT INTO customer1 (orderno, name, age, mobileno, testedby, date) VALUES (?,?,?,?,?,?)",
    [orderno, name, age, mobileno, testedby, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/customer1", (req, res) => {
  db.query("SELECT * FROM customer1", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
/////////////////////////////////////////////////////////////

app.get("/customername", (req, res) => {
  let name = decodeURI(req.query.name)
  db.query(`SELECT * FROM customer1 Where name = '${name}'`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
);
//////////////////////////////////////////////////////////////

app.put("/update", (req, res) => {
  const orderno = req.body.orderno;
  const testedby = req.body.testedby;
  db.query(
    "UPDATE customer1 SET testedby = ? WHERE orderno = ?",
    [testedby, orderno],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:orderno", (req, res) => {
  const orderno = req.params.orderno;
  db.query("DELETE FROM customer1 WHERE orderno = ?", orderno, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

