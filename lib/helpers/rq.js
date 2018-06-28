var fetch;
// 浏览器模式
if (typeof self !== "undefined" && self.fetch) {// 浏览器模式（兼容worker）
	fetch = self.fetch;
} else if(typeof window !== "undefined" && window.fetch) {// 老浏览器模式
	// require("whatwg-fetch");
	fetch = window.fetch;
} else {
	// nodejs
	fetch = Function(`return require('node-fetch')`)();
}
const rq = {
	get(url, query) {
		if (query) {
			var query_string_list = [];
			for (var key in query) {
				query_string_list.push(
					encodeURIComponent(key) +
						"=" +
						encodeURIComponent(query[key])
				);
			}
			if (query_string_list.length) {
				url += "?" + query_string_list.join("&");
			}
		}
		return fetch(url, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => res.json());
	},
	put(url, body) {
		return fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}).then(res => res.json());
	}
};
module.exports = rq;
