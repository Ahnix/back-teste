const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ALGUM ERRO AO CRIAR TXT."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ALGUM ERRO AO FAZER LISTAGEM DOS TXT"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error AO PEGAR TXT COM  id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "TXT ATUALIZADO."
        });
      } else {
        res.send({
          message: `TXT COM id=${id}. NAO FOI ATUALIZADO OU TXT ESTA EM BRANCO!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "ERRO AO ATUALIZAR TXT COM id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "TXT DELETADO!"
        });
      } else {
        res.send({
          message: `NAO FOI DELETADO TXT COM id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "NAO DELETOU O TXT COM id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} TXT DELETADO!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERRO AO DELETAR"
      });
    });
};

exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERRO AO LISTAR OS TXT"
      });
    });
};
