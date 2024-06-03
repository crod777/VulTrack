

const poamExtensionService = require('../Services/mysql/poamExtensionService');

exports.getPoamExtension = async function (req, res, next) {
    try {
        const poamExtensions = await poamExtensionService.getPoamExtension(req.params.poamId);
        if (!poamExtensions.length) {
            res.status(200).json([]);
        } else {
            res.status(200).json(poamExtensions);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.putPoamExtension = async function (req, res, next) {
    try {
        const updatedPoamExtension = await poamExtensionService.putPoamExtension(req.body);
        res.status(200).json(updatedPoamExtension);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deletePoamExtension = async function (req, res, next) {
    try {
        await poamExtensionService.deletePoamExtension(req.params.poamId);
        res.status(200).json({ message: "POAM extension deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
