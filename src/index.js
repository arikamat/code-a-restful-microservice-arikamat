const express = require('express');
const app = express();
const port = 3000;
const uuid = require('uuid'); 

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

//I would have used a hashmap but instructions say array :(
const users = [
    
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/users/:id', (req, res) => {
    // req.params.id
    const user = users.find(u => u.id === req.params.id);
    if(!user){
        return res.status(404).json({"error":"not found"})
    }
    
    // res.send('Hello World!'); 
    res.send(user)
});
app.put('/users/:id', (req, res) => {
    // req.params.id
    const user = users.find(u => u.id === req.params.id);
    if(!user){
        return res.status(400).json({"error":"user with that id is not found"})
    }
    if(!("body" in req)){
        return res.status(400).json({"error":"Invalid Request"})
    }
    if(!("name" in req.body)){
        return res.status(400).json({"error": "Name not present"})
    }
    if(!("email" in req.body)){
        return res.status(400).json({"error": "Email not present"})
    }
    user.name = req.body.name;
    user.email = req.body.email;
    

    
    // res.send('Hello World!'); 
    res.send(user)
});
app.delete('/users/:id', (req, res) => {
    // req.params.id
    const idx = users.findIndex(u => u.id === req.params.id);
    if(idx<0){
        return res.status(400).json({"error":"user with that id is not found"})
    }
    users.splice(idx,1);
     

    
    // res.send('Hello World!'); 
    res.status(204).send()
});
app.post('/users',(req, res) => {
    if(!("body" in req)){
        return res.status(400).json({"error":"Invalid Request"})
    }
    if(!("name" in req.body)){
        return res.status(400).json({"error": "Name not present"})
    }
    if(!("email" in req.body)){
        return res.status(400).json({"error": "Email not present"})
    }
    const user = {
        "id": uuid.v4(),
        "name": req.body.name,
        "email": req.body.email
    }
    users.push(user);
    return res.status(201).json(user);
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing