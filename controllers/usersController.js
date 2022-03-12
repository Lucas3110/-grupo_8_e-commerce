let path = require ("path");
let fs = require('fs');


const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controlador = {    
    login: (req, res) => {        
        res.render("login");        
    },    
    register: (req, res) => {        
        res.render("register");        
    },
    store: (req, res) => {
		if(req.file){
            let newUser = {
                id: users[users.length - 1].id + 1,
                ...req.body,
                imagen: req.file.filename,
            };
            users.push(newUser)
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
            res.redirect('/');
        } else{
             res.send('/')
        }



	}    
};

module.exports = controlador;

