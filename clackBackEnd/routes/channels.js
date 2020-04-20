const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { getUserToken, requireAuth } = require("../auth");
const db = require("../db/models");

const { Channel, User } = db;

const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");

router.get('/:channelId/members', asyncHandler(async (req, res) => {
    const channelId = parseInt(req.params.channelId, 10);
    const members = await Channel.findAll({
        include: [{ model: User, attributes: ["fullName", "id"] }],
        where: { id: channelId }
    });
    const [{ Users }] = members;
    res.json({ Users });
}));
module.exports = router;