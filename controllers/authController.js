const userModel = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const error = require('../errors')

const register = async (req, res) => {
    const {email, name, password} = req.body
    const emailAlreadyInUse = await userModel.findOne({email})

    if(emailAlreadyInUse)
        throw new error.BadRequestError('Email already in use')

    const isFirstAccount = (await userModel.count({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await userModel.create({email, name, password, role})
    res.status(StatusCodes.CREATED).json({user})
}

const login = async (req, res) => {
    res.send('login user')

}

const logout = async (req, res) => {
    res.send('logout user')
}

module.exports = {
    register,
    login,
    logout
}