import User from '../../models/User.js';
import { SECRET_KEY } from '../../config.js';

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';
import { validateLoginInput, validateRegisterInput } from '../../util/validators.js';

function generateToken(user)
{
    return jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username,
        }, SECRET_KEY, {expiresIn: '1h'});
}

export default {
    Mutation: {
        async register(_, {registerInput: {username, email, password, confirmPassword}})
        {
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid)
            {
                throw new UserInputError('Errors', {errors});
            }
            
            const user = User.findOne({username});
            if(user)
            {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }

            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id:res._id,
                token
            }
        },
        async login(_, {username, password})
        {
            const {valid, errors} = validateLoginInput(username,  password);    
            if(!valid)
            {
                throw new UserInputError('Errors', {errors});
            }
            
            const user = await User.findOne({username});
            if(!user)
            {
                errors.general = 'User not Found';
                throw new UserInputError('User not Found', {errors});
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match)
            {
                errors.general = 'Credentials not match';
                throw new UserInputError('Credentials not match', {errors});
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id:user._id,
                token
            }
        }
    }
}