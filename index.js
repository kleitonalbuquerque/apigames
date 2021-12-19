const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB fake
// TODO => Criar database para os games
var DB = {
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
  users: [
    {
      id: 1,
      name: "Mariana",
      email: "mariana@mail.com",
      password: "nodejs<3",
    },
    {
      id: 2,
      name: "Kleiton",
      email: "kleiton@mail.com",
      password: "mariana<3",
    },
  ],
};

/**
 * Endpoint que lista todos os games
 */
app.get("/games", (req, res) => {
  res.statusCode = 200; // sempre passar status code para o usuário

  res.json(DB.games);
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
    var game = DB.games.find((g) => g.id == id);

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
    DB.games.push({
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
    var index = DB.games.findIndex((g) => g.id == id);

    if (index == -1) {
      res.sendStatus(404);
    } else {
      DB.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

/**
 * Endpoint que edita/atualiza um game
 */
app.put("/game/:id", (req, res) => {
  var id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    var game = DB.games.find((g) => g.id == id);

    if (game != undefined) {
      var { title, year, price } = req.body;

      if (title != undefined) {
        game.title = title;
        console.log("Título atualizado com sucesso!");
      }
      if (price != undefined) {
        game.price = price;
        console.log("Preço atualizado com sucesso!");
      }
      if (year != undefined) {
        game.year = year;
        console.log("Ano atualizado com sucesso!");
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

/**
 * Endpoint de login
 */
app.post("/auth", (req, res) => {
  var { email, password } = req.body;

  if (email != undefined) {
    var user = DB.users.find((u) => u.email == email);

    if (user != undefined) {
      if (user.password == password) {
        res.status(200);
        res.json({ token: "TOKEN FALSO!" });
      } else {
        res.status(401);
        res.json({ err: "Credenciais inválidas!" });
      }
    } else {
      res.status(404);
      res.json({ err: "E-mail enviado não existe!" });
    }
  } else {
    res.status(400);
    res.json({ err: "E-mail enviado é inválido!" });
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
