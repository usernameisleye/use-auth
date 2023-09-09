const response = {
    error: (response) => {
        return {
            response,
            success: false
        }
    },

    success: (response, data) => {
        return {
            response,
            success: true,
            data
        }
    }
}

module.exports = response