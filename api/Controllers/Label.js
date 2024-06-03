

const labelService = require('../Services/mysql/labelService');

module.exports.getLabels = async function getLabels(req, res, next) {
    try {
        const labels = await labelService.getLabels(req, res, next);
        res.status(200).json(labels);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.getLabel = async function getLabel(req, res, next) {
    try {
        const label = await labelService.getLabel(req, res, next);
            res.status(200).json(label);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.postLabel = async function postLabel(req, res, next) {
    try {
        const label = await labelService.postLabel(req, res, next);
        res.status(201).json(label);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.putLabel = async function putLabel(req, res, next) {
    try {
        const label = await labelService.putLabel(req, res, next);
        res.status(200).json(label);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.deleteLabel = async function deleteLabel(req, res, next) {
    try {
        await labelService.deleteLabel(req, res, next);
        res.status(204).send();
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};