

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

exports.getPoamLogByPoamId = async function getPoamLogByPoamId(poamId) {
    try {
        if (!poamId) {
            return next({
                status: 400,
                errors: {
                    poamId: 'is required',
                }
            });
        }

        return await withConnection(async (connection) => {
            const sql = `
        SELECT pl.timestamp, pl.action, u.fullName
        FROM vultrack.poamlogs pl
        JOIN vultrack.user u ON pl.userId = u.userId
        WHERE pl.poamId = ?
      `;
            const [rows] = await connection.query(sql, [poamId]);
            const poamLog = rows.map(row => ({
                Timestamp: row.timestamp,
                User: row.fullName,
                Action: row.action
            }));
            return poamLog;
        });
    } catch (error) {
        return { error: error.message };
    }
};