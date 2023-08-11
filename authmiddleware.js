function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Move to the next middleware or route handler
    }
    res.redirect('/login'); // Redirect unauthenticated users to login page
}

module.exports = isAuthenticated;