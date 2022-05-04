const {wrapAsync} = require('../utils/helper');
const User = require('../models/user');
const Note = require('../models/note');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        throw new Error("Need to login first");
    }
    next();
}

module.exports.isAuthorized = wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user._id && !user._id.equals(req.session.userId)) {
        throw new Error("Not an authorized user", 401);
    }
    next();
});

module.exports.isProperNote = wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (note.owner && !note.owner.equals(req.session.userId)) {
        throw new Error("Not an authorized user for this note", 401);
    }
    next();
});
