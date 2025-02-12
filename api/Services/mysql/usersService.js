

const dbUtils = require('./utils');
const logger = require('../../utils/logger');
const _this = this
async function withConnection(callback) {
    const connection = await dbUtils.pool.getConnection();
    try {
        return await callback(connection);
    } finally {
        await connection.release();
    }
}

exports.getUsers = async function getUsers() {
    try {
        return await withConnection(async (connection) => {
            let sql = "SELECT * FROM vultrack.user;";
            let [rows] = await connection.query(sql);

            const users = await Promise.all(rows.map(async (user) => {
                const sqlPermissions = "SELECT * FROM vultrack.collectionpermissions WHERE userId = ?";
                const [permissionRows] = await connection.query(sqlPermissions, [user.userId]);

                const permissions = permissionRows.map(permission => ({
                    userId: permission.userId,
                    collectionId: permission.collectionId,
                    accessLevel: permission.accessLevel,
                }));

                return {
                    userId: user.userId,
                    userName: user.userName,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    created: user.created,
                    lastAccess: user.lastAccess,
                    lastCollectionAccessedId: user.lastCollectionAccessedId,
                    accountStatus: user.accountStatus,
                    fullName: user.fullName,
                    officeOrg: user.officeOrg,
                    defaultTheme: user.defaultTheme,
                    lastClaims: user.lastClaims,
                    isAdmin: user.isAdmin,
                    permissions: permissions
                };
            }));

            return users;
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.getCurrentUser = async function getCurrentUser(email) {
    try {
        return await withConnection(async (connection) => {
            const sqlUser = "SELECT * FROM user WHERE email = ?";
            const [userRows] = await connection.query(sqlUser, [email]);

            if (userRows.length === 0) {
                return userRows[0];
            }

            const user = userRows[0];

            const sqlPermissions = "SELECT * FROM vultrack.collectionpermissions WHERE userId = ?";
            const [permissionRows] = await connection.query(sqlPermissions, [user.userId]);

            const permissions = permissionRows.map(permission => ({
                userId: permission.userId,
                collectionId: permission.collectionId,
                accessLevel: permission.accessLevel,
            }));

            return {
                userId: user.userId,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                created: user.created,
                lastAccess: user.lastAccess,
                lastCollectionAccessedId: user.lastCollectionAccessedId,
                accountStatus: user.accountStatus,
                fullName: user.fullName,
                officeOrg: user.officeOrg,
                defaultTheme: user.defaultTheme,
                lastClaims: user.lastClaims,
                isAdmin: user.isAdmin,
                permissions: permissions
            };
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.getUserByUserID = async function getUserByUserID(userId) {
    try {
        return await withConnection(async (connection) => {
            let sql = "SELECT * FROM user WHERE userId = ?";
            const [userRows] = await connection.query(sql, [userId]);

            if (userRows.length === 0) {
                return userRows[0];
            }

            const user = userRows[0];

            const sqlPermissions = "SELECT * FROM vultrack.collectionpermissions WHERE userId = ?";
            const [permissionRows] = await connection.query(sqlPermissions, [user.userId]);

            const permissions = permissionRows.map(permission => ({
                userId: permission.userId,
                collectionId: permission.collectionId,
                accessLevel: permission.accessLevel,
            }));

            return {
                userId: user.userId,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                created: user.created,
                lastAccess: user.lastAccess,
                lastCollectionAccessedId: user.lastCollectionAccessedId,
                accountStatus: user.accountStatus,
                fullName: user.fullName,
                officeOrg: user.officeOrg,
                defaultTheme: user.defaultTheme,
                lastClaims: user.lastClaims,
                isAdmin: user.isAdmin,
                permissions: permissions
            };
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.getUserByUserName = async function getUserByUserName(userName) {
    try {
        return await withConnection(async (connection) => {
            let sql = "SELECT * FROM user WHERE userName = ?";
            const [userRows] = await connection.query(sql, [userName]);

            if (userRows.length === 0) {
                return userRows[0];
            }

            const user = userRows[0];
            const sqlPermissions = "SELECT * FROM vultrack.collectionpermissions WHERE userId = ?";
            const [permissionRows] = await connection.query(sqlPermissions, [user.userId]);

            const permissions = permissionRows.map(permission => ({
                userId: permission.userId,
                collectionId: permission.collectionId,
                accessLevel: permission.accessLevel,
            }));

            const userObject = {
                userId: user.userId,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                created: user.created,
                lastAccess: user.lastAccess,
                lastCollectionAccessedId: user.lastCollectionAccessedId,
                accountStatus: user.accountStatus,
                fullName: user.fullName,
                officeOrg: user.officeOrg,
                defaultTheme: user.defaultTheme,
                lastClaims: user.lastClaims,
                isAdmin: user.isAdmin,
                permissions: permissions
            };
            return userObject;
        });
    } catch (error) {
        logger.writeError('Error in getUserByUserName:', error);
        throw error;
    }
};

exports.getBasicUserByUserID = async function getBasicUserByUserID(userId) {
    try {
        return await withConnection(async (connection) => {
            let sql = "SELECT * FROM user WHERE userId = ?";
            const [userRows] = await connection.query(sql, [userId]);

            if (userRows.length === 0) {
                return userRows[0];
            }

            const user = userRows[0];

            return {
                userId: user.userId,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: user.fullName,
                officeOrg: user.officeOrg,
            };
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.updateUser = async function updateUser(req, res, next) {
    try {
        return await withConnection(async (connection) => {
            let sql = "UPDATE user SET firstName = ?, lastName = ?, email = ?, lastAccess = ?, lastCollectionAccessedId = ?, accountStatus = ?, fullName = ?, officeOrg = ?, defaultTheme = ?, isAdmin = ? WHERE userId = ?";

            await connection.query(sql, [
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                req.body.lastAccess,
                req.body.lastCollectionAccessedId,
                req.body.accountStatus,
                `${req.body.firstName} ${req.body.lastName}`,
                req.body.officeOrg,
                req.body.defaultTheme,
                req.body.isAdmin,
                req.body.userId
            ]);

            sql = "SELECT * FROM user WHERE userId = ?";
            let [updatedUser] = await connection.query(sql, [req.body.userId]);

            return updatedUser[0];
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.setUserData = async function setUserData(userObject) {
    try {
        return await withConnection(async (connection) => {
            let insertColumns = ['userName', 'email', 'firstName', 'lastName', 'fullName', 'lastClaims', 'isAdmin'];
            let updateColumns = ['userId = LAST_INSERT_ID(userId)', 'firstName = VALUES(firstName)', 'lastName = VALUES(lastName)', 'fullName = VALUES(fullName)', 'lastClaims = VALUES(lastClaims)', 'isAdmin = VALUES(isAdmin)'];

            let lastClaimsSerialized = JSON.stringify(userObject.lastClaims);

            let binds = [userObject.userName, userObject.email, userObject.firstName, userObject.lastName, userObject.fullName, lastClaimsSerialized, userObject.isAdmin];

            let sql = `
                INSERT INTO vultrack.user (${insertColumns.join(', ')})
                VALUES (${insertColumns.map(() => '?').join(', ')})
                ON DUPLICATE KEY UPDATE ${updateColumns.join(', ')}
            `;
            const [result] = await connection.query(sql, binds);
            let userId = userObject.userId;
            if (!userId && result.insertId) {
                userId = result.insertId;
            }

            sql = "SELECT * FROM user WHERE userId = ?";
            let [updatedUser] = await connection.query(sql, [userId]);

            if (updatedUser[0]) {
                updatedUser[0].lastClaims = JSON.parse(updatedUser[0].lastClaims);
            }

            return updatedUser[0];
        });
    } catch (error) {
        return { error: error.message };
    }
};


exports.setLastAccess = async function (userId, timestamp) {
    try {
        return await withConnection(async (connection) => {
            let sql = `UPDATE user SET lastAccess = ? where userId = ?`;
            await connection.query(sql, [timestamp, userId]);
            return true
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.deleteUserByUserID = async function deleteUserByUserID(userId, username, displayName) {
    try {
        return await withConnection(async (connection) => {
            let sql = 'DELETE FROM `user` WHERE `userId`= ?';
            await connection.query(sql, [userId]);

            logger.writeInfo("usersService", 'log', { event: 'removed account', userId: userId });
            logger.writeInfo("usersService", 'notification', { event: 'removed account', userId: userId });

            return { message: "User deleted" };
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.loginState = async function loginState(req, res, next) {
    let message = { message: "" };
    if (req.body.loginState == 'logIn') {
        logger.writeInfo("usersService", 'info', { event: 'Logged In' });
        message.message = "Login Success";
    } else {
        logger.writeInfo("usersService", 'info', { event: 'Logged Out' });
        message.message = "Logout Success";
    }
    return message;
};

module.exports.deleteUserByUserID = async function deleteUserByUserID(userId, req, res, next) {
    return await withConnection(async (connection) => {
        let sql_query = 'DELETE FROM `user` WHERE `id`=' + userId;
        await connection.query(sql_query);

        logger.writeInfo("usersService", 'log', { event: 'removed account', userId: userId });
        logger.writeInfo("usersService", 'notification', { event: 'removed account', userId: userId });

        let messageReturned = new Object();
        messageReturned.text = "User deleted";
        return messageReturned;
    });
};