const alunas = require("../model/alunas.json");
const fs = require("fs"); //file system, funcionalidae que existe no express para gravação de arquivos

exports.get = (req, res) => {
  console.log(req.url);
  res.status(200).send(alunas);
};

exports.getById = (req, res) => {
  const id = req.params.id;
  if (id > 17 || id <= 0) {
    res.redirect(301, "https://www.mercadolivre.com.br/");
    // res.send('Não encontrei este ID!!')
  }

  console.log(id);
  res.status(200).send(alunas.find(aluna => aluna.id == id));
};

exports.getBooks = (req, res) => {
  const id = req.params.id;
  const aluna = alunas.find(aluna => aluna.id == id);

  // if(!aluna) {
  //   res.send('Não encontrei esta garota!!')
  // }

  const livrosAluna = aluna.livros;
  const livrosLidos = livrosAluna.filter(livro => livro.leu == "true");
  const tituloLivros = livrosLidos.map(livro => livro.titulo);
  res.status(200).send(tituloLivros);
};

exports.getSP = (req, res) => {
  // const nasceuSp = alunas.nasceuEmSp
  const paulistas = alunas.filter(item => {
    console.log(item);
    return item.nasceuEmSp == "true";
  });
  // vai trazer a array INTEIRA de todas as alunas que tenham a propriedade .nasceuEmSp == true
  const nomePaulistas = paulistas.map(item => item.nome); //vai mapear dentro da array de alunas nascidas em SP, somente a propriedade Nome
  res.status(200).send(nomePaulistas);
};

exports.getIdade = (req, res) => {
  const id = req.params.id; //dá acesso ao número que eu passo na rota, que vai ser equivalente ao id
  const aluna = alunas.find(aluna => aluna.id == id);
  const alunaDataNasc = aluna.dateOfBirth;
  const splitData = alunaDataNasc.split("/");
  const diaDeNasc = splitData[0];
  const mesDeNasc = splitData[1];
  const anoDeNasc = splitData[2];

  const idadeAluna = calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc);
  res.status(200).send({ idadeAluna }); //não estava acessando como string, por isso tive que colocar entre {}
};

function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;
  const hoje = now.getDate();

  let idade = anoAtual - anoDeNasc;

  if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
    idade -= 1;
  }
  return idade;
}

//Verbo Post
exports.post = (req, res) => {
  const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
  alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros });

  //Gravar alteração no arquivo json (precisa do caminho absoluto, senão não funciona. Arquivo não trabalha com objetos, precisa converter para string. "utf8" conversão de caracteres)
  fs.writeFile(
    "./src/model/alunas.json",
    JSON.stringify(alunas),
    "utf8",
    function(err) {
      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log("The file was saved!");
    }
  );
  return res.status(201).send(alunas);
};

//Incluir livros
exports.postBooks = (req, res) => {
  const id = req.params.id
  const aluna = alunas.find(aluna => aluna.id == id)
  if (!aluna){
res.send("Não encontrei essa garota!")
  }
  const {titulo, leu} = req.body;
  alunas[aluna.id -1].livros.push({titulo, leu});

  fs.writeFile(
    "./src/model/alunas.json",
    JSON.stringify(alunas),
    "utf8",
    function(err) {
      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log("The file was saved!");
    }
  );
  return res.status(201).send(alunas[aluna.id -1].livros);
}