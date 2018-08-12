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

  // var _files = req.files[0];
  // var item, _name, _tmp;
  // item = _files, _name = item.originalname;
  // if (_name && item.path) { //这里需要判断文件名称和路径是否为空
  //   var tmpPath = item.path,
  //     type = item.mimetype,
  //     extension_name = '',
  //     tmp_name = (Date.parse(new Date()) / 1000) + '' + (Math.round(Math.random() * 9999)); //生成随机名称
  //   switch (type) { //判断文件类型
  //     case 'image/pjpeg':
  //       extension_name = 'jpg';
  //       break;
  //     case 'image/jpeg':
  //       extension_name = 'jpg';
  //       break;
  //     case 'image/gif':
  //       extension_name = 'gif';
  //       break;
  //     case 'image/png':
  //       extension_name = 'png';
  //       break;
  //     case 'image/x-png':
  //       extension_name = 'png';
  //       break;
  //     case 'image/bmp':
  //       extension_name = 'bmp';
  //       break;
  //     default:
  //       if (_name.indexOf('.') <= 0) return; //其他文件则默认上传
  //       else {
  //         _tmp = _name.split('.');
  //         extension_name = _tmp[_tmp.length - 1];
  //         break;
  //       }
  //   }
  //   tmp_name = tmp_name + '.' + extension_name;
  //   let targetPath = tmp_name, //设置上传路径
  //     is = fs.createReadStream(tmpPath),
  //     os = fs.createWriteStream(targetPath);
  //   console.log(os);
  //   util.pump(is, os, function () {
  //     fs.unlinkSync(tmpPath);
  //     console.log('upload success : ', targetPath);
  //     res.json({ //设置返回值
  //       error: 0,
  //       url: 'upload/' + tmp_name,
  //       title: tmp_name,
  //       message: tmp_name
  //     });
  //   });
  // };

}
