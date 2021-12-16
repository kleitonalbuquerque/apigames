const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB fake
// TODO => Criar database para os games
var db = {
  games: [
    {
      id: 1,
      title: "Call of Duty MW",
      year: 2019,
      price: 60,
    },
    {
      id: 2,
      title: "God of War",
      year: 2015,
      price: 90,
    },
    {
      id: 3,
      title: "MK 11",
      year: 2017,
      price: 50,
    },
  ],
};

app.get("/", (req, res) => {});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
