// import external Dependencies
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

/**
 * 
 * @param {*} password 
 * @returns encrypted password
 */
const encryptPassword = async (password) =>{
    return await bcrypt.hash(password, 12);
};

/**
 * 
 * @param {*} password 
 * @param {*} encryptPassword 
 * @returns Boolean Value
 */
const isMatch = async(password, encryptPassword) =>{
    return await bcrypt.compare(password, encryptPassword);
};

/**
 * 
 * @param {*} userId 
 * @param {*} email 
 * @returns 
 */
const tokenImplement = (userId, email) =>{
    return JWT.sign(
        {
            userId : userId,
            email : email
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn : "5h" }
    );
};

// export
module.exports = { encryptPassword , isMatch , tokenImplement};