
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




