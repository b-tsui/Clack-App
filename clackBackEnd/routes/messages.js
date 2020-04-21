const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { getUserToken, requireAuth } = require("../auth");
const db = require("../db/models");

const { Channel, User, Message, ChannelUser } = db;

const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");

const userPermissionError = () => {
    const err = Error('You do not have permission to do this');
    err.title = "User alert.";
    err.status = 404;
    return err;
};

router.post('/channels/:channelId/messages', asyncHandler(async (req, res) => {
    const { message, userId } = req.body;
    const channelId = parseInt(req.params.channelId, 10);
    const newMessage = await Message.create({ message, userId: Number(userId), channelId });
    res.status(201).json({ newMessage });
}));

router.put('/messages/:id', asyncHandler(async (req, res, next) => {
    const { userId, message } = req.body;
    const id = parseInt(req.params.id, 10);
    const messageToEdit = await Message.findByPk(id);
    if (messageToEdit && (Number(userId) === messageToEdit.dataValues.userId)) {
        await messageToEdit.update({ message });
        res.json({ messageToEdit });
    } else {
        next(userPermissionError());
    }
}));

router.delete('/messages/:id', asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
    const id = parseInt(req.params.id, 10);
    const message = await Message.findByPk(id);
    if (message && (Number(userId) === message.dataValues.userId)) {
        await message.destroy();
        res.status(204).end();
    } else {
        next(userPermissionError());
    }
}));

module.exports = router;