const express = require('express');
const productos = require('./api/productos');
const fs = require('fs')

// creo una app de tipo express

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// completar el codigo...
app.get('/api/productos/listar',(req, res) => {
    try {
        if(productos.read().length = 0) {
            res.type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
        }else{
            res.type('json').send(JSON.stringify(productos.read(), null, 2) + '\n');
        }
    } catch (e) {
        console.error({error : 'no hay productos cargados'})
        res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));
    }
});

app.get('/api/mensajes/:id', async (req, res) => {
    try {
        if (req.params.id>productos.read().length || req.params.id<1){
            res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
        } else{
            let id=req.params.id-1;
            res.type('json').send(JSON.stringify(productos.read()[id], null, 2) + '\n');
        }
    } catch (e) {
        console.error({error : 'producto no encontrado'})
        res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
    }
});

app.post('/api/productos/guardar', async (req, res) => {
    try {
        let objeto = req.body;
        return res.type('json').send(JSON.stringify(productos.save(objeto), null, 2) + '\n');
    } catch (e) {
        console.error({error : 'error al guardar'})
        res.status(500).send(JSON.stringify({error : 'error al guardar'}));
    }
});
// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
    res.status(500).send({error : 'ocurrió un error'});
});

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send({error : 'ocurrió un error'});
});