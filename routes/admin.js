var express = require('express');
var router = express.Router();
// 数据结构
var models = require("../models/models");
var Blog = models.Blog;
var Tags = models.Tags;
var List = models.List;

var Contact = models.Contact;
var moment = require('moment');

//文件传输
var multer = require('multer');
var upload = multer()
//图片处理
var images = require('images');
//uuid
const uuidv1 = require('uuid/v1');
//获取时间
router.get("/getTime/", function(req, res) {
	var time = moment().format('LL');
	var time2 = moment().format();
	var time3 = moment().format('l');
	res.json({
		time: time,
		time2: time2,
		time3: time3,
		status: true,

	});
})
//留言联系上传接口
router.post('/blogContact/', function(req, res) {
	//实例化
	var contact = new Contact(req.body);
	console.log(req.body)
	contact
		.save(function(err) {
			if(err) {
				console.log(err);
				res.json({
					status: false,
					msg: "提交失败！"
				})
				return;
			}
			//存储成功时
			res.json({
				status: true,
				msg: "提交成功！",
			})
		})
	// res.redirect("/")
});
//列表上传接口
router.post('/list/', function(req, res) {
	//实例化
	var list = new List(req.body);
	console.log(req.body)
	list
		.save(function(err) {
			if(err) {
				console.log(err);
				res.json({
					status: false,
					msg: "提交失败！"
				})
				return;
			}
			//存储成功时
			res.json({
				status: true,
				msg: "提交成功！",
			})
		})
	// res.redirect("/")
});
//获取列表
router.get("/getlist/", function(req, res) {
    List
        .find(req.query, function(err, doc) {
            if (err) {
                console.log(err);
                return;
            }

            if (!doc) {
                res.json({
                    status: false,
                    msg: "信息获取失败"
                });
                return;
            }
            res.json({
                status: true,
                msg: "获取成功！",
                data: doc
            });

        });

})
// 上传文章
router.post('/blog/', function(req, res) {
	//实例化
	var blog = new Blog(req.body);
	console.log(req.body)
	blog
		.save(function(err) {
			if(err) {
				console.log(err);
				res.json({
					status: false,
					msg: "提交失败！"
				})
				return;
			}
			//存储成功时
			res.json({
				status: true,
				msg: "提交成功！",
			})
		})
	// res.redirect("/")
});
//获取博客
router.get("/getBlog/", function(req, res) {
    Blog
        .find(req.query, function(err, doc) {
            if (err) {
                console.log(err);
                return;
            }

            if (!doc) {
                res.json({
                    status: false,
                    msg: "信息获取失败"
                });
                return;
            }
            res.json({
                status: true,
                msg: "获取成功！",
                data: doc
            });

        });

})
//主图图片接口
router.post("/upload/img", upload.single('file'), function(req, res) {
	console.log(req.file);
	//判断是否为图片

	var Exg = /^image\/\w+$/;
	var flag = Exg.test(req.file.mimetype);
	if(!flag) {
		res.json({
			status: false,
			msg: "格式错误，请选择一张图片",
		});
		return;
	}
	//判断图片体积是否小于2M
	if(req.file.size >= 2 * 1024 * 1024) {
		res.json({
			status: false,
			msg: "图片体积太大，请压缩图片",
		});
		return;
	}
	// 判断图片尺寸
	var width = images(req.file.buffer).width()
	console.log(width)
	if(width < 300 || width > 1500) {
		res.json({
			status: false,
			msg: "图片尺寸请在300-1500之间"
		})
	}
	// 处理图片文件名
	var originalName = req.file.originalname;
	var formate = originalName.split(".");
	// 扩展名
	var extName = "." + formate[formate.length - 1]
	var fileNmae = uuidv1();
	//存储文件夹
	var fileFolder = "/images/blogs/";

	images(req.file.buffer)
		.resize(720) //缩放尺寸至720宽
		.save("public" + fileFolder + fileNmae + "_lg" + extName, {
			quality: 70 //保存图片到文件,图片质量为70
		});
	images(req.file.buffer)
		.resize(360) //缩放尺寸至360宽
		.save("public" + fileFolder + fileNmae + "_md" + extName, {
			quality: 70 //保存图片到文件,图片质量为70
		});
	// 返回储存结果
	res.json({
		status: true,
		msg: "图片上传处理成功",
		lgImg: fileFolder + fileNmae + "_lg" + extName,
		mdImg: fileFolder + fileNmae + "_md" + extName

	})
});

//通用图片上传接口
router.post("/upload/common", upload.single('file'), function(req, res) {
	console.log(req.file);
	//判断是否为图片

	var Exg = /^image\/\w+$/;
	var flag = Exg.test(req.file.mimetype);
	if(!flag) {
		res.json({
			// errno 即错误代码，0 表示没有错误。
			//       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
			errno: 1,

			// // data 是一个数组，返回若干图片的线上地址
			// data: [
			//     '图片1地址',
			//     '图片2地址',
			//     '……'
			// ]
			msg: "格式错误，请选择一张图片",
		});
		return;
	}
	//判断图片体积是否小于2M
	if(req.file.size >= 2 * 1024 * 1024) {
		res.json({
			errno: 1,
			msg: "图片体积太大，请压缩图片",
		});
		return;
	}

	// 处理图片文件名
	var originalName = req.file.originalname;
	var formate = originalName.split(".");
	// 扩展名
	var extName = "." + formate[formate.length - 1]
	var fileNmae = uuidv1();
	//存储文件夹
	var fileFolder = "/images/details/";

	images(req.file.buffer)
		.save("public" + fileFolder + fileNmae + extName, {
			quality: 70 //保存图片到文件,图片质量为70
		});
	// 返回储存结果
	res.json({
		errno: 0,
		msg: "图片上传处理成功",
		data: [fileFolder + fileNmae + extName]

	})
});
module.exports = router;