const db = require('../util/db')

// This is used for the first time to generate all the available records

module.exports = {
    generateRecords : ()=>{
        var firstRecordSerialNo = 10001;
        var firstCode = 1001, lastCode = 9999;

        for(var i = firstCode; i<=lastCode; i++){
            db.executeQuery('INSERT INTO notes VALUES($1, $2, $3, NOW())', 
            [firstRecordSerialNo, null, i]);
            ++firstRecordSerialNo;
        }

    },
    generateIndex: async ()=>{
        await db.executeQuery('CREATE INDEX NULL_MSGS ON notes(data) WHERE data IS NULL');
    }
}