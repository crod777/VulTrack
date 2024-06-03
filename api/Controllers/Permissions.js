

const permissionService = require('../Services/mysql/permissionsService');

module.exports.getCollectionPermission = async function getCollectionPermission(req, res, next) {
    try {
        const getCollection = await permissionService.getCollectionPermission(req.params.userName, req.params.collectionId, req, res, next);
        if (getCollection) {
            res.status(200).json(getCollection);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
};

module.exports.getCollectionPermissions = async function getCollectionPermissions(req, res, next) {
    try {
        const permissions = await permissionService.getCollectionPermissions(req, res, next);
        res.status(200).json(permissions);
    } catch (error) {
        if (error.message === 'collectionId is required') {
            res.status(400).json({ error: 'Validation Error', detail: 'collectionId is required' });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.postPermission = async function postPermission(req, res, next) {
    try {
        const permission = await permissionService.postPermission(req, res, next);
        res.status(201).json(permission);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.putPermission = async function putPermission(req, res, next) {
    try {
        const permission = await permissionService.putPermission(req, res, next);
        res.status(200).json(permission);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.deletePermission = async function deletePermission(req, res, next) {
    try {
        await permissionService.deletePermission(req, res, next);
        res.status(204).send();
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};