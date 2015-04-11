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
			this.vm.ret = value === undefined ? 'undefined' : JSON.stringify(value)
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
		window.runTestPlan = function(testPlan) {

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
					ret = tstr(str, data)
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

		}
	})();

	(function() {
		var testPlan = []

		testPlan.push({
			title: 'Invalid Arguments',
			args: {
				str: undefined,
				data: undefined,
				option: undefined
			},
			assert: function(ret, error) {
				return error && error.toString().indexOf('invalid argument') !== -1
			}
		})

		testPlan.push({
			title: 'Empty string',
			args: {
				str: '',
				data: {},
				option: undefined
			},
			assert: function(ret, error) {
				// TODO
				return true
			}
		})

		testPlan.push({
			title: 'No variable',
			args: {
				str: 'Text without any variables.',
				data: {},
				option: undefined
			},
			assert: function(ret, error) {
				// TODO
				return true
			}
		})

		testPlan.push({
			title: 'Single variable',
			args: {
				str: 'Hello ${name}!',
				data: {name: 'John'},
				option: undefined
			},
			assert: function(ret, error) {
				// TODO
				return true
			}
		})

		testPlan.push({
			title: 'Multiple variables',
			args: {
				str: 'Hello ${name}! Your email is ${email}',
				data: {name: 'John', email: 'john@company.com'},
				option: undefined
			},
			assert: function(ret, error) {
				// TODO
				return true
			}
		})

		testPlan.push({
			title: 'Filter uri',
			args: {
				str: '${text|uri}',
				data: {text: 'http://www.target.com/path/中文/b/c?query1=value1'},
				option: undefined
			},
			assert: function(ret, error) {
				// TODO
				return true
			}
		})

		testPlan.push({
			title: 'Filter uricom',
			args: {
				str: '${text|uricom}',
				data: {text: 'http://www.target.com/path/中文/b/c?query1=value1'},
				option: undefined
			},
			assert: function(ret, error) {
				// TODO
				return true
			}
		})

		testPlan.push({
			title: 'Double Filter uricom',
			args: {
				str: '${text|uricom|uricom}',
				data: {text: 'http://www.target.com/path/中文/b/c?query1=value1'},
				option: undefined
			},
			assert: function(ret, error) {
				// TODO
				return true
			}
		})

		runTestPlan(testPlan)
	})();

}