const alunas = require("../model/alunas.json");

exports.get = (req, res) => {
  console.log(req.url);
  res.status(200).send(alunas);
};

exports.getById = (req, res) => {
  const id = req.params.id;
  if(id > 17 || id<= 0) {
    res.redirect(301, "https://www.mercadolivre.com.br/")
    // res.send('Não encontrei este ID!!')
  }

  console.log(id);
  res.status(200).send(alunas.find(aluna => aluna.id == id));
 
};

exports.getBooks = (req, res) => {
  const id = req.params.id;
  const aluna = alunas.find(aluna => aluna.id == id)

// if(!aluna) {
//   res.send('Não encontrei esta garota!!')
// }

  const livrosAluna = aluna.livros
  const livrosLidos = livrosAluna.filter(livro => livro.leu == "true")
  const tituloLivros = livrosLidos.map(livro => livro.titulo)
  res.status(200).send(tituloLivros);
};

exports.getSP = (req, res) => {
  // const nasceuSp = alunas.nasceuEmSp
  const paulistas = alunas.filter(item => { 
    console.log(item)
    return item.nasceuEmSp == "true" 
  })
      // vai trazer a array INTEIRA de todas as alunas que tenham a propriedade .nasceuEmSp == true
  const nomePaulistas = paulistas.map(item => item.nome)     //vai mapear dentro da array de alunas nascidas em SP, somente a propriedade Nome
  res.status(200). send(nomePaulistas);
}


