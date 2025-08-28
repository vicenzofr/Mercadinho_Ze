const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("api mercadinho")
})


app.listen(3000, () => {
    console.log('Server in running on http://localhost:3000');
})