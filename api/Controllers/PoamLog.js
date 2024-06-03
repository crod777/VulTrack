

const poamLogService = require('../Services/mysql/poamLogService')

module.exports.getPoamLogByPoamId = async function getPoamLogByPoamId(req, res, next) {
    try {
        const { poamId } = req.params;
        var poamLog = await poamLogService.getPoamLogByPoamId(poamId);
        res.status(200).json(poamLog);
    } catch (error) {
        if (error.message === 'POAM ID is required') {
            res.status(400).json({ error: 'Validation Error', detail: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};