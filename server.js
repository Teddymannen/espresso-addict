const express = require('express');

const port = 3000;

const app = express();

app.use(express.static('./src'));

app.listen(port, () => console.log('Espresso Addict is served at http://localhost:' + port));