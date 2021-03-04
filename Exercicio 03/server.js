var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
 
  type Cliente {    
    nome: String
    endereco: String
    sobrenome: String
    telefone: String
    email: String
  }
 
  type Query {    
    obterClientes: [Cliente]    
  } 
`);


class Cliente {
  constructor({nome, sobrenome,endereco,telefone,email}) {    
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
  }
}

var dados = {};

dados[0] = {nome:"Diego", sobrenome:"Bove", telefone:"(11) 99999-9999", endereco:"Rua das Palmeiras", email:"diego.bove@bizapp.com.br"}
 
var qtd = 1;

var root = {

  obterClientes: () => {

    var clients =[];

    for (let index = 0; index < qtd; index++) {
      
        clients[index] =new Cliente(dados[index]);
    }

    return clients;
  }
 
};
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});