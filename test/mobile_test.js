define(["mobile"],
    function(mobile) {
		QUnit.module( 'mobile', function() {
			var tempObj = {};
			try {
				Object.defineProperty(navigator, "userAgent", { 
					get: function () { 
						return tempObj.userAgent;
					}
				});
			} catch (err) {
				//ignore, we're in phantomjs
			}
			function test(userAgent) {
				tempObj.userAgent = userAgent;
				navigator.userAgent = userAgent;
				return mobile.isMobile();
			}
			
			//NOTE: some of these user agents might be munged slightly due to the author's paranoia.
			
			QUnit.test('mobile device', function (assert) {
				navigator = {};
				// chrome on android
				assert.ok(test("Mozilla/5.0 (Linux; Android 5.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.0000.00 Mobile Safari/537.36"));
				// firefox on android
				assert.ok(test("Mozilla/5.0 (Android 5.0.1; Mobile; rv:48.0) Gecko/48.0 Firefox/48.0"));
				// android browser
				assert.ok(test("Mozilla/5.0 (Linux; Android 5.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.0000.00 Mobile Safari/537.36"));
				// safari on ios
				assert.ok(test("Mozilla/5.0 (iPhone; CPU iPhone OS 6_2_1 like Mac OS X) AppleWebKit/000.0.00 (KHTML, like Gecko) Version/9.0 Mobile/12h64 Safari/600.0"));
			});
			
			QUnit.test('mobile pretending to be a desktop', function (assert) {
				navigator = {};
				// chrome on android
				assert.notOk(test("Mozilla/5.0 (X11; Linux x86_64) AppletWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.0000.00 Safari/537.36"));
				// firefox on android
				assert.notOk(test("Mozilla/5.0 (X11; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0"));
				// android browser
				assert.notOk(test("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.0000.00 Safari/537.36"));
			});
			
			QUnit.test('desktop', function (assert) {
				navigator = {};
				// chrome on a desktop
				assert.notOk(test("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.0000.00 Safari/537.36"));
				// firefox on a desktop
				assert.notOk(test("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0"));
				// IE on a desktop
				assert.notOk(test("Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"));
			});
		});
	}
);
