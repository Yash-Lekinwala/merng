export const validateRegisterInput = (
    username,
    email,
    password, 
    confirmPassword
) => {
    const errors = {};

    if(username.trim() === '')
    {
        errors.username = 'Username is required';
    }
    if(email.trim() === '')
    {
        errors.email = 'Email is required';
    }
    else 
    {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx))
        {
            errors.email = 'Email address must be valid.';
        }
    }

    if(password === '')
    {
        errors.password = 'Password is required';
    }
    else if(password !== confirmPassword)
    {
        errors.password = 'Password not match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === '')
    {
        errors.username = 'Username is required';
    }
    
    if(password.trim() === '')
    {
        errors.password = 'Password is required';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}