const jwt = require("jsonwebtoken");
const dal = require("../data-access-layer/dal");
const crypto = require("crypto");    // npm i crypto
const uuid = require("uuid");        // npm i uuid


async function loginAsync(credentials) {

    try {
        // Encode password:
        credentials.password = hash(credentials.password);

        // Get user with email and encoded password:
        const users = await dal.executeQueryAsync(
            `
            select * from users 
            where email='${credentials.email}'
            and password='${credentials.password}'
        `
        );
        if (!users || users.length < 1) throw { isError: true, status: 400, message: "Incorrect login details, please try again." };
        const user = users[0]
        // Do not send password back to the client!!
        delete user.password;

        // Get JWT token and assign it to the user:
        user.token = jwt.sign({ user: user }, "zot hahizdamnut lenasot et jey dablyou tea", { expiresIn: "5 minutes" });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function existedEmail(email) {
    const sql = `SELECT * FROM users WHERE email='${email}'`
    const result = await dal.executeQueryAsync(sql);
    console.log(result);
    return (result.length > 0)
}

async function registerAsync(user) {
    try {
        if (await existedEmail(user.email)) {
            throw { isEmailError: true, status: 400, message: "Email already exists, login or register with another email" }
        }
        // Encode (hash) password: 
        user.password = hash(user.password);

        const sql = `INSERT INTO users VALUES (DEFAULT, '${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}', false)`;
        const info = await dal.executeQueryAsync(sql);

        // no need to return back id, only uuid:
        user.user_id = info.insertId;

        // Delete password so it won't returned to the frontend:
        delete user.password;

        // Generate new token:
        user.token = jwt.sign({ user: user }, "zot hahizdamnut lenasot et jey dablyou tea", { expiresIn: "8h" });

        return user;
    }

    catch (error) {
        throw error;
    }
}


function hash(plainText) {

    if (!plainText) return null;

    // Hashing with salt:
    const salt = "LefichachNitkanasnoooAnooo";   // KenLatziporBeinHaetzim
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");

}

module.exports = {
    registerAsync,
    loginAsync
};