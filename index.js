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

/**
 * Endpoint que lista todos os games
 */
app.get("/games", (req, res) => {
  res.statusCode = 200; // sempre passar status code para o usuário

  res.json(db.games);
});

/**
 * Endpoint que lista um game por id
 */
app.get("/game/:id", (req, res) => {
  var id = parseInt(req.params.id);

  if (isNaN(id)) {
    // verifica se o id é um número
    res.sendStatus(400); // por default ele usa o status 200 ok
    // res.send("Isso não é um ID válido! Tente novamente com número(s).");
  } else {
    // res.sendStatus(200);
    res.status(200);
    // res.send("Isso é um número");
    var game = db.games.find((g) => g.id == id);

    if (game != undefined) {
      res.statusCode = 200;
      res.send(game);
    } else {
      res.sendStatus(404);
    }
  }
});

/**
 * Endpoint que cria um game
 */
app.post("/game", (req, res) => {
  var { title, year, price } = req.body;

  if (title == undefined || title == "" || isNaN(year) || isNaN(price)) {
    res.sendStatus(400);
  } else {
    db.games.push({
      id: 123,
      title,
      year,
      price,
    });

    res.sendStatus(200);
  }
});

/**
 * Endpoint que exclui um game
 */
app.delete("/game/:id", (req, res) => {
  var id = req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    var index = db.games.findIndex((g) => g.id == id);

    if (index == -1) {
      res.sendStatus(404);
    } else {
      db.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
