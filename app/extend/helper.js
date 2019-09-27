'use strict';

const crypto = require('crypto');
const path = require('path');

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  baseUrl: '/public/excels/',
  basePath: path.join(__dirname, '../public/excels/'),

  postgraduatePath: 'postgraduate/',
  undergraduatePath: 'undergraduate/',

  cryptoPwd:(password)=>{
    const prefix = '1663er%^h#$61';
    var sha1 = crypto.createHash('sha1');
    sha1.update(prefix + password);
    var pwd = sha1.digest('hex');
    return pwd;
  },

  randomString: (len)=> {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTVUWXYZLIabcdefhijkmnpgqvurstwxyz123456789';
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  },


  randomNumber:(num)=>{
    var str = '';
    for(var i = 0; i < num; i += 1){
      str += Math.floor(Math.random() * 10);
    }
    return str;
  }


};
