

const poamAssigneeService = require('../Services/mysql/poamAssigneeService');

exports.getPoamAssignees = async function getPoamAssignees(req, res, next) {
    try {
        const result = await poamAssigneeService.getPoamAssignees();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while retrieving POAM assignees" });
    }
};

exports.getPoamAssigneesByPoamId = async function getPoamAssigneesByPoamId(req, res, next) {
    try {
        const result = await poamAssigneeService.getPoamAssigneesByPoamId(req.params.poamId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while retrieving POAM assignees by poamId" });
    }
};


exports.getPoamAssigneesByUserId = async function getPoamAssigneesByUserId(req, res, next) {
    try {
        const result = await poamAssigneeService.getPoamAssigneesByUserId(req, res, next);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while retrieving POAM assignees by userId" });
    }
};

exports.getPoamAssignee = async function getPoamAssignee(req, res, next) {
    try {
        const result = await poamAssigneeService.getPoamAssignee(req, res, next);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while retrieving the POAM assignee" });
    }
};

exports.postPoamAssignee = async function postPoamAssignee(req, res, next) {
    try {
        const assignee = await poamAssigneeService.postPoamAssignee(req, res, next);
        return res.status(201).json(assignee);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while creating the POAM assignee" });
    }
};

exports.deletePoamAssignee = async function deletePoamAssignee(req, res, next) {
    try {
        await poamAssigneeService.deletePoamAssignee(req, res, next);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the POAM assignee" });
    }
};