const { app } = require('./core'); 
const { db, update } = require('./db')

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})


// skriva http://localhost:3000/light/(lampas id)/on för att tända specifika lampan( skriv specifik id)
//skriva http://localhost:3000/light/(lampas id)/(valfri text) för att släcka specifika lampan( skriv specifik id)
 app.get('/light/:id/:on', (req, res) =>{
    let id= req.params.id;
    
     let onOff= req.params.on === "on" ? true : false
     db.get('devices')
     .find({id: id})
     .assign({on : onOff, brightness: 1})
     .value();
    
     update();
     res.send({ msg: `device ${id} is now ${onOff}` });
 }) 


// skriva http://localhost:3000/BLI1/on för att rulla ner rullgardin
// skriva http://localhost:3000/BLI1/(valfri text) för att rulla upp rullgardin
// skriva http://localhost:3000/SPE1/on för att starta högtalaren
// skriva http://localhost:3000/SPE1/(valfri text)  för att stänga av högtalaren
// skriva http://localhost:3000/VAC1/on för att starta dammsugaren
// skriva http://localhost:3000/VAC1/(valfri text) för att stopa dammsugaren
// skriva http://localhost:3000/CAM1/on för att starta kameran
// skriva http://localhost:3000/CAM1/(valfri text) för att stänga av kameran
// skriva http://localhost:3000/AC1/on för att starta luftkonditioneringen
// skriva http://localhost:3000/AC1/(valfri text) för att stänga luftkonditioneringen
 app.get('/:id/:on', (req, res) =>{
    let id= req.params.id;

     let onOff= req.params.on === "on" ? true : false
     db.get('devices')
     .find({id: id})
     .assign({on : onOff})
     .value();
    
     update();
     res.send({ msg: `device ${id} is now ${onOff}` });
 }) 
 // skriva http://localhost:3000/lock/LOC1/on för att öppna dörr låset
  // skriva http://localhost:3000/lock/LOC1/(valfri text)  för att stänga dörr låset
 app.get('/lock/:id/:on', (req, res) =>{
    let id= req.params.id;

     let onOff= req.params.on === "on" ? true : false
     db.get('devices')
     .find({id: id})
     .assign({on : onOff, locked: onOff})
     .value();
    
     update();
     res.send({ msg: `device ${id} is now ${onOff}` });
 }) 