/**
 * function to wrap async function and automaticly pass error in to error handler middleware
 * @param fn function without error handling
 * @returns function with error handling
 */
const wrapAsync = (fn) => (req, res, next) =>
    fn(req, res, next).catch((error) => next(error))

module.exports = wrapAsync
