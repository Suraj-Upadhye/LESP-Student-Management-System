export const CreateSuccess = (statusCode, successMessage, data) =>{
    const successObj = {
        status: statusCode,
        message: successMessage,
        data: data ? data : {}  // if there is any data passed in the function parameters then it will be added to the 'data' property of our 
    }
    return successObj;
}