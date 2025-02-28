const { foo } = require('./function.js');
const chai = require('chai');

describe('Example Question Tests', () => {
	it('1 + 2 = 3', () => {
		chai.expect(foo(1)).to.eql(3);
	});

	it('0 + 2 = 2', () => {
		chai.expect(foo(0)).to.eql(2);
	});

	it('-1 + 2 = 1', () => {
		chai.expect(foo(-1)).to.eql(1);
	});
});