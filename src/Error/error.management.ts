import { HTTPError } from './interfaces/error.js';

export class UserErrorController {
    login(error: Error) {
        if (error.message === 'Sorry, user not found.') {
            const httpError = new HTTPError(
                404,
                'Sorry, user not found.',
                error.message
            );
            return httpError;
        }

        if (error.message === 'Sorry, password not valid.') {
            const httpError = new HTTPError(
                403,
                'Sorry, password not valid.',
                error.message
            );
            return httpError;
        }

        const httpError = new HTTPError(
            503,
            'Service unavailable',
            error.message
        );
        return httpError;
    }
    register(error: Error) {
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            error.message
        );
        return httpError;
    }
}

export class ErrorResourcesController {
    createResource(error: Error) {
        if (error.message === 'Invalid payload') {
            const httpError = new HTTPError(
                500,
                'Invalid Payload',
                error.message
            );
            return httpError.message;
        }
        const httpError = new HTTPError(
            500,
            'Sorry, out of service.',
            error.message
        );
        return httpError;
    }
    errorControl(error: Error) {
        const httpError = new HTTPError(
            500,
            'Sorry, out of service.',
            error.message
        );
        return httpError;
    }
}

export class ErrorMiddlewares {
    logged(error: Error) {
        if (error.message === 'Some of your credentials are not correct.') {
            const loggedError = new HTTPError(
                403,
                'Forbidden',
                'Some of your credentials are not correct.'
            );
            return loggedError;
        }
    }
    verifyUser(error: Error) {
        if (error.message === 'Some of your credentials are not correct.') {
            const loggedError = new HTTPError(
                400,
                'Forbidden',
                'Some of your credentials are not correct.'
            );
            return loggedError;
        }
    }
}
