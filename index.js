const express = require('express');
const cors = require('cors');
const { send } = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello beautiful Bangladesh!')
})

const users = [
    { id: 1, name: "alim", job: 'business', email: 'abc@def.com', phone: '012364646' },
    { id: 2, name: "jalim", job: 'job holder', email: 'abc@def.com', phone: '012364646' },
    { id: 3, name: "korim", job: 'pilot', email: 'abc@def.com', phone: '012364646' },
    { id: 4, name: "rohim", job: 'driver', email: 'abc@def.com', phone: '012364646' }
]

app.get('/users', (req, res) => {
    console.log('from query', req.query);
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const matched = users.filter(user => user.name.toLowerCase().includes(search));
        res.send(matched);
    } else {

        res.send(users)
    }
});

app.get('/user/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const user = users[id];
    res.send(user)
});


app.post('/user', (req, res) => {
    console.log('request', req.body);
    const user = req.body;
    user.id = users.length;
    users.push(user);
    res.send(user);
})



app.listen(port, () => {
    console.log(' listening on port', port);
})