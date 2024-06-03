

'use strict';
const config = require('../../utils/config')
const dbUtils = require('./utils')
const mysql = require('mysql2')

async function withConnection(callback) {
    const connection = await dbUtils.pool.getConnection();
    try {
        return await callback(connection);
    } finally {
        await connection.release();
    }
}
exports.getAllNotificationsByUserId = async function getAllNotificationsByUserId(userId) {
    try {
        return await withConnection(async (connection) => {
            const sql = `SELECT * FROM vultrack.notification WHERE userId = ? ORDER BY timestamp DESC`;
            const [rows] = await connection.query(sql, [userId]);
            return rows;
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.getUnreadNotificationsByUserId = async function getUnreadNotificationsByUserId(userId) {
    try {
        return await withConnection(async (connection) => {
            const sql = `SELECT * FROM vultrack.notification WHERE notification.read = 0 AND userId = ? ORDER BY timestamp DESC`;
            const [rows] = await connection.query(sql, [userId]);
            return rows;
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.getUnreadNotificationCountByUserId = async function getUnreadNotificationCountByUserId(userId) {
    try {
        return await withConnection(async (connection) => {
            const sql = `SELECT COUNT(userId) AS NotificationCount FROM vultrack.notification WHERE notification.read = 0 AND userId = ?`;
            const [rows] = await connection.query(sql, [userId]);
            const notificationCount = rows[0].NotificationCount.toString();
            return notificationCount;
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.dismissNotificationByNotificationId = async function dismissNotificationByNotificationId(notificationId, userId) {
    try {
        return await withConnection(async (connection) => {
            const userIdQuery = `SELECT userId FROM vultrack.notification WHERE notificationId = ?`;
            const [userId] = await connection.query(userIdQuery, [notificationId]);

            const dismissSql = `UPDATE vultrack.notification SET notification.read = 1 WHERE notificationId = ?`;
            await connection.query(dismissSql, [notificationId]);
            
            const unreadSql = `SELECT * FROM vultrack.notification WHERE notification.read = 0 AND userId = ? ORDER BY timestamp DESC`;
            const [unreadNotifications] = await connection.query(unreadSql, [userId]);

            return unreadNotifications;
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.dismissAllNotificationsByUserId = async function dismissAllNotificationsByUserId(userId) {
    try {
        return await withConnection(async (connection) => {
            const sql = `UPDATE vultrack.notification SET notification.read = 1 WHERE userId = ?`;
            const [result] = await connection.query(sql, [userId]);
            return result.affectedRows > 0;
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.deleteNotificationByNotificationId = async function deleteNotificationByNotificationId(notificationId) {
    try {
        return await withConnection(async (connection) => {
            const sql = `DELETE FROM vultrack.notification WHERE notificationId = ?`;
            const [result] = await connection.query(sql, [notificationId]);
            return result.affectedRows > 0;
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.deleteAllNotificationsByUserId = async function deleteAllNotificationsByUserId(userId) {
    try {
        return await withConnection(async (connection) => {
            const sql = `DELETE FROM vultrack.notification WHERE userId = ?`;
            const [result] = await connection.query(sql, [userId]);
            return result.affectedRows > 0;
        });
    } catch (error) {
        return { error: error.message };
    }
};