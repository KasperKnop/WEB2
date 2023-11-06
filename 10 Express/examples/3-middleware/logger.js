export function logger(req, res, next) {
    console.log(req.protocol + "://" + req.get("host") + req.originalUrl + ": " + new Date().toLocaleTimeString())
    next()
}
