const mongoose = require('mongoose');
const Dog = require('./models/dog.js');

const CONNECTION_STR = 'mongodb://localhost:27017';
const DATABASE_NAME = 'DogsDB';

async function connectDb() {
    await mongoose.connect(`${CONNECTION_STR}/${DATABASE_NAME}`);
    console.log(`You have been connected to database ${DATABASE_NAME} ...`);

    //Static, virtual, methods
    /*
        const dogs = await Dog.find();
        // dogs.forEach((dog) => dog.bark()) 
        // dogs.forEach((dog) => console.log(dog.description))
        const d = await Dog.getDogsCollection(1);
        console.log(d);
    */

    //CRUD  

    //CREATE
    /* 1. 
    const newDog = new Dog({name:"Lisko", age:7, color:"Orange"}); // създаваме си инстанция на лиско и той си има всичко, ид дори, но в базата го няма и не се отразява, затова трябва да го сейвнем
    newDog.save();
    */
    /*2. Този вариант е по-удобен и по-удачен
    const newDog = await Dog.create({name: 'Sharo', age:8, color: 'Sharen'});
    */
    // console.log(newDog);

    //READ
    // const dogs = await Dog.find();
    // const dogs = await Dog.find({age:1}) //Roshko
    /* const DOG_ID = ''
    const dogs = await Dog.findById('')
    */
    // const dogs = await Dog.findOne({age:4}); //връща обект

    // console.log(dogs);

    //UPDATE
    /* Variant 1
    const updateDog = await Dog.updateOne({ name: "Roshkoe" }, { $set: { name: "Roshko" } }) // { {name: "Roshko"} } - mongoose way // с updateOne му казваме точно какво да ъпдейтне и точно по какъв начин
    */
    /*Variant 2
    const DOG_ID = '65187757de178299ab688181'
    const dog = await Dog.findById(DOG_ID);
    dog.age = -3;
    dog.color = 'transperant';
    dog.save();
    */
    /*Variant 3
    const DOG_ID = '65187757de178299ab688181'
    Dog.findByIdAndUpdate(DOG_ID, {name: 'Toshko'});
    console.log(x);
*/

    //DELETE
    /*Variant 1
    const DOG_ID = '65187757de178299ab688181';
    await Dog.deleteOne({name: "Lisko"})
    */
    /*Variant 2
     const DOG_ID = '65187757de178299ab688181';
     await Dog.findByIdAndDelete(DOG_ID);
     */
};

connectDb();

// FROM THE DB
// const DB_DOGS = [{
//     _id: "651820031bf18da392498909",
//     name: "Spike",
//     age: 4,
//     color: "Black"
// }, {
//     _id: "651820031bf18da394598909",
//     name: "Jonny",
//     age: 5,
//     color: "Shiny"
// }, {
//     _id: "561820031bf18da392498909",
//     name: "Mike",
//     age: 2,
//     color: "Brown"
// }
// ]

// THEN WHEN THEY ARE FETCHED, THEY ARE MAPPED WITH THE SCHEMA
// const transformedDbDogs = DB_DOGS.map((dog) => {
//     return {
//         ...dog,
//         getDescription: function () {
//             return `This dog is called ${this.name}!`
//         }
//     }
// });

// //when all ready
// transformedDbDogs.forEach((dog) => console.log(dog.getDescription()));