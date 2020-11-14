const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/AngularAvanzado'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/AngularAvanzado/index.html'));
});

app.listen(process.env.PORT || 8080);