const errorHandler = (err, req, res, next) => {
    return res.json({msg : err.message})
}

module.exports = errorHandler