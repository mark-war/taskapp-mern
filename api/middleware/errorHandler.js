import { constants } from "../constants.js";

const errorHandler = (error, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            response.json({
                title: 'Validation Failed',
                message: error.message,
                stackTrace: error.stackTrace
            })
            break
        case constants.NOT_FOUND:
            response.json({
                title: 'Not Found',
                message: error.message,
                stackTrace: error.stackTrace
            })
            break
            case constants.UNAUTHORIZED:
                res.json({
                    title: 'User Unauthorized', 
                    message: err.message, 
                    stackTrace: err.stackTrace
            })
            break
        case constants.FORBIDDEN:
                res.json({
                    title: 'Forbidden Access', 
                    message: err.message, 
                    stackTrace: err.stackTrace
            })
            break
        case constants.SERVER_ERROR:
                res.json({
                    title: 'Server Error', 
                    message: err.message, 
                    stackTrace: err.stackTrace
            })
            break
        default:
            console.log('No error found!')
            break
    }
}

export default errorHandler