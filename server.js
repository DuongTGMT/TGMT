// server.js
const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const app = express();
const port = 3000;
const blockchain = new Blockchain();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(__dirname)); // để phục vụ file index.html

app.post('/add-identity', (req, res) => {
    const { name, email, faceImage } = req.body;
    if (!name || !email || !faceImage) {
        return res.status(400).json({ error: 'Thiếu dữ liệu!' });
    }
    const newBlock = blockchain.addBlock({ name, email, faceImage });
    res.json(newBlock);
});

app.get('/identities', (req, res) => {
    res.json(blockchain.chain);
});

app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
