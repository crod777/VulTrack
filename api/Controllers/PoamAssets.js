

const poamAssetService = require('../Services/mysql/poamAssetService')

module.exports.getPoamAssets = async function getPoamAssets(req, res, next) {
    try {
        var poamAssets = await poamAssetService.getPoamAssets(req, res, next);
        res.status(200).json(poamAssets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.getPoamAssetsByPoamId = async function getPoamAssetsByPoamId(req, res, next) {
    try {
        var poamAssets = await poamAssetService.getPoamAssetsByPoamId(req, res, next);
            res.status(200).json(poamAssets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.deletePoamAssetByPoamId = async function deletePoamAssetByPoamId(req, res, next) {
    try {
        await poamAssetService.deletePoamAssetByPoamId(req, res, next);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.getPoamAssetsByAssetId = async function getPoamAssetsByAssetId(req, res, next) {
    try {
        var poamAssets = await poamAssetService.getPoamAssetsByAssetId(req, res, next);
            res.status(200).json(poamAssets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.postPoamAsset = async function postPoamAsset(req, res, next) {
    try {
        var poamAsset = await poamAssetService.postPoamAsset(req, res, next);
        if (poamAsset === null) {
            res.status(400).json({ error: 'Failed to create PoamAsset' });
        } else {
            res.status(201).json(poamAsset);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.deletePoamAsset = async function deletePoamAsset(req, res, next) {
    try {
        await poamAssetService.deletePoamAsset(req, res, next);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};