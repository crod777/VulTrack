

const poamMilestoneService = require('../Services/mysql/poamMilestoneService')

module.exports.getPoamMilestones = async function getPoamMilestones(req, res, next) {
    try {
        const { poamId } = req.params;
        var poamMilestones = await poamMilestoneService.getPoamMilestones(poamId);
        res.status(200).json(poamMilestones);
    } catch (error) {
        if (error.message === 'POAM ID is required') {
            res.status(400).json({ error: 'Validation Error', detail: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
}

module.exports.postPoamMilestone = async function postPoamMilestone(req, res, next) {
    try {
        const { poamId } = req.params;
        var poamMilestone = await poamMilestoneService.postPoamMilestone(poamId, req.body);
        res.status(201).json(poamMilestone);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
}

module.exports.putPoamMilestone = async function putPoamMilestone(req, res, next) {
    try {
        const { poamId, milestoneId } = req.params;
        var poamMilestone = await poamMilestoneService.putPoamMilestone(poamId, milestoneId, req.body);
        res.status(200).json(poamMilestone);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
}

module.exports.deletePoamMilestone = async function deletePoamMilestone(req, res, next) {
    try {
        const { poamId, milestoneId } = req.params;
        await poamMilestoneService.deletePoamMilestone(poamId, milestoneId, req.body);
        res.status(204).send();
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
}