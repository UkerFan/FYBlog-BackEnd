var router = require('express').Router();
var UserDao = require('../dao/UserDao');
var config = require('../config').account;

router.post('/login', function(req, res, next) {
  UserDao.getUserInfo(req.body.name).then(function(users) {
    if (!users || users.length < 1) res.status(200).json({ code: -100, msg: '用户名不存在' });
    if (!users[0].authenticate(req.body.password)) {
      res.status(200).json({ code: -102, msg: '用户名密码错误'});
    }
    req.session.accessToken = users[0]._id;
    req.session["user"] = users[0];
    res.cookie(config.access_token_name_cookie, users[0]._id, {
      maxAge: config.expire_time
    });
    res.status(200).json({ code: 0, result: users[0] });
  }).fail(function(error) {
    next(error);
  });
});

router.post('/register', function(req, res, next) {
  req.body.groupId = 1; // 强制注册用户为普通用户
  req.body.updateAt = req.body.createAt = new Date().getTime();
  req.body.active = true;
  UserDao.checkExist(req.body).then(function(users) {
    if (users && users.length > 0) res.status(200).json({ code: -103, msg: '用户已存在' });
    // TODO test .create
    UserDao.save(req.body).then(function(user) {
      res.status(200).json({ code: 0, msg: '保存成功' });
    }).fail(function(error) {
      res.status(200).json({ code: -200, msg: '保存失败', extraMsg: error });
    });
  }).fail(function(error) {
    next(error);
  });
});

router.post('/reset', function(req, res, next) {
  UserDao.getUserInfo(req.body.name).then(function(users) {
    if (!users || users.length < 1) res.status(200).json({ code: -100, msg: '当前用户不存在' });
    UserDao.resetPass(req.body).then(function() {
      res.status(200).json({ code: 0, msg: '重置成功' });
    }).fail(function(error) {
      res.status(200).json({ code: -200, msg: '重置失败', extraMsg: error });
    });
  }).fail(function(error) {
    next(error);
  });
});

router.get('/list', function(req, res, next) {
  UserDao.getAll().then(function(users) {
    res.status(200).json({ code: 0, result: users });
  }).fail(function(error) {
    next(error);
  });
});

module.exports = router;