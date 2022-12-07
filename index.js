const express = require('express')
app = express()
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const db = require('./util/db')
var generator = require('./generator/generator')
const clipboard = require('./controller/controller.clipboard')
const userArrival = require('./controller/contoller.user_arrival')

// db.executeQuery('INSERT INTO notes(serial_no, data, code, timestamp) VALUES($1, $2, $3, (SELECT CURRENT_TIMESTAMP))', [10002, 'first data', 1002]).catch((err)=>{
//     console.log(err);
// });
// var result = db.executeQuery('SELECT * FROM notes').then((val)=>{
//     console.log(val);
// })
// console.log(result);
app.use(bodyParser.json());

// The record generator works only once.
// generator.generateRecords(); 
// generator.generateIndex();

app.use('/clipboard', clipboard)
app.use('/user-arrival', userArrival)


app.get('/', (req, res)=>{
    res.send('Application is running !!!')
});

app.listen(PORT, ()=>{
    console.log(`App running at http://localhost:${PORT}/`)
})