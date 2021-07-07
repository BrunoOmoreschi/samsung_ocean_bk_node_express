const express = require('express')
const app = express()
//Notação de q o corpo todo será feito usando o json (OBRIGATÓRIO PRA NÃO CRASHAR)
app.use(express.json())

app.get ('/', function (req, res){
    res.send("Hello World!!")
})

//app.listen(3001)
/*
Lista de Endponts CRUD
Create, Read, Update, Delete
Criar, Ler (Ind. ou Tudo), Atualizar, Remover

Associamos aos verbos HTTP
Quando seguimos as convenções, utilizando os verbos corretos,
podemos dizer que a aplicação segue os padrões REST
Quando uma aplicação segue REST chamamos de RESTful
[POST]  -> Create
[GET]   -> Read
[PUT]   -> Update
[DELETE]-> Delete
*/

const lista = ["Senhor dos Anéis", "Forest Gump"]
//Não inverta a ordem de req e res!!!!
app.get("/filmes", function(req, res) {
    // ".filter(Boolean)" é pq tem implementação para o verbo DELETE e quando se retira itens q não os últimos pode ser que apareça itens "NULL" e isso os remove na exibição
    res.send(lista.filter(Boolean))
})

//Verbo GET usando arrow fun
app.get("/filmes/:id", (req, res) => {
    //O id que está na linha do route (acima) será parametro da requisição e será armazenado na const var "id"
    const id = req.params.id;
    //Esse id será decrecido em 1, para alinhar id com indices de listas (starts w 0), e será o id procurado na lista, que será armazenado na const var "item"
    const item = lista[id - 1];
    //Caso o id procurado não seja listado:
    if (!item) {
        res.status(404).send("Item não encontrado");

        return;
    }
    //O valor da const var "item" é devolvido por send no res
    res.send(item);
})

//[POST] -> Create
//Essa função irá adicionar um filme a lista, tem que vir pelo verbo post e vir no padrão Json
//Chama pelo metodo post normal
app.post("/filmes", (req, res)=>{
  //diz que o "nome" que será definido no json ("nome": "filme") no body da requisição (era pra ser no front end, mas rola no ThunderClient) entra como req na const var "item"
  const item = req.body.nome;
  //Faz o push da const var "item" na lista[]
  lista.push(item);
  //Devolve que deu tudo certo
  res.send("Item criado com sucesso!");
  //*To implement: usar o metodo includes() para verificar se já está esse nome na lista e evitar duplicados.
})

//[PUT] -> Update
//Função que atualiza o nome dentro de uma lista
//O id da lista vem do "id" dado no endPoint da URL, mas o json("nome": "filme") no body da requisição (era pra ser no front end, mas rola no ThunderClient)  dá o nome a ser colocado nesse item
app.put("/filmes/:id", (req, res)=> {
    //Vai procurar na url o "id" como parametro e colocar na const var "id"
    const id = req.params.id;
    //Vai no Json pegar o nome
    const item = req.body.nome;
    //Calcula o index na lista usando a const var como báse (-1 para alinhar q listas begin with 0) e o igual para dar o valor "item" nesse local
    lista[id -1] = item;
    res.send("Item atualizado com sucesso.");
})

//[DELETE] - Delete (a vá!!)
//Função q vai pegar o "id" da URL e eliminar ele na lista
app.delete("/filmes/:id", (req, res)=>{
    //armazena o "id" da URL como parametro do req na const var "id"
    const id = req.params.id
    //Usa o metodo "delete" para tirar o item calculado dentro das chaves
    delete lista[id-1]
    //Aviso que deu certo
    res.send("Item removido!!")

})


app.listen(3000)
