// convinient log method

(function() {
	function TestLogger() {
		
	}

	TestLogger.prototype.title = function(text) {

	}

	TestLogger.prototype.args = function(str, data) {

	}

	TestLogger.prototype.ret = function(value) {

	}

	TestLogger.prototype.error = function(errorObj) {

	}

	TestLogger.prototype.printLn = function(text) {

	}

	TestLogger.prototype.success = function() {

	}

	TestLogger.prototype.failure = function() {

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

	onload = function() {
		for (var i = 0, len = testPlan.length; i < len; ++i) {
			var logger = TestLogger()
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
	}
})();