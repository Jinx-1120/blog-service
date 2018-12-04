
import {
  responseClient
} from '../../util/util.js';
import qiniu from 'qiniu';
import config from '../../config/config';


const mac = new qiniu.auth.digest.Mac(config.qiniuConfig.accessKey, config.qiniuConfig.secretKey);

const options = {
  scope: config.qiniuConfig.bucket,
  expires: 100
};
const putPolicy = new qiniu.rs.PutPolicy(options);

exports.getQN = async (req, res, next) => {
  const uploadToken = new qiniu.rs.PutPolicy(options).uploadToken(mac);
  responseClient(res, 200, 200, 'success', {
    token: uploadToken
  })
}




