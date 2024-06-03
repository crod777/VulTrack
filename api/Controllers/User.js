

const userService = require('../Services/mysql/usersService');

module.exports.getUsers = async function getUsers(req, res, next) {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getCurrentUser = async function getCurrentUser(req, res, next) {
    try {
        const email = "test@test.com";
        const user = await userService.getCurrentUser(email);
        res.status(200).json(user);
    } catch (error) {
        if (error.message === "User not found") {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.getUserByUserID = async function getUserByUserID(req, res, next) {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserByUserID(userId);
        res.status(200).json(user);
    } catch (error) {
        if (error.message === "User not found") {
            res.status(200).json(user);
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};


module.exports.getUserByUserName = async function getUserByUserName(req, res, next) {
    try {
        const userName = req.params.userName;
        const user = await userService.getUserByUserName(userName);
        res.status(200).json(user);
    } catch (error) {
        if (error.message === "User not found") {
            res.status(200).json(user);
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.getBasicUserByUserID = async function getBasicUserByUserID(req, res, next) {
    try {
        const userId = req.params.userId;
        const user = await userService.getBasicUserByUserID(userId);
        res.status(200).json(user);
    } catch (error) {
        if (error.message === "User not found") {
            res.status(200).json(user);
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.updateUser = async function updateUser(req, res, next) {
    try {
        const updatedUser = await userService.updateUser(req, res, next);
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.message === "User update failed") {
            res.status(400).json({ error: 'Bad Request', detail: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.deleteUser = async function deleteUser(req, res, next) {
    try {
        const userId = req.params.userId;
        await userService.deleteUserByUserID(userId, req.userObject.username, req.userObject.displayName);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.loginState = async function loginState(req, res, next) {
    try {
        const message = await userService.loginState(req, res, next);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};