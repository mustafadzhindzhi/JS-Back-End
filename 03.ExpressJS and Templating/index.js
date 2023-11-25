const express = require('express');
const handlebars = require('express-handlebars');
const PORT = 3000;
const path = require('path');
const { getKittens, addKitten } = require('./kittens.js');
const app = express();

//View Engine
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

//**MIDDLEWARE start */
const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);

const staticFile = express.static('public');
app.use(staticFile);

app.use((req, res, next) => {
    console.log(`HTTP Request: ${req.method}, Request Path: ${req.path}`);
    next();
})

app.use('/kittens', (req, res, next) => {
    console.log(`Kittens middleware has been invoked!`);
    next();
});

//concrete routing middleware
const specificMiddleWare = (req, res, next) => {
    console.log('This is the specific routes MIDDLEWARE');
    next();
}

/*MIDDLEWARE END*/

/*Routing START*/

app.get("/", (req, res) => {
    // res.send('Welcome this is the home page');

    res.render("home");
});

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/specific', specificMiddleWare, (req, res) => {
    res.send('This is specific route! :)')
});

// app.get('/public/css/style.css', (req,res) => {
//     res.sendFile(path.resolve(__dirname, "public/css", "style.css"))
// })

//Endpoint -> method, path, ACTION
//get ===  method
//kittens  === path, route
//action === (req, res) => {}
app.get("/kittens", (req, res) => {
    const kittens = getKittens();
    res.render('kittens', { kittens });
    // res.send(`<!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <link rel="stylesheet" href="./css/style.css">
    //     <title>Document</title>
    // </head>
    // <body>
    //     <form method="post">
    //         <label for="name">Name:</label>
    //         <br />
    //         <input type="text" id="name" name="name"/>
    //         <br />
    //         <label for="age">Age:</label>
    //         <br />
    //         <input type="text" id="age" name="age" />
    //         <br />
    //         <br />
    //         <input type="submit" value="Create Kitten" />
    //       </form> 
    // </body>
    // </html>`)
});

app.get('/kittens/:kittesId', (req, res) => {
    const kittenId = Number(req.params.kittesId);

    if (!kittenId) {
        res.status(404).send('Bad kitten id: ' + req.params.kittesId)
        return;
    };

    res.send({ id: kittenId, name: 'Kircho' + kittenId })
})

app.post('/kittens', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const age = Number(req.body.age);
    addKitten(name, age)
    res.send('Kitten has been created')
});

app.get('/download-png', (req, res) => {
    // Ends the stream by itself
    // res.download('./screenshot.png')
    // You need to end the stream, because you can attach multiply files.
    // res.attachment("./screenshot.png");
    // res.attachment("./screenshot2.png");
    //download and attachment работят с релативни пътища, за attachment трябва да си приключим стрийма, за download не е задължително. С sendFile трябва да си резолвнем задължително пътя за да може работя и все пак браузъра да го отвори и да направи някакво preview 
    // res.end();

    // res.sendFile(path.resolve(__dirname,'./screenshot.png'));
})

app.get("/route-that-will-be-redirected", (req, res) => {
    //
    res.redirect('/kittens')
})

//WILDCARD
app.get('*', (req, res) => {
    res.status(404).send('Sorry, page is not found :(')
});
//**Routing END

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

