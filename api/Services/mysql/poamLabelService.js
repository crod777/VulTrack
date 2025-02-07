

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

exports.getPoamLabels = async function getPoamLabels(collectionId) {
    try {
        if (!collectionId) {
            return next({
                status: 400,
                errors: {
                    collectionId: 'is required',
                }
            });
        }

        return await withConnection(async (connection) => {
            let sql = `
                SELECT t1.poamId, t1.labelId, labelName
                FROM vultrack.poamlabels t1
                INNER JOIN vultrack.poam t2 ON t1.poamId = t2.poamId
                INNER JOIN vultrack.label t3 ON t1.labelId = t3.labelId
                WHERE t2.collectionId = ?
                ORDER BY t3.labelName
            `;
            let [rowPoamLabels] = await connection.query(sql, [collectionId]);
            var poamLabels = rowPoamLabels.map(row => ({
                poamId: row.poamId,
                labelId: row.labelId,
                labelName: row.labelName,
            }));
            return poamLabels;
        });
    } catch (error) {
        return { error: error.message };
    }
}

exports.getAvailablePoamLabels = async function getAvailablePoamLabels(req, res, next) {
    try {
        const userId = req.params.userId;

        if (!req.params.userId) {
            return next({
                status: 400,
                errors: {
                    userId: 'is required',
                }
            });
        }

        return await withConnection(async (connection) => {
            const [adminRows] = await connection.query("SELECT isAdmin FROM vultrack.user WHERE userId = ?", [userId]);
            const isAdmin = adminRows[0].isAdmin;

            let sql = `
                SELECT t1.poamId, t1.labelId, labelName
                FROM vultrack.poamlabels t1
                INNER JOIN vultrack.poam t2 ON t1.poamId = t2.poamId
                INNER JOIN vultrack.label t3 ON t1.labelId = t3.labelId
            `;
            let params = [];

            if (!isAdmin) {
                const [permissionRows] = await connection.query(`
                    SELECT collectionId 
                    FROM vultrack.collectionpermissions
                    WHERE userId = ? AND accessLevel >= 2
                `, [userId]);

                const collectionIds = permissionRows.map(row => row.collectionId);

                if (collectionIds.length === 0) {
                    return [];
                }

                sql += " WHERE t2.collectionId IN (?)";
                params.push(collectionIds);
            }

            sql += " ORDER BY t3.labelName";

            const [rowPoamLabels] = await connection.query(sql, params);

            const poamLabels = rowPoamLabels.map(row => ({
                poamId: row.poamId,
                labelId: row.labelId,
                labelName: row.labelName,
            }));

            return poamLabels;
        });
    } catch (error) {
        return { error: error.message };
    }
};

exports.getPoamLabelsByPoam = async function getPoamLabelsByPoam(poamId) {
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
            let sql = `
                SELECT t1.poamId, t1.labelId, labelName
                FROM vultrack.poamlabels t1
                INNER JOIN vultrack.poam t2 ON t1.poamId = t2.poamId
                INNER JOIN vultrack.label t3 ON t1.labelId = t3.labelId
                WHERE t1.poamId = ?
                ORDER BY t3.labelName
            `;
            let [rowPoamLabels] = await connection.query(sql, [poamId]);
            var poamLabels = rowPoamLabels.map(row => ({
                poamId: row.poamId,
                labelId: row.labelId,
                labelName: row.labelName,
            }));
            return poamLabels;
        });
    } catch (error) {
        return { error: error.message };
    }
}

exports.getPoamLabelsByLabel = async function getPoamLabelsByLabel(labelId) {
    try {
        if (!labelId) {
            return next({
                status: 400,
                errors: {
                    labelId: 'is required',
                }
            });
        }

        return await withConnection(async (connection) => {
            let sql = `
                SELECT t1.poamId, t1.labelId, labelName
                FROM vultrack.poamlabels t1
                INNER JOIN vultrack.poam t2 ON t1.poamId = t2.poamId
                INNER JOIN vultrack.label t3 ON t1.labelId = t3.labelId
                WHERE t1.labelId = ?
                ORDER BY t3.labelName
            `;
            let [rowPoamLabels] = await connection.query(sql, [labelId]);
            var poamLabels = rowPoamLabels.map(row => ({
                poamId: row.poamId,
                labelId: row.labelId,
                labelName: row.labelName,
            }));
            return { poamLabels };
        });
    } catch (error) {
        return { error: error.message };
    }
}

