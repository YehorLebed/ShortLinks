const { validationResult } = require('express-validator');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Links');


module.exports.generate = async (req, res) => {
  try {

    const exists = await Link.findOne({ from: req.body.from });
    if (exists) {
      return res.status(200).json({ link: exists });
    }

    const baseUrl = config.get('baseUrl');
    const code = shortid.generate();
    const to = baseUrl + '/t/' + code;

    const link = new Link({
      code, to,
      from: req.body.from,
      owner: req.user.userId
    });
    await link.save();

    return res.status(201).json({ link });

  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова"
    });
  }
}

module.exports.getAll = async (req, res) => {
  try {

    const links = await Link.find({ owner: req.user.userId });
    return res.status(200).json({ links });

  } catch (error) {
    return res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова"
    });
  }
}

module.exports.getById = async (req, res) => {
  try {

    const link = await Link.findById(req.params.id);
    return res.status(200).json({ link });

  } catch (error) {

    return res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова"
    });

  }
}

module.exports.redirect = async (req, res) => {
  try {

    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++;
      await link.save();
      return res.status(301).redirect(link.from);
    }

    return res.status(404).json({
      message: 'Ccылка не найдена'
    })
  } catch (error) {

    return res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова"
    });

  }
}