/**
 * @function
 * @description Global error handler middleware that catches errors and sends a response to the client
 * @returns {object} JSON object with status and error message
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode === 404 ? 404 : err.statusCode || 500
    res.status(statuscode)
    res.json({
        status: 'Error',
        message: err?.message,
        // stack: err?.stack,
    })
}

module.exports = errorHandler
