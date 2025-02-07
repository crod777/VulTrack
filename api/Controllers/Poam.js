

const poamService = require('../Services/mysql/poamService');

module.exports.getAvailablePoams = async function getAvailablePoams(req, res, next) {
    try {
        const poams = await poamService.getAvailablePoams(req, res, next);
        res.status(200).json(poams);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.getPoam = async function getPoam(req, res, next) {
    try {
        const poam = await poamService.getPoam(req, res, next);
            res.status(200).json(poam);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.getPoamsByCollectionId = async function getPoamsByCollectionId(req, res, next) {
    try {
        const poams = await poamService.getPoamsByCollectionId(req, res, next);
            res.status(200).json(poams);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.getPoamsBySubmitterId = async function getPoamsBySubmitterId(req, res, next) {
    try {
        const poams = await poamService.getPoamsBySubmitterId(req, res, next);
            res.status(200).json(poams);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.postPoam = async function postPoam(req, res, next) {
    try {
        const poam = await poamService.postPoam(req, res, next);
        if (poam.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: poam.errors });
        } else if (poam.error) {
            res.status(500).json({ error: 'Internal Server Error', detail: poam.error });
        } else {
            res.status(201).json(poam);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.putPoam = async function putPoam(req, res, next) {
    try {
        const poam = await poamService.putPoam(req, res, next);
        if (poam.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: JSON.stringify(poam.errors) });
        } else if (!poam) {
            res.status(500).json({ error: 'Internal Server Error', detail: 'Failed to update POAM' });
        } else {
            res.status(200).json(poam);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.updatePoamStatus = async function updatePoamStatus(req, res, next) {
    try {
        const poam = await poamService.updatePoamStatus(req, res, next);
        if (poam.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: poam.errors });
        } else if (!poam) {
            res.status(500).json({ error: 'Internal Server Error', detail: 'Failed to update POAM' });
        } else {
            res.status(200).json(poam);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.deletePoam = async function deletePoam(req, res, next) {
    try {
        const result = await poamService.deletePoam(req, res, next);
        if (result.error) {
            res.status(500).json({ error: 'Internal Server Error', detail: result.error });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};