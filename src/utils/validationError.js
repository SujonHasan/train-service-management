const requiredCheck = async (errors) => {

    const validationError = {};    

    await Object.keys(errors).forEach(key => {
        validationError[errors[key].path] = errors[key].message;
    })

    return validationError;
}

const uniqueCheck = async (isUnique) => {
    
    const validationError = {};
    await Object.keys(isUnique).forEach(key => {
        validationError[key] = `${isUnique[key]} is already been taken.`;
    });
    return validationError;
}

module.exports = {
    requiredCheck,
    uniqueCheck
}