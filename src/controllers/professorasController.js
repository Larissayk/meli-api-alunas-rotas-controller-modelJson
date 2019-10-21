const professoras = require("../model/professoras.json");

exports.get = (req, res) => {
  const professoraSemCpf = professoras.map(item => {
    item.cpf = "*********"
    return item })

  res.status(200).send({professoraSemCpf});
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
  const professora = professoras.find(professora => professora.id == id)
  const professoraSemCpf = professoras.map(item => {
    delete item.cpf
    return item 
  })
   
  res.status(200).send(professora);
    
 
};

// exports.getById = (req, res) => {
//   const id = req.params.id;
//   const professora = professoras.find(professora => professora.id == id)
//       delete professora.cpf
//   }
   
//   res.status(200).send(professora);
    
 
