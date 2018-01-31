//定义数据库存储结构
var mongoose = require("../config/mongoose"); //    把创建的mongoose。js  require进来（连接文件）
var models = {};
//创建文章结构
var blogSchema = mongoose.Schema({
	sort: String,
	postTime: Date,
	timer: String,
	textName: String,
	textTags: [String],
	mdImg: String,
	lgImg: String,
	textmain: String,
	textContent: String,

});
// User大写代表Model
models.Blog = mongoose.model('Blog', blogSchema);

//创建标签结构
//var tagsSchema = mongoose.Schema({
//	textTags: [String]
//});
// User大写代表Model
//models.Tags = mongoose.model('Tags', tagsSchema);

//创建留言联系结构
var contactSchema = mongoose.Schema({
	ename:String,
	email:String,
	esubject:String,
	emessage:String,
	
});
// User大写代表Model
models.Contact = mongoose.model('Contact', contactSchema);


//列表结构
var listSchema = mongoose.Schema({
	name:String,
	num:String,
	tel:String,
	sex:String,
	normal:String,
	age:String,
	job:String,
	serve:String,
	date:Date,
	telnum:String,
});
// User大写代表Model
models.List = mongoose.model('List', listSchema);





//模块化
module.exports = models;