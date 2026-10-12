const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

//Configure Static File Serving
app.use(express.static(path.join(__dirname, 'public')));

//Sample database for menu
const coffeeMenu =[
    {id: 1, name: 'Latte', description: 'A creamy coffee drink made with milk and espresso.', image: 'latte.jpg'},
    {id: 2, name: 'Espresso', description: 'A coffee drink that is composed of a double espresso and hot milk, with the surface topped with foamed milk.', image: 'espresso.jpg'},
    {id: 3, name: 'Black Coffee', description: 'A simple coffee drink made by brewing ground coffee beans with hot water.', image: 'black-coffee.jpg'},
];

//HTTP GET Routes for Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

//API Route with Query String Filtering
app.get('/api/coffee', (req, res) => {
    let results = coffeeMenu;
    if (req.query.name) {
        results = results.filter(item =>
            item.name.toLowerCase().includes(req.query.name.toLowerCase())
        );
    }
    res.json(results);
})

//API Route with Route Parameters
app.get('/api/coffee/:id', (req, res) => {
    const coffeeId = parseInt(req.params.id);
    const item = coffeeMenu.find(item => item.id === coffeeId);
    if (!item) {
        return res.status(404).json({error: "Coffee item not found"});
    }
    res.json(item);
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});