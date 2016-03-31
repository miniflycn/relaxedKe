var attach = require('./chat-mock');
var data = {},
	cbs = {};

function DB(id) {
	this.id = id;
	this.cur = -1;
	this.imgs = [];
	this.events = {};
	// attach mocking
	attach.call(this);
}
var p = DB.prototype;
p.set = function (pos) {
	this.cur = pos;
	this.publish('set', { pos: pos });
}
p.add = function (id) {
	this.cur++;
	this.imgs.push({ id: id, records: [], chat: [] });
	this.publish({ type: 'add', id: id });
}
p.record = function (id, pos) {
	this.imgs[pos].records.push({ id: id });
	this.publish({ type: 'record', pos: pos, id: id })
}
p.publish = function (data) {
	var self = this, type = data.type;
	// just for publish
	cbs[this.id] && 
		cbs[this.id].forEach(function (cb) {
			cb.call(self, data);
		});
	cbs.length = 0;
	// for events
	this.events[type] && 
		this.events[type].forEach(function (cb) {
			cb.call(self, data);
		});
}
p.stringify = function () {
	return JSON.stringify({
		imgs: this.imgs
	});
}
p.on = function (type, cb) {
	(this.events[type] = this.events[type] = []).push(cb);
}
p.say = function (pos, nick, content) {
	this.imgs[pos].chat.push({
		nickname: nick,
		content: content
	});
	this.publish({ type: 'say', pos: pos, nickname: nick, content: content });
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