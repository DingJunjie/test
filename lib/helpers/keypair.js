'use strict';

var crypto = require('crypto');
var ed = require('./ed.js');
var addressHelper = require("./address");
var Buffer = require("buffer/").Buffer;
var Mnemonic = require("bitcore-mnemonic");

var KeypairHelper = function () {

    /**
     * generate publickey from secret
     * @param {String} secret
     */
    this.create = function (secret) {
        //验证密码信息（根据登录密码生成 keypair）
        var hash = crypto.createHash('sha256').update(secret, 'utf8').digest();
        var keypair = ed.keyFromSecret(hash);
        keypair.publicKey = Buffer.from(keypair.getPublic());
        return keypair;
    },
    this.createSecondKeypair = function (publicKey, secondSecret) {
        //验证密码信息（根据登录密码生成 keypair）
        var md5pass = publicKey.toString().trim() + '-' + crypto.createHash('md5').update(secondSecret.toString().trim()).digest('hex');
        var hash = crypto.createHash('sha256').update(md5pass, 'utf8').digest();
        var keypair = ed.keyFromSecret(hash);
        keypair.publicKey = Buffer.from(keypair.getPublic());
        return keypair;
    },
    /**
     * generate address from publickey
     * @param {publicKey} publicKey
     */
    this.generateBase58CheckAddress = function (publicKey) {
        return addressHelper.generateBase58CheckAddress(publicKey);
    },
    /**
     * 生成密码，需要选项、语言和分隔符，默认分隔符 @#@ 和语言 en
     * @param {*} params 
     * @param {*} lang 
     * @param {*} divide 
     */
    this.generatePassPhraseWithInfo = function( params, lang, divide) {
        divide = divide || '@#@';
        var md5 = crypto.createHash('md5');
        var sha = crypto.createHash('sha256');
        var password = '', cryptoOptStr = '';
        if(Object.keys(params).length > 0) {
            var optionStr = '';
            for(var i in params) {
                optionStr += params[i];
            }
            cryptoOptStr = md5.update(optionStr).digest('hex');
            var reg = /.{4}/g;
            var cryptoArr = cryptoOptStr.match(reg);
            cryptoOptStr = cryptoArr.join(' ');
            cryptoOptStr += divide;
        }

        if(lang === 'cn') {
            password = new Mnemonic(256, Mnemonic.Words.CHINESE)['phrase'];
        }else {
            password = new Mnemonic(256, Mnemonic.Words.ENGLISH)['phrase'];            
        }

        return cryptoOptStr + password;
    },
    this.formatSecondPassphrase = function(publicKey, secondSecret) {

    }
};

module.exports = new KeypairHelper();