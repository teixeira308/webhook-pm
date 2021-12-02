const express = require('express')  
const app = express()

var porta = process.env.PORT || 8080;

 
app.use(express.json());
app.use(express.static("public"))


app.post('/webhook', function (req, res) {
    //configs pra ler json
    var jsonorigem = JSON.stringify(req.body)
    var resourcereq = JSON.stringify(req.body.resource)
    var pedido = resourcereq.substring(12,22)
    //definido datahora da requisicao
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let timestamppersonal = year +'.'+ month +'.'+ date +'.'+ hours +'.'+ minutes +'.'+ seconds
    //salvando log
    fs = require('fs');
    fs.appendFileSync('logs.txt' , timestamppersonal+' : ' +jsonorigem+"\n", function (err) {
    if (err) return console.log('erro no arquivo log'+timestamppersonal+'.txt'+err);
        console.log('Salvo arquivo: log'+timestamppersonal+'.txt');
    });
    //salvando na lista de pedidos
    fs = require('fs');
    fs.appendFileSync('pedidos.txt', pedido+"\n", function (err) {
    if (err) return console.log('erro ao salvar pedido'+timestamppersonal+'.txt'+err);
        console.log('Salvo pedido: '+jsonorigem.resource);
    });
    //respondendo 200 ok
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    res.json('ok - pedido: '+pedido)
  })

app.listen(porta, () => {
    console.log('Example app listening at https://app-webhook-pdv.herokuapp.com/webhook')
})

