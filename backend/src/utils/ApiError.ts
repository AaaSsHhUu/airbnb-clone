interface ApiError{
    statusCode : number;
    message : string;
}

class ApiError extends Error{
    constructor(statusCode : number, message : string){
        super(message);
        this.statusCode = statusCode;
        this.stack = Error.captureStackTrace(this,this.constructor)! || [];
    }
}

// In TypeScript, if you define an interface and a class with the same name, the interface's structure is automatically merged with the class’s type definition. This is called declaration merging.
// Or you have to do class xyz extends Error implements xyz{...}

export default ApiError;