exports.getPoamLabel = async function getPoamLabel(poamId, labelId) {
    try {
        if (!poamId) {
            return next({
                status: 400,
                errors: {
                    poamId: 'is required',
                }
            });
        } else if (!labelId) {
            return next({
                status: 400,
                errors: {
                    labelId: 'is required',
                }
            });
        }

        return await withConnection(async (connection) => {
            let sql = `
                SELECT t1.poamId, t1.labelId, labelName
                FROM vultrack.poamlabels t1
                INNER JOIN vultrack.poam t2 ON t1.poamId = t2.poamId
                INNER JOIN vultrack.label t3 ON t1.labelId = t3.labelId
                WHERE t1.poamId = ? AND t1.labelId = ?
                ORDER BY t3.labelName
            `;
            let [rowPoamLabel] = await connection.query(sql, [poamId, labelId]);
            var poamLabel = rowPoamLabel.length > 0 ? rowPoamLabel[0] : {};
            return { poamLabel };
        });
    } catch (error) {
        return { error: error.message };
    }
}

exports.postPoamLabel = async function postPoamLabel(req, res, next) {
    if (!req.body.poamId) {
        return next({
            status: 400,
            errors: {
                poamId: 'is required',
            }
        });
    } else if (!req.body.labelId) {
        return next({
            status: 400,
            errors: {
                labelId: 'is required',
            }
        });
    }

    try {
        return await withConnection(async (connection) => {
            let sql_query = `INSERT INTO vultrack.poamlabels (poamId, labelId) VALUES (?, ?)`;
            await connection.query(sql_query, [req.body.poamId, req.body.labelId]);

            if (req.body.poamLog[0].userId) {
                let labelSql = "SELECT labelName FROM vultrack.label WHERE labelId = ?";
                const [label] = await connection.query(labelSql, [req.body.labelId]);
                const labelName = label[0] ? label[0].labelName : "Unknown Label";

                let action = `"${labelName}" label was added to the POAM.`;
                let logSql = "INSERT INTO vultrack.poamlogs (poamId, action, userId) VALUES (?, ?, ?)";
                await connection.query(logSql, [req.body.poamId, action, req.body.poamLog[0].userId]);
            }
            let sql = `
                SELECT t1.poamId, t1.labelId, labelName
                FROM vultrack.poamlabels t1
                INNER JOIN vultrack.poam t2 ON t1.poamId = t2.poamId
                INNER JOIN vultrack.label t3 ON t1.labelId = t3.labelId
                WHERE t1.poamId = ? AND t1.labelId = ?
                ORDER BY t3.labelName
            `;
            let [rowPoamLabel] = await connection.query(sql, [req.body.poamId, req.body.labelId]);
            var poamLabel = rowPoamLabel[0];
            return poamLabel;
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return await withConnection(async (connection) => {
                let fetchSql = "SELECT * FROM vultrack.poamlabels WHERE labelId = ? AND poamId = ?";
                const [existingLabel] = await connection.query(fetchSql, [req.body.labelId, req.body.poamId]);
                return existingLabel[0];
            });
        }
        else {
            return { error: error.message };
        }
    }
}

exports.deletePoamLabel = async function deletePoamLabel(req, res, next) {
    if (!req.params.poamId) {
        return next({
            status: 400,
            errors: {
                poamId: 'is required',
            }
        });
    } else if (!req.params.labelId) {
        return next({
            status: 400,
            errors: {
                labelId: 'is required',
            }
        });
    }

    try {
        return await withConnection(async (connection) => {
            let sql = "DELETE FROM vultrack.poamlabels WHERE poamId = ? AND labelId = ?";
            await connection.query(sql, [req.params.poamId, req.params.labelId]);

            if (req.body.requestorId) {
                let labelSql = "SELECT labelName FROM vultrack.label WHERE labelId = ?";
                const [label] = await connection.query(labelSql, [req.params.labelId]);
                const labelName = label[0] ? label[0].labelName : "Unknown Label";

                let action = `"${labelName}" label was removed from the POAM.`;
                let logSql = "INSERT INTO vultrack.poamlogs (poamId, action, userId) VALUES (?, ?, ?)";
                await connection.query(logSql, [req.params.poamId, action, req.body.requestorId]);
            }
            return {};
        });
    } catch (error) {
        return { error: error.message };
    }
}