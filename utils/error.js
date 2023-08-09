class error extends Error {
    status
    constructor (message, statusCode) {
        super(message)

        this.name = this.constructor.name
        this.status = statusCode || 400
    }
}

export default error