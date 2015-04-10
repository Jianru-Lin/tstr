onload = function() {

	// convinient log method

	(function() {

		var ui = new Vue({
			el: document.querySelector('.log'),
			data: {
				testList: []
			}
		})

		function TestLogger() {
			var modal = {
				title: undefined,
				args: {
					str: undefined,
					data: undefined,
					option: undefined
				},
				ret: undefined,
				error: undefined,
				success: undefined
			}
			ui.testList.push(modal)
			this.vm = ui.testList[ui.testList.length - 1]
		}

		TestLogger.prototype.title = function(value) {
			this.vm.title = value
		}

		TestLogger.prototype.args = function(str, data, option) {
			this.vm.args.str = str === undefined ? 'undefined' : JSON.stringify(str)
			this.vm.args.data = data === undefined ? 'undefined' : JSON.stringify(data)
			this.vm.args.option = option === undefined ? 'undefined' : JSON.stringify(option)
		}

		TestLogger.prototype.ret = function(value) {
			this.vm.ret = value
		}

		TestLogger.prototype.error = function(errorObj) {
			this.vm.error = errorObj.toString()
		}

		TestLogger.prototype.success = function() {
			this.vm.success = true
		}

		TestLogger.prototype.failure = function() {
			this.vm.success = false
		}

		window.TestLogger = TestLogger
	})();

	(function() {
		var testPlan = []

		testPlan.push({
			title: 'Invalid Arguments',
			args: {
				str: undefined,
				data: undefined
			},
			assert: function(ret, error) {
				return error && error.toString().indexOf('invalid argument') !== -1
			}
		})

		for (var i = 0, len = testPlan.length; i < len; ++i) {
			var logger = new TestLogger()
			var test = testPlan[i]
			doTest(test, logger)
		}

		function doTest(test, logger) {
			logger.title(test.title)
			var ret, err
			var str = test.args.str
			var data = test.args.data
			logger.args(str, data)
			try {
				var ret = tstr(str, data)
				logger.ret(ret)
			}
			catch (_err) {
				err = _err
				logger.error(err)
			}
			var success = test.assert(ret, err)
			if (success) {
				logger.success()
			}
			else {
				logger.failure()
			}
		}
	})();

}