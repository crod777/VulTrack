const assetService = require('../Services/mysql/assetService')

module.exports.getAssets = async function getAssets(req, res, next) {
    try {
        var assets = await assetService.getAssets(req, res, next);
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
}

module.exports.getAsset = async function getAsset(req, res, next) {
    try {
        var asset = await assetService.getAsset(req, res, next);
        res.status(200).json(asset);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.getAssetByName = async function getAssetByName(req, res, next) {
    try {
        var asset = await assetService.getAssetByName(req, res, next);
        res.status(200).json(asset);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
};

module.exports.getAssetsByCollection = async function getAssetsByCollection(req, res, next) {
    try {
        var response = await assetService.getAssetsByCollection(req, res, next);
        var assets = response.assets;
        res.status(200).json(assets);
    } catch (error) {
        if (error.message === 'Collection ID is required') {
            res.status(400).json({ error: 'Validation Error', detail: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
}

module.exports.postAsset = async function postAsset(req, res, next) {
    try {
        var asset = await assetService.postAsset(req, res, next);
        res.status(201).json(asset);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
}

module.exports.putAsset = async function putAsset(req, res, next) {
    try {
        var asset = await assetService.putAsset(req, res, next);
        res.status(200).json(asset);
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
}

module.exports.deleteAsset = async function deleteAsset(req, res, next) {
    try {
        await assetService.deleteAsset(req, res, next);
        res.status(204).send();
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
}

module.exports.deleteAssetsByPoamId = async function deleteAssetsByPoamId(req, res, next) {
    try {
        await assetService.deleteAssetsByPoamId(req, res, next);
        res.status(204).send();
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json({ error: 'Validation Error', detail: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error', detail: error.message });
        }
    }
}