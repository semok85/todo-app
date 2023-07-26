/**
 * This class is used to represent errors that occur within an application.
 * @class
 * @extends Error
 * @param {string} message - A human-readable description of the error that occurred.
 * @param {number} statusCode - An HTTP status code that represents the error that occurred.
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = AppError
