describe.only('ManageLevels', function () {
	var controller;
	var levels = mockData.getMockLevels();

	beforeEach(function() {
		bard.appModule('app.manageLevels');
		bard.inject('$q', 'logger', 'manageLevelsService');
	});

	it('hello test', function() {
		expect('hello').to.equal('hello');
	});
});