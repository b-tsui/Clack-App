const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { getUserToken, requireAuth } = require("../auth");
const db = require("../db/models");

const { User } = db;

const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");

const userNotFoundError = id => {
    const err = Error(`User with id of ${id} could not be found.`);
    err.title = "User not found.";
    err.status = 404;
    return err;
};

const validateFullName = check("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name");

const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password.")
];

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    if (user) {
        const { fullName, email } = user;
        res.json({ fullName, email });
    } else {
        next(userNotFoundError(userId))
    }
}))


router.post(
    "/",
    validateFullName,
    validateEmailAndPassword,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        const { fullName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, hashedPassword });

        const token = getUserToken(user);
        res.status(201).json({
            user: { id: user.id },
            token
        });
    })
);

router.post("/token", validateEmailAndPassword, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email,
        },
    });
    if (!user || !user.validatePassword(password)) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
}));

router.put('/:id(\\d+)', handleValidationErrors, asyncHandler(async (req, res, next) => {
    const { fullName,
        email,
    } = req.body;

    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    if (user) {
        await user.update({ fullName, email });
        res.json(user);
    } else {
        next(userNotFound(userId));
    }
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    if (user) {
        await user.destroy();
        res.status(204).end();
    } else {
        next(userNotFoundError(userId));
    }
}));

module.exports = router;