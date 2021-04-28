const { app } = require('./core'); 
const { db, update } = require('./db')

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})


app.get('/:id/:on', (req, res) =>{
    let id= req.params.id;

    let color;
     let brightness;
     let locked;
     let state;
     let on; 
     let file;
     let property= {};

     let onOff= req.params.on === "on" ? (id === "LIG1" ? (color = "#800080",  brightness= 0.7, state= "on",on = true ): id=== "LIG2" ? (color = "0000FF", brightness= 1,state= "on",on = true ): id=== "LIG3" ? (color = "#00FFFF",  brightness= 0.3,state= "on",on = true  ) :  id ===  "LOC1" ? locked= true :  id ===  "VAC1" ? (on = true, state= "charging"  ):  id==="BLI1" ?(on = true, state= "down" ) :  id=== "AC1"?(on = true, state= "on" ) : id=== "CAM1" ? (on = true) : id=== "SPE1" ? (on = true, file= "testfile.ogg"):     false         ) 
     
     : id === "LIG1" ? (state= "off" ): id=== "LIG2" ? (state= "off" ): id=== "LIG3" ? (state= "off"  ) :  id ===  "LOC1" ? locked= false :  id ===  "VAC1" ? (on = false, state= "off"  ):  id==="BLI1" ?(on = false, state= "up" ) :  id=== "AC1"?(on = false, state= "off" ) : id=== "CAM1" ? (on = false) : id=== "SPE1" ? (on = false, file= "testfile.mp3") : (onOff = "on")
 
    
 
    
     db.get('devices').find({id:id}).assign({on : on, brightness :brightness, color :color, locked : locked, state:state, file:file}).value();
     update();
     res.send({ msg: `device ${id} is now ${onOff}` });
 })