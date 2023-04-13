import userModel from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkForUserExistence = await userModel.findOne({ email });

        if (!checkForUserExistence) return res.status(400).json({ msg: `user with the email: ${email} does not exist in the database.` });

        const isPasswordCorrect = await bcrypt.compare(password, checkForUserExistence.password);

        if (!isPasswordCorrect) return res.status(400).json({ msg: 'invalid credentials' });

        const token = jwt.sign({ email: checkForUserExistence.email, id: checkForUserExistence._id }, 'secret', { expiresIn: '1hr' });

        res.status(200).json({ result: checkForUserExistence, token });
    } catch (error) {
        console.log(error);
    }
}

export const signup = async (req, res) => {
    const { email, password, cpassword, fname, lname } = req.body;

    try {
        const checkForUserExistence = await userModel.findOne({ email });

        if (checkForUserExistence) return res.status(400).json({ msg: `user with the email: ${email} already exist in the database.` });

        if (password !== cpassword) return res.status(400).json({ msg: 'the two password does not match.' });

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({ email, password: hashPassword, name: `${fname} ${lname}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ result, token });
    } catch (error) {
        console.log(error)
    }
}