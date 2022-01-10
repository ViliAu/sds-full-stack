const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const dbo = require('./db/conn');

const app = express();

dbo.connectToServer();

// Init middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Init routes
app.use('/api/members', require('./routes/members'));

app.get('/', async (req, res) => {
    const dbConnect = await dbo.getDb();
    const members = await dbConnect.collection('members').find({}).toArray();
    res.render('index', {
        title: 'Member App',
        members
    });
});

const port = process.env.port || 3000;
app.listen(port, () => console.log('Listening port ' + port));