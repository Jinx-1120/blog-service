import { responseClient } from '../util';
import config from '../../config/config';
import multer from 'multer';

var storage = multer.diskStorage({
  //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
  //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
  destination: config.uploadPath,
  //TODO:文件区分目录存放
  //获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, fileFormat[0] + "." + fileFormat[fileFormat.length - 1]);
  }
});

//添加配置文件到muler对象。
var upload = multer({
  storage: storage,
  //其他设置请参考multer的limits
  //limits:{}
});
exports.upload = upload;

exports.uploadImg = (req, res, next) => {
  // console.log(req.file);
  // console.log(req);
  let data = {
    path: '/uploads/' + req.file.path.split('/uploads/')[1],
    baseImgUrl: config.baseImgUrl
  }
  responseClient(res, 200, 201, 'success', data);

}
