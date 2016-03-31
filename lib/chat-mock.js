// 呵呵，这个叫做：温馨聊= =
var nickname = [
	'宁宁', 
	'鸣人',
	'佐助',
	'小樱', 
	'菜菜', 
	'@我爱罗', 
	'老鼠爱大米',
	'天天向上',
	'没事做',
	'打豆豆',
	'狗带',
	'WoW'
];
var word = [
	'老师好', 
	'什么鬼！', 
	'老师讲得好！', 
	'呵呵', 
	'终于进来了', 
	'卡了', 
	'学习学习'
];

function mock(self, num) {
	function cb() {
		if (num-- > 0) print(self, cb);
	}
	cb();
}

function print(self, cb) {
	setTimeout(function () {
		self.say(
			self.cur, 
			nickname[Math.random() * nickname.length | 0],
			word[Math.random() * word.length | 0]
		);
		cb();
	}, Math.random() * 5000);
}
/**
 * attach chat
 */
function attach() {
	this.on('add', function () {
		var self = this;
		mock(self, Math.random() * 10 | 0 + 1);
	});
}

module.exports = attach;