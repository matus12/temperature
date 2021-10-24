// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const express = require('express')
const TemperatureFactory = require("./temperature");
const bodyParser = require('body-parser');
const port = 3000;

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const Temperature = TemperatureFactory.getInstance();

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use( bodyParser.json());

    server.post('/api/temp', (req, res) => {
        console.log(req.body);

        Temperature.temp = req.body.temp;
        console.log(Temperature.temp);

        return res.sendStatus(202);
    });

    server.get('/api/getTemp', (req, res) => {
        return res.status(200).json({ temp: Temperature.temp });
    });

    server.get('*', (req,res) => {
        req.body.temp = Temperature.temp;
        return handle(req, res);
    });

    server.listen(process.env.PORT || port, err => {
        if (err) {
            throw err;
        } else {
            console.log('Server started');
        }
    })
})
