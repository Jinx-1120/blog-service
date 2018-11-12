
import {
  responseClient
} from '../util';
import qiniu from 'qiniu';

const config = {
  accessKey: 'MhOv5O079qyo0pgRWc-l3x1LwJCBtCpI9n_AnChp',
  secretKey: 'AdQhdj8UdxQp3ZJSeK_vBPE5CLoW7y82UJdH8w93',
  bucket: 'blogimg',
  origin: 'qn.jinhaidi.cn.qiniudns.com'
  // uploadURL: argv.qn_uploadURL || 'http://up.qiniu.com/'
}

const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);

const options = {
  scope: 'blogimg',
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

exports.getQN = async (req, res, next) => {
  responseClient(res, 200, 200, 'success', {
    token: uploadToken
  })
}
exports.uploadqn = async (req, res, next) => {
  // const token = await client.uploadToken();
  console.log(req.file)

  const config = new qiniu.conf.Config();
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const localFile = '/Users/jinhaidi/Documents/GitHub/blog/service/public/uploads/3.png';
  // formUploader.putFile(uploadToken, 'ssss', req.body, putExtra, (respErr, res, resinfo) => {
  //   console.log(resinfo)
  //   console.log(respErr)
  //   console.log(res)
  //   // if (resinfo.statusCode == 200) {
  //   //   responseClient(res, 200, 200, 'success', {})
  //   // }
  // })
}




