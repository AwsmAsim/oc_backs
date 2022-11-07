const db = require('../util/db')

var deleteOlder = async ()=>{
    await db.executeQuery("UPDATE notes SET data = NULL where timestamp < (timestamp - INTERVAL '1 day')");
}
var deleteEarliest = async ()=>{
    await db.executeQuery("UPDATE notes SET data = NULL where serial_no = (SELECT serial_no from notes order by timestamp limit 1)");
}


module.exports = {

    addMessage: async (responseBody)=>{
        console.log(`response Body: `)
        console.log(responseBody)
        console.log()
        var message = responseBody.message;
        await deleteOlder();
        var results = await db.executeQuery('SELECT * FROM notes where data IS NULL');

        console.log('Results with NULL:')
        console.log(results);
        console.log(`${results}\n\n`)

        if(results.rows.length == 0){
            await deleteEarliest();
            console.log('Result after deleting earliest');
            results = await db.executeQuery('SELECT * FROM notes where data IS NULL');
            console.log(`${results}\n\n`)
        } 

        var randomIdx = Math.floor(Math.random() * results.rows.length);
        var newserial_no = results.rows[randomIdx].serial_no, newCode = results.rows[randomIdx].code;

        console.log(`randomIdx: ${randomIdx}, new serial no: ${newserial_no}, newCode: ${newCode} `)

        try{
            await db.executeQuery('UPDATE notes SET data = $1, timestamp = CURRENT_TIMESTAMP where serial_no = $2', [message, newserial_no]);
            return newCode;
        }catch(err){
            console.log(err);
            throw Error(err)
        }
    },

    getMessage: async (responseBody)=>{

        var code = responseBody.id;
        var result = await db.executeQuery('SELECT data FROM notes where code = $1', [code]);

        console.log('Result obtained')
        console.log(result.rows[0].data)
        console.log(result.rows.length)

        // Handle invalid input, states that no such code exists in the database.
        if(result.rows.length == 0) throw Error('INVALID INPUT'); 
        
        // There's no data for the respsective code
        if(result.rows[0] == null) throw Error('No Data Found');

        return result.rows[0];
    }
}