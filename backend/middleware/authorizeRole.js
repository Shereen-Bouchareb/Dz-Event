
const authorizeRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.userType)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

module.exports = authorizeRole;