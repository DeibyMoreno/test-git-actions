const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

app.get('/health', (req, res) => {
    res.json({ message: 'ok' });
});

module.exports = app;
