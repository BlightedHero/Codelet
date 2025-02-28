/*
 unit tests for src/components/Student.js
*/
const chai = require('chai');
const Student = require('../../src/components/Student.js');
const josh_id = '1084d543-84d0-4646-8622-fd4dec5b8c73';
const bryn_id = '72298b15-936a-41c2-bd2a-72f28c71a5cd';
const sanyu_id = 'a2e38dbf-2c67-4128-9f79-41704be355f6';
const kenny_id = '6359ac3f-fa5e-4943-8aad-8f7bd76e5f5c';
let kenny = new Student(kenny_id);
let sanyu = new Student(sanyu_id);
let josh = new Student(josh_id);
let bryn = new Student(bryn_id);
let newStudent = new Student('e7a88959-1d70-4ab1-9864-b0512e16cdf3');

describe('Student', () => {
	describe('Get ID', () => {
		beforeEach('Initialize Empty', () => {
			kenny = new Student(kenny_id);
			sanyu = new Student(sanyu_id);
			josh = new Student(josh_id);
			bryn = new Student(bryn_id);

		});
		it('Kenny should be ' + kenny_id, () => {
			chai.expect(kenny.id).to.eql(kenny_id);
		});

		it('Sanyu should be '+ sanyu_id, () => {
			chai.expect(sanyu.id).to.eql(sanyu_id);
		});

		it('Josh should be '+ josh_id, () => {
			chai.expect(josh.id).to.eql(josh_id);
		});

		it('Bryn should be '+ bryn_id, () => {
			chai.expect(bryn.id).to.eql(bryn_id);
		});
	});

	describe('Get Researchers', () => {
		before('Initialize Empty', () => {
			kenny = new Student(kenny_id);
			sanyu = new Student(sanyu_id);
			josh = new Student(josh_id);
			bryn = new Student(bryn_id);
		});

		afterEach('Load from File', () => {
			kenny.load();
			sanyu.load();
			josh.load();
			bryn.load();
		});

		it('All should be empty', () => {
			chai.expect(kenny.researchers).to.eql([]);
			chai.expect(sanyu.researchers).to.eql([]);
			chai.expect(josh.researchers).to.eql([]);
			chai.expect(bryn.researchers).to.eql([]);
		});

		it('One researcher each', () => {
			chai.expect(kenny.researchers).to.eql([]);
			chai.expect(sanyu.researchers).to.eql([]);
			chai.expect(josh.researchers).to.eql([]);
			chai.expect(bryn.researchers).to.eql([]);
		});
	});

	describe('getScore', () => {
		before('Initialize Empty', () => {
			kenny = new Student(kenny_id);
			sanyu = new Student(sanyu_id);
			josh = new Student(josh_id);
			bryn = new Student(bryn_id);
		});

		afterEach('Load from File', () => {
			kenny.load();
			sanyu.load();
			josh.load();
			bryn.load();
		});

		it('All should be zero', () => {
			chai.expect(kenny.getScore(1)).to.eql(0);
			chai.expect(sanyu.getScore(1)).to.eql(0);
			chai.expect(josh.getScore(1)).to.eql(0);
			chai.expect(bryn.getScore(1)).to.eql(0);
		});

		it('All should throw an exception', () => {
			chai.expect(() => kenny.getScore(0)).to.throw("Not a valid question number received trying to get score.");
			chai.expect(() => sanyu.getScore(0)).to.throw("Not a valid question number received trying to get score.");
			chai.expect(() => josh.getScore(0)).to.throw("Not a valid question number received trying to get score.");
			chai.expect(() => bryn.getScore(0)).to.throw("Not a valid question number received trying to get score.");
		});

		it('Each with own score', () => {
			chai.expect(kenny.getScore(1)).to.eql(0);
			chai.expect(sanyu.getScore(1)).to.eql(0);
			chai.expect(josh.getScore(1)).to.eql(0);
			chai.expect(bryn.getScore(1)).to.eql(0);
		});
	});

	describe('getPrompts', () => {
		before('Initialize Empty', () => {
			kenny = new Student(kenny_id);
			sanyu = new Student(sanyu_id);
			josh = new Student(josh_id);
			bryn = new Student(bryn_id);
		});

		afterEach('Load from File', () => {
			kenny.load();
			sanyu.load();
			josh.load();
			bryn.load();
		});

		it('All should be empty', () => {
			chai.expect(kenny.getPrompts(1)).to.eql([]);
			chai.expect(sanyu.getPrompts(1)).to.eql([]);
			chai.expect(josh.getPrompts(1)).to.eql([]);
			chai.expect(bryn.getPrompts(1)).to.eql([]);
		});

		it('All should throw an exception', () => {
			chai.expect(() => kenny.getPrompts(0)).to.throw("Not a valid question number received trying to get prompts.");
			chai.expect(() => sanyu.getPrompts(0)).to.throw("Not a valid question number received trying to get prompts.");
			chai.expect(() => josh.getPrompts(0)).to.throw("Not a valid question number received trying to get prompts.");
			chai.expect(() => bryn.getPrompts(0)).to.throw("Not a valid question number received trying to get prompts.");
		});

		it('Each with own prompts', () => {
			chai.expect(kenny.getPrompts(3)).to.eql([]);
			chai.expect(sanyu.getPrompts(3)).to.eql([]);
			chai.expect(josh.getPrompts(3)).to.eql([]);
			chai.expect(bryn.getPrompts(3)).to.eql([]);
		});
	});

	describe('getResponses', () => {
		before('Initialize Empty', () => {
			kenny = new Student(kenny_id);
			sanyu = new Student(sanyu_id);
			josh = new Student(josh_id);
			bryn = new Student(bryn_id);
		});

		afterEach('Load from File', () => {
			kenny.load();
			sanyu.load();
			josh.load();
			bryn.load();
		});

		it('All should be empty', () => {
			chai.expect(kenny.getResponses(1)).to.eql([]);
			chai.expect(sanyu.getResponses(1)).to.eql([]);
			chai.expect(josh.getResponses(1)).to.eql([]);
			chai.expect(bryn.getResponses(1)).to.eql([]);
		});

		it('All should throw an exception', () => {
			chai.expect(() => kenny.getResponses(0)).to.throw("Not a valid question number received trying to get responses.");
			chai.expect(() => sanyu.getResponses(0)).to.throw("Not a valid question number received trying to get responses.");
			chai.expect(() => josh.getResponses(0)).to.throw("Not a valid question number received trying to get responses.");
			chai.expect(() => bryn.getResponses(0)).to.throw("Not a valid question number received trying to get responses.");
		});

		it('Each with own responses', () => {
			chai.expect(kenny.getResponses(3)).to.eql([]);
			chai.expect(sanyu.getResponses(3)).to.eql([]);
			chai.expect(josh.getResponses(3)).to.eql([]);
			chai.expect(bryn.getResponses(3)).to.eql([]);
		});
	});

	describe('setScore', () => {
		beforeEach('Initialize Empty and Set Score', () => {
			kenny = new Student(kenny_id);
			sanyu = new Student(sanyu_id);
			josh = new Student(josh_id);
			bryn = new Student(bryn_id);
			kenny.setScore(1,99);
			sanyu.setScore(1,89);
			josh.setScore(1,79);
			bryn.setScore(1,69);
		});

		it('Scores have been changed', () => {
			chai.expect(kenny.getScore(1)).to.eql(99);
			chai.expect(sanyu.getScore(1)).to.eql(89);
			chai.expect(josh.getScore(1)).to.eql(79);
			chai.expect(bryn.getScore(1)).to.eql(69);
		});

		it('All should throw an exception', () => {
			chai.expect(() => kenny.setScore(0, 0)).to.throw("Not a valid question number received trying to set the score.");
			chai.expect(() => sanyu.setScore(0, 0)).to.throw("Not a valid question number received trying to set the score.");
			chai.expect(() => josh.setScore(0, 0)).to.throw("Not a valid question number received trying to set the score.");
			chai.expect(() => bryn.setScore(0, 0)).to.throw("Not a valid question number received trying to set the score.");
		});
	});

	describe('addPrompt', () => {
		beforeEach('Initialize Empty and Add Prompt', () => {
			kenny = new Student(kenny_id);
			sanyu = new Student(sanyu_id);
			josh = new Student(josh_id);
			bryn = new Student(bryn_id);
			kenny.addPrompt(1,"New Prompt");
			sanyu.addPrompt(1,"New Prompt");
			josh.addPrompt(1,"New Prompt");
			bryn.addPrompt(1,"New Prompt");
		});

		it('Prompts have been added', () => {
			chai.expect(kenny.getPrompts(1)).to.eql(["New Prompt"]);
			chai.expect(sanyu.getPrompts(1)).to.eql(["New Prompt"]);
			chai.expect(josh.getPrompts(1)).to.eql(["New Prompt"]);
			chai.expect(bryn.getPrompts(1)).to.eql(["New Prompt"]);
		});

		it('All should throw an exception', () => {
			chai.expect(() => kenny.addPrompt(0, " ")).to.throw("Not a valid question number received trying to add a prompt.");
			chai.expect(() => sanyu.addPrompt(0, " ")).to.throw("Not a valid question number received trying to add a prompt.");
			chai.expect(() => josh.addPrompt(0, " ")).to.throw("Not a valid question number received trying to add a prompt.");
			chai.expect(() => bryn.addPrompt(0, " ")).to.throw("Not a valid question number received trying to add a prompt.");
		});
	});

	describe('addResponse', () => {
		beforeEach('Initialize Empty and Add Response', () => {
			kenny = new Student(kenny_id);
			sanyu = new Student(sanyu_id);
			josh = new Student(josh_id);
			bryn = new Student(bryn_id);
			kenny.addResponse(1,"New Response");
			sanyu.addResponse(1,"New Response");
			josh.addResponse(1,"New Response");
			bryn.addResponse(1,"New Response");
		});

		it('Prompts have been changed', () => {
			chai.expect(kenny.getResponses(1)).to.eql(["New Response"]);
			chai.expect(sanyu.getResponses(1)).to.eql(["New Response"]);
			chai.expect(josh.getResponses(1)).to.eql(["New Response"]);
			chai.expect(bryn.getResponses(1)).to.eql(["New Response"]);
		});

		it('All should throw an exception', () => {
			chai.expect(() => kenny.addResponse(0, " ")).to.throw("Not a valid question number received trying to add a response.");
			chai.expect(() => sanyu.addResponse(0, " ")).to.throw("Not a valid question number received trying to add a response.");
			chai.expect(() => josh.addResponse(0, " ")).to.throw("Not a valid question number received trying to add a response.");
			chai.expect(() => bryn.addResponse(0, " ")).to.throw("Not a valid question number received trying to add a response.");
		});
	});

	describe('save', () => {
		before('Save Changes', () => {
			josh = new Student('e7a88959-1d70-4ab1-9864-b0512e16cdf3');
			josh.load();
			newStudent = new Student('e7a88959-1d70-4ab1-9864-b0512e16cdf3');
			newStudent.addResponse(1,"New Response");
			newStudent.addPrompt(1, "New Prompt");
			newStudent.setScore(1, 99);
			newStudent.save();
			newStudent.load();
		});

		after('Revert Changes', () => {
			josh.save();
		});

		it('Changes have saved', () => {
			chai.expect(newStudent.getResponses(1)).to.eql(["New Response"]);
			chai.expect(newStudent.getPrompts(1)).to.eql(["New Prompt"]);
			chai.expect(newStudent.getScore(1)).to.eql(99);
		});
	});
});
