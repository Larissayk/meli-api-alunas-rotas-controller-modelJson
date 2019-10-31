const professoras = require("../model/professoras.json");
const fs = require("fs");

exports.get = (req, res) => {
  const professoraSemCpf = professoras.map(item => {
    item.cpf = "*********";
    return item;
  });

  res.status(200).send({ professoraSemCpf });
};

// const professoraSemCpf = professoras.map(item => {
//   delete item.cpf
//   return item
// })

// exports.get = (req, res) => {
//   const arrProfs = []
//   for ()
// };

exports.getById = (req, res) => {
  const id = req.params.id;
  const professora = professoras.find(professora => professora.id == id);
  const professoraSemCpf = professoras.map(item => {
    delete item.cpf;
    return item;
  });

  res.status(200).send(professora);
};

// exports.getById = (req, res) => {
//   const id = req.params.id;
//   const professora = professoras.find(professora => professora.id == id)
//       delete professora.cpf
//   }

//   res.status(200).send(professora);

//Post method
exports.post = (req, res) => {
  const { id, nome, especialidade, signo, cpf } = req.body;
  professoras.push({ id, nome, especialidade, signo, cpf });

  fs.writeFile(
    "./src/model/professoras.json",
    JSON.stringify(professoras),
    "utf8",
    function(err) {
      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log("The file was saved!");
    }
  );

  return res.status(201).send(professoras);
};

