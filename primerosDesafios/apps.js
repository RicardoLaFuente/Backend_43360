import Express  from "express";

const app = Express();

app.get('/saludo', (req, res)=>{
    res.send("Hola, estamos probando express")
});

/*app.get('/bienvenido', (req,res)=>{
    res.send()
})*/

app.get('/',(req, res)=>{
    res.send("esto es una prueba")
});

app.listen(8080,()=>console.log("server arriba"))