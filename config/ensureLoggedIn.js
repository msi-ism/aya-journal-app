
module.exports = (req, res, next) => {
    // ^ Status Code of 401 is Unauthorized
    if (!req.user) return res.status(401).json('Unauthorized')
    next()
}