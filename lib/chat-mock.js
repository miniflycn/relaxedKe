var data = [
	{
		nickname: '玲玲',
		content: '老师好！'
	}, {
		nickname: 'test',
		content: '测试测试'
	}, {
		nickname: '教育教育',
		content: '神马？'
	}
]
/**
 * attach chat
 */
function attach() {
	this.on('add', function () {
		var self = this;
		setTimeout(function () {
			var item = data[Math.random() * data.length | 0];
			self.say(self.cur, item.nickname, item.content);
		}, Math.random() * 5000 + 1000);
	});
}

module.exports = attach;