const eventBus = require('./eventBus.js');

eventBus.subscribe("kitten-added", () => {
    console.log('Kitten has been added!');
})
const unsubscribe = eventBus.subscribe("kitten-added", (kittenName, age) => {
    console.log(`Kitten has been added Second time! its nme is ${kittenName} and is ${age} years old`);
})

eventBus.subscribe("kitten-removed", () => {
    console.log('Kitten has been added!');
});

eventBus.publish("kitten-added", "Puffy", 8);
eventBus.publish("kitten-removed")
unsubscribe();
console.log('-------------------------');
eventBus.publish("kitten-added", "Puffy", 8);
eventBus.publish("kitten-removed")
