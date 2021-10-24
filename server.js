// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const express = require('express')
const port = 3000;

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express();

    server.get('/hello', (req, res) => {
        console.log(req);
        return res.end('pong');
    });

    server.get('*', (req,res) => {
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
