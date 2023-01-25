const db = require('pg')

// const client = new db.Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'open_clipboard',
//     password: 'root',
//     port: 5432
// });

const client = new db.Client({
    user: 'wezhfbit',
    host: 'tiny.db.elephantsql.com',
    database: 'wezhfbit',
    password: 'bC1A7DV5NUyWZMgSkNocO5rQ554tyTx3',
    port: 5432
});


try{
    client.connect();
}catch(err){
    console.log(err)
}

// client.query('SELECT NOW() as now', (err, res)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(res)
//     }
// })

module.exports = {
    executeQuery : async (sql, sqlParams)=>{
        if(sqlParams != null){
            var text = {
                text: sql,
                values: sqlParams
            }
            console.log(text)

            try{
                var result = await client.query(text);
                return result;
            }catch(err){
                console.log(err)
                throw Error(err)
            }

            // var result = await client.query(text).then(res=>{
            //     console.log(res)
            //     return res;
            // })
            // .catch(err=>{
                
            // });
            // return result;
        }else{
            var result = await client.query(sql);
            return result;
        }
    },
    executeTransactions: async (queries)=>{
        for(var query in queries){
            sqlParam = query.sqlParams;
            sql = query.sql;
            if(sqlParam == null){
                var text = {
                    text: sql,
                    values: sqlParams
                }
                var result = await client.query(text)
                return result;
            }else{
                var result = await client.query(sql);
                return result;
            }
        }
    }
}