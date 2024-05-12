const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('./userModel');
const filesUpload = require('../files/controller');
const { createStripeCustomer } = require('../payment/controller');

const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '8h' });

const registerUser = async (user) => {
    const { email, current_password, first_name, last_name, dni } = user;

    if (!email || !current_password || !first_name || !last_name || !dni)
        return null;

    const salt = await bcrypt.genSalt(10);
    user.current_password = await bcrypt.hash(user.current_password, salt);

    // Create a Stripe customer for the user
    try {
        const stripeCustomer = await createStripeCustomer(email, first_name + ' ' + last_name);
        user.stripeCustomerId = stripeCustomer.id;
    } catch (error) {
        console.error('Failed to create Stripe customer:', error);
        throw error;
    }

    const newUser = await model.addUser(user);
    
    return newUser;
};

const deleteUserById = async (userId) => {
    const deletedUser = await model.deleteUser(userId);
    return deletedUser;
};

const updateUserById = async (userId, user) => {
    const updatedUser = await model.updateUser(userId, user);
    return updatedUser;
};

const getUserById = async (userId) => {
    let user = await model.getUsers(null, null, userId);

    user =  user.map(user => ({
        "user_id": user.user_id ,
        "email": user.email ,
        "first_name": user.UserInfo.first_name ,
        "last_name": user.UserInfo.last_name ,
        "dni": user.UserInfo.dni ,
        "role_id": user.Roles[0].role_id,
        "role_name": user.Roles[0].role_name,
        "stripe_customer_id": user.stripe_customer_id,
        "status": user.status
    }));
    return user[0];
};

const getUsers = async (limit, page) => {
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    let users = await model.getUsers(skip, parsedLimit);
    
    const total = await model.getUsersCount();

    users =  users.map(user => ({
        "user_id": user.user_id ,
        "email": user.email ,
        "first_name": user.UserInfo.first_name ,
        "last_name": user.UserInfo.last_name ,
        "dni": user.UserInfo.dni ,
        "role_id": user.Roles[0].role_id,
        "role_name": user.Roles[0].role_name,
        "stripe_customer_id": user.stripe_customer_id,
        "status": user.status
    }));

    return {
        total,
        pages: Math.ceil(total / limit),
        users
    };
};

const loginUser = async (email, current_password) => {
    const user = await model.getUserByEmail(email);

    if (user && await bcrypt.compare(current_password, user.current_password)) {
        const token = generateToken(user.user_id);
        return token;
    } else {
        throw new Error('Login failed');
    }
};

module.exports =  {
    registerUser,
    deleteUserById,
    updateUserById,
    getUserById,
    getUsers,
    loginUser
};
