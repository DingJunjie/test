var rq = require("../../helpers/rq");

var prefix = "/api/accounts";

var Account = function(provider) {
	baseUrl = provider.host + prefix;
};

Account.prototype.getUserByAddress = function(address) {
	var url = baseUrl + "?address=" + address;

	return rq.get(url);
};

Account.prototype.getUserByUsername = function(username) {
	var url = baseUrl + "/username/get?username=" + username;

	return rq.get(url);
};

module.exports = Account;
