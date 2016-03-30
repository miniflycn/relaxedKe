var data = {},
	cbs = {};

function DB(id) {
	this.id = id;
	this.cur = -1;
	this.imgs = [];
}
var p = DB.prototype;
p.set = function (pos) {
	this.cur = pos;
}
p.add = function (id) {
	this.cur++;
	this.imgs.push({ id: id, record: [], chat: [] });
	this.publish({ type: 'add', id: id });
}
p.record = function (id) {
	this.imgs[this.cur].record.push({ id: id });
	this.publish({ type: 'record', pos: this.cur, id: id })
}
p.publish = function (type, data) {
	cbs[this.id] && cbs[this.id].forEach(function (cb) {
		cb(type, data);
	});
	cbs.length = 0;
}
p.stringify = function () {
	return JSON.stringify({
		imgs: this.imgs
	});
}

module.exports = {
	has: function (id) {
		return id in data;
	},
	get: function (id) {
		if (this.has(id)) return data[id];
		return data[id] = new DB(id);
	},
	subscribe: function (id, cb) {
		(cbs[id] = cbs[id] || []).push(cb);
	}
}