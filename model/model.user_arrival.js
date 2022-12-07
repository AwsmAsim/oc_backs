const db = require('../util/db')

var deleteOlder = async ()=>{
    db.executeQuery("Delete user_arrivals where timestamp < (timestamp - INTERVAL '1 month')");
}


module.exports = {
    registerUser : async (ipAddress)=>{
        const sql = 'INSERT INTO user_arrival(uid, timestamp) VALUES($1, CURRENT_TIMESTAMP)';
        const sqlParams = [ipAddress];
        // date in database -> 2022-10-17 11:47:44.145653
        await db.executeQuery(sql, sqlParams);
    },
    getCount: async ()=>{
        const sql = 'Select max(s_no) as no_of_users, count(*) as count as count from userLogs';
        const result = await db.executeQuery(sql);
        console.log(`model.user_arrival.js: result: `)
        console.log(result.rows)
        var count = result.rows[0].count;
        var no_of_users = result.rows[0].no_of_users;

        if(count > 10000){
            deleteOlder();
        }

        return no_of_users;
    }
}