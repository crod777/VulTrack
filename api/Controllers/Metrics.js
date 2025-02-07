

const metricsService = require('../Services/mysql/metricsService');

module.exports.getCollectionAssetLabel = async function getCollectionAssetLabel(req, res, next) {
    try {
        const getMetrics = await metricsService.getCollectionAssetLabel(req, res, next);
        if (getMetrics) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getCollectionPoamLabel = async function getCollectionPoamLabel(req, res, next) {
    try {
        const getMetrics = await metricsService.getCollectionPoamLabel(req, res, next);
        if (getMetrics) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getCollectionPoamStatus = async function getCollectionPoamStatus(req, res, next) {
    try {
        const getMetrics = await metricsService.getCollectionPoamStatus(req, res, next);
        if (getMetrics && getMetrics.poamStatus) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getCollectionPoamSeverity = async function getCollectionPoamSeverity(req, res, next) {
    try {
        const getMetrics = await metricsService.getCollectionPoamSeverity(req, res, next);
        if (getMetrics && getMetrics.poamSeverity) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getCollectionPoamScheduledCompletion = async function getCollectionPoamScheduledCompletion(req, res, next) {
    try {
        const getMetrics = await metricsService.getCollectionPoamScheduledCompletion(req, res, next);
        if (getMetrics && getMetrics.poamScheduledCompletion) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getCollectionMonthlyPoamStatus = async function getCollectionMonthlyPoamStatus(req, res, next) {
    try {
        const getMetrics = await metricsService.getCollectionMonthlyPoamStatus(req, res, next);
        if (getMetrics && getMetrics.poamStatus) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getAvailableAssetLabel = async function getAvailableAssetLabel(req, res, next) {
    try {
        const getMetrics = await metricsService.getAvailableAssetLabel(req, res, next);
        if (getMetrics) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getAvailablePoamLabel = async function getAvailablePoamLabel(req, res, next) {
    try {
        const getMetrics = await metricsService.getAvailablePoamLabel(req, res, next);
        if (getMetrics) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getAvailableCollectionPoamCounts = async function getAvailableCollectionPoamCounts(req, res, next) {
    try {
        const getMetrics = await metricsService.getAvailableCollectionPoamCounts(req, res, next);
        if (getMetrics) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getAvailablePoamStatus = async function getAvailablePoamStatus(req, res, next) {
    try {
        const getMetrics = await metricsService.getAvailablePoamStatus(req, res, next);
        if (getMetrics && getMetrics.poamStatus) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getAvailablePoamSeverity = async function getAvailablePoamSeverity(req, res, next) {
    try {
        const getMetrics = await metricsService.getAvailablePoamSeverity(req, res, next);
        if (getMetrics && getMetrics.poamSeverity) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getAvailableMonthlyPoamSeverity = async function getAvailableMonthlyPoamSeverity(req, res, next) {
    try {
        const getMetrics = await metricsService.getAvailableMonthlyPoamSeverity(req, res, next);
        if (getMetrics && getMetrics.poamSeverity) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getAvailableMonthlyPoamStatus = async function getAvailableMonthlyPoamStatus(req, res, next) {
    try {
        const getMetrics = await metricsService.getAvailableMonthlyPoamStatus(req, res, next);
        if (getMetrics && getMetrics.poamStatus) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getAvailablePoamScheduledCompletion = async function getAvailablePoamScheduledCompletion(req, res, next) {
    try {
        const getMetrics = await metricsService.getAvailablePoamScheduledCompletion(req, res, next);
        if (getMetrics && getMetrics.poamScheduledCompletion) {
            res.status(200).json(getMetrics);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};