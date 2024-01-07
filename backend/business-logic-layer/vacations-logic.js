const dal = require("../data-access-layer/dal");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs")

function getAllVacationsAsync(offset, user_id) {
    return dal.executeQueryAsync(`
        SELECT vacations.*,
        (SELECT COUNT(*) FROM followers WHERE followers.vacation_id = vacations.vacation_id ) AS followers,
        EXISTS(SELECT 1 FROM vacations WHERE vacations.vacation_id = followers.vacation_id AND followers.user_id = ${user_id}) AS followed
        FROM vacations
        LEFT JOIN followers ON vacations.vacation_id = followers.vacation_id
        GROUP BY vacations.vacation_id
        ORDER BY start_date 
        LIMIT 10 offset ${offset}
    `);
}

async function getOneVacations(id) {
    const vacations = await dal.executeQueryAsync(`
        select * from vacations
        where vacation_id = ${id}
    `);

    if(vacations.length === 0){
        throw { status: 404, message: "Vacation not found" };
    }

    return vacations[0];
}

async function insertVacationAsync(vacation) {

    // Check if the date is older than today's date
    const today = new Date();
    const startDate = new Date(vacation.start_date);
    if (startDate < today) {
        throw { status: 400, message: "Start date must be today or later" };
    }

    // Check if the end date is earlier than the start date
    const endDate = new Date(vacation.end_date);
    if (endDate < startDate) {
        throw { status: 400, message: "End date must be equal to or later than start date" };
    }

    console.log(vacation);
    vacation.image_name = uuid.v4() + "_" + vacation.image.name;
    const absolutePath = path.join(__dirname, "..", "images", vacation.image_name);
    console.log(absolutePath);
    await vacation.image.mv(absolutePath);   // mv = move
    const info = await dal.executeQueryAsync(
        "insert into vacations values (DEFAULT,?,?,?,?,?,?)", [vacation.destination, vacation.description, vacation.start_date, vacation.end_date, vacation.price, vacation.image_name]);
    vacation.vacation_id = info.insertId; 
    return vacation;
}

async function updateVacation(vacation) {
    if (vacation.image) {
        if (fs.existsSync("./images/" + vacation.image_name)) {
            fs.unlinkSync("./images/" + vacation.image_name);
        }

        vacation.image_name = uuid.v4() + "_" + vacation.image_name;
        console.log(vacation.image_name);
        const absolutePath = path.join(__dirname, "..", "images", vacation.image_name);
        console.log(absolutePath);
        await vacation.image.mv(absolutePath);   // mv = move
    } 

    vacation.vacation_id = +vacation.vacation_id;

    const sql = `
        UPDATE 
            vacations set 
            destination = '${vacation.destination}', 
            description = '${vacation.description}', 
            start_date = '${vacation.start_date}', 
            end_date = '${vacation.end_date}', 
            price = ${+vacation.price}, 
            image_name = '${vacation.image_name}' 
        WHERE vacation_id = ${vacation.vacation_id}
        `
    const info = await dal.executeQueryAsync(sql)
    if (info.affectedRows === 0) {
        throw { status: 404, message: "vacation not found" }
    }

    return vacation;
}

async function deleteVacation(id) {

    const info = await dal.executeQueryAsync(
        "DELETE from vacations WHERE vacation_id = " + id
    );

    if (info.affectedRows === 0) {
        throw { status: 404, message: "Vacation not found" };
    }
    
    // if( fs.existsSync(vacation.image_name)){
    //     fs.unlink(vacation.image_name);
    // }
}

function followVacationAsync(user_id, vacation_id) {
    return dal.executeQueryAsync(
        `INSERT INTO followers VALUES (${user_id}, ${vacation_id})`
    );

    // if (info.affectedRows === 0) {
    //     throw { status: 404, message: "Vacation not found" };
    // }
}

function unfollowVacationAsync(user_id, vacation_id) {
    return dal.executeQueryAsync(
        `DELETE FROM followers WHERE user_id = ${user_id} AND vacation_id = ${vacation_id}`
    );
}

module.exports = {
    getAllVacationsAsync,
    getOneVacations,
    insertVacationAsync,
    updateVacation,
    deleteVacation,
    followVacationAsync,
    unfollowVacationAsync
}
















/*
const moment = require('moment');


    // Check if the price is higher than 10000
    if (vacation.price > 10000) {
        throw new Error("Price cannot be higher than 10,000");
    }

    // Check if the date is older than today's date
    const today = moment().startOf('day');
    const startDate = moment(vacation.start_date);
    if (startDate.isBefore(today)) {
        throw new Error("Start date must be today or later");
    }

    // Check if the end date is earlier than the start date
    const endDate = moment(vacation.end_date);
    if (endDate.isBefore(startDate)) {
        throw new Error("End date must be equal to or later than start date");
    }
*/