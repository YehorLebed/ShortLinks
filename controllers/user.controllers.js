const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');


module.exports.registration = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
      });
    }

    const { email, password } = req.body;
    console.log('email:', email, 'password:', password)

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: 'Пользователь с таким email уже существует'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      message: 'Пользователь зарегестрирован'
    });

  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова"
    });
  }
}

module.exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе в систему'
      });
    }

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        message: 'Пользователя с таким email не существует'
      });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Неверный пароль, попробуйте снова'
      });
    }

    const userToken = jwt.sign(
      { userId: userExists.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token: userToken,
      userId: userExists.id
    });
  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова"
    });
  }
}
