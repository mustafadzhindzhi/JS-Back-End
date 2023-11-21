const http = require('http');

const homeHtml = require('./views/home/index.js')
const siteCss = require('./content/styles/site.js')
const addBreed = require('./views/addBreed.js')
const catTemplate = require('./views/home/catTemplate.js');
const { moveMessagePortToContext } = require('worker_threads');
const PORT = 3030;

const cats = [
    {
        imageUrl: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg',
        name: 'Tsunami',
        breed: 'ulichna',
        description: 'very cute cat1!'
    },
    {
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*',
        name: 'Pesho',
        breed: 'ulichna',
        description: 'very cute cat2!'
    },
    {
        imageUrl: 'https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg?w=2000',
        name: 'Dancho',
        breed: 'ulichna',
        description: 'very cute cat3!'
    },
    {
        imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/098/204/small/silver-tabby-cat-sitting-on-green-background-free-photo.jpg',
        name: 'Maryika',
        breed: 'ulichna',
        description: 'very cute cat4!'
    },
]

const server = http.createServer((req, res) => {
    const { url } = req;


    if (url === '/') {
        const imageUrlPattern = /{{imageUrl}}/g;
        const namePattern = /{{name}}/g;
        const breedPattern = /{{breed}}/g;
        const descriptionPattern = /{{description}}/g;

        const catHtml = cats.map((cat) => catTemplate.replace(imageUrlPattern, cat.imageUrl).replace(moveMessagePortToContext, cat.name).replace(breedPattern, cat.breed).replace(descriptionPattern, cat.description));
        const homeHtmlTemplate = homeHtml.replace("{{cats}}", catHtml);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(homeHtmlTemplate);
    } else if (url === '/content/styles/site.css') { 
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        res.write(siteCss)
    } else if (url === '/cats/add-breed') {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write(addBreed);
    }

    res.end();
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT
    }`))
