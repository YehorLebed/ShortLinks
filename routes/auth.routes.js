const { Router } = require('express');
const { check } = require('express-validator');
const userControllers = require('../controllers/user.controllers');
const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля: 6 символов').isLength({ min: 6 })
  ],
  userControllers.registration
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный пароль').isEmail(),
    check('password', 'Введите корректный пароль').exists()
  ],
  userControllers.login
);

module.exports = router;