const db=require("mysql");

const pool=db.createPool({
    host: "localhost",
    user: "root",
    database: "tagging_vacations_db",
    timezone: "il"
});

function executeQueryAsync(sqlCmd, values) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, values, (err, rows)=> {
            if (err) {
                // console.log(err);
                reject(err);
            }
            else {
                // console.log(rows);
                resolve(rows);
            }
        });
    });
}

module.exports = {
    executeQueryAsync
};