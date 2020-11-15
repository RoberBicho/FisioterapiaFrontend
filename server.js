const express = require('express');

const app = express();

app.use(express.static('./dist/AngularAvanzado'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/AngularAvanzado/' }),
);

app.listen(process.env.PORT || 8080);