/*
 unit tests for src/controllers/Student.controller.js
*/

const chaiModule = require('chai');
const chaiHttp = require('chai-http');
const chai = chaiModule.use(chaiHttp);
const express = require('express');
const app = express();
const fs = require('fs');
const student_controller = require('../../src/controllers/Student.controller.js');
const Student = require('../../src/components/Student.js');
app.use(express.json());
app.use('/students', student_controller);
const students = JSON.parse(fs.readFileSync('data/students.json'));
const questionlist = JSON.parse(fs.readFileSync('data/questions.json'))["questionList"];
describe('Student API', () => {
/*
	describe('GET/students', () => {
		it('GET/student should fail', function(done) {
			chai.request(app).get('/student').end((err, res) => {
				chai.expect(res).to.have.status(404);
				done();
			});
		});

		it('GET/students should return list of student IDs', function(done) {
			chai.request(app).get('/students').end((err, res) => {
				chai.expect(res).to.have.status(200);
				chai.expect(res.body).to.eql(student_ids);
				done();
			});
		});
	});
*/
	describe('GET/students/{id}', () => {
		students["students"].forEach((student) => {
			it(`GET/students/${student.id} should return ${student.username}, ${student.password}`, function(done) {
				chai.request(app).get(`/students/${student.id}`).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql({"username":student.username, "password":student.password});
					done();
				});
			});
		});

		it('GET/students/notValid should return Status 500', function(done) {
			chai.request(app).get('/students/notValid').end((err, res) => {
				chai.expect(res).to.have.status(400);
				chai.expect(res.body).to.eql("Invalid Student ID");
				done();
			});
		});
	});

	describe('GET/students/id/{username}', () => {
		students["students"].forEach((student) => {
			it(`GET/students/id/${student.username} should return ${student.id}`, function(done) {
				chai.request(app).get(`/students/id/${student.username}`).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql(student.id);
					done();
				});
			});
		});

		it('GET/students/id/notValid should return Status 500', function(done) {
			chai.request(app).get('/students/id/notValid').end((err, res) => {
				chai.expect(res).to.have.status(500);
				done();
			});
		});
	});

	describe('GET/students/{student_id}/question/{question_number}', () => {
		students["students"].forEach((student) => {
			let stu = new Student(student.id);
			stu.load();
			questionlist.forEach((qn) => {
				it(`GET/students/${student.id}/question/${qn.question_number} should return Status 200`, function(done) {
					chai.request(app).get(`/students/${student.id}/question/${qn.question_number}`).end((err, res) => {
						chai.expect(res).to.have.status(200);
						chai.expect(res.body).to.eql({"score": stu.getScore(qn.question_number),
													  "prompts": stu.getPrompts(qn.question_number),
													  "responses": stu.getResponses(qn.question_number)});
						done();
					});
				});
			});
		});

		it('GET/students/notValid/question/1 should return Status 500', function(done) {
			chai.request(app).get('/students/notValid/question/1').end((err, res) => {
				chai.expect(res).to.have.status(500);
				done();
			});
		});

		students["students"].forEach((student) => {
			it(`GET/students/${student.id}/question/0 should return Status 500`, function(done) {
				chai.request(app).get(`/students/${student.id}/question/0`).end((err, res) => {
					chai.expect(res).to.have.status(500);
					chai.expect(res.body).to.eql("Not a valid question number received trying to get score.");
					done();
				});
			});
		});
	});

	describe('GET/students/{student_id}/question/{question_number}/score', () => {
		students["students"].forEach((student) => {
			let stu = new Student(student.id);
			stu.load();
			it(`GET/students/${student.id}/question/0/score should return Status 500`, function(done) {
				chai.request(app).get(`/students/${student.id}/question/0/score`).end((err, res) => {
					chai.expect(res).to.have.status(500);
					chai.expect(res.body).to.eql("Not a valid question number received trying to get score.");
					done();
				});
			});

			questionlist.forEach((qn) => {
				it(`GET/students/${student.id}/question/${qn.question_number}/score should return ${stu.getScore(qn.question_number)}`, function(done) {
					chai.request(app).get(`/students/${student.id}/question/${qn.question_number}/score`).end((err, res) => {
						chai.expect(res).to.have.status(200);
						chai.expect(res.body).to.eql(stu.getScore(qn.question_number));
						done();
					});
				});
			});
		});
	});

	describe('GET/students/{student_id}/question/{question_number}/prompts', () => {
		students["students"].forEach((student) => {
			let stu = new Student(student.id);
			stu.load();
			it(`GET/students/${student.id}/question/0/prompts should return Status 500`, function(done) {
				chai.request(app).get(`/students/${student.id}/question/0/prompts`).end((err, res) => {
					chai.expect(res).to.have.status(500);
					chai.expect(res.body).to.eql("Not a valid question number received trying to get prompts.");
					done();
				});
			});

			questionlist.forEach((qn) => {
				it(`GET/students/${student.id}/question/${qn.question_number}/prompts should return ${stu.getPrompts(qn.question_number)}`, function(done) {
					chai.request(app).get(`/students/${student.id}/question/${qn.question_number}/prompts`).end((err, res) => {
						chai.expect(res).to.have.status(200);
						chai.expect(res.body).to.eql(stu.getPrompts(qn.question_number));
						done();
					});
				});
			});
		});
	});

	describe('GET/students/{student_id}/question/{question_number}/responses', () => {
		students["students"].forEach((student) => {
			let stu = new Student(student.id);
			stu.load();
			it(`GET.students/${student.id}/question/0/responses should return Status 500`, function(done) {
				chai.request(app).get(`/students/${student.id}/question/0/responses`).end((err, res) => {
					chai.expect(res).to.have.status(500);
					chai.expect(res.body).to.eql("Not a valid question number received trying to get responses.");
					done();
				});
			});

			questionlist.forEach((qn) => {
				it(`GET/students/${student.id}/question/${qn.question_number}/responses should return ${stu.getResponses(qn.question_number)}`, function(done) {
					chai.request(app).get(`/students/${student.id}/question/${qn.question_number}/prompts`).end((err, res) => {
						chai.expect(res).to.have.status(200);
						chai.expect(res.body).to.eql(stu.getPrompts(qn.question_number));
						done();
					});
				});
			});
		});
	});

	describe('GET/students/{student_id}/researchers', () => {
		students["students"].forEach((student) => {
			let stu = new Student(student.id);
			stu.load();
			it(`GET/students/${student.id}/researchers should return ${stu.researchers}`, function(done) {
				chai.request(app).get(`/students/${student.id}/researchers`).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql(stu.researchers);
					done();
				});
			});
		});
	});

	describe('POST/students/account', () => {
		it('POST/students/account should create a student account', function(done) {
			chai.request(app).post('/students/account').send({username: "exampleStudent", password: "examplePassword"}).end((err, res) => {
				chai.expect(res).to.have.status(200);
				chai.request(app).get(`/students/${res.body}`).end((_err, _res) => {
					chai.expect(_res).to.have.status(200);
					chai.expect(_res.body).to.eql({"username": "exampleStudent", "password": "examplePassword"});
					done();
				});
			});
		});
	});

	describe('POST/students/{student_id}/researcher', () => {
		it('POST/students/{student_id}/researcher should add a researcher', function(done) {
			chai.request(app).get('/students/id/exampleStudent').end((err, res) => {
				chai.expect(res).to.have.status(200);
				chai.request(app).post(`/students/${res.body}/researcher`).send({researcher_id: "exampleResearcher"}).end((_err, _res) => {
					chai.expect(_res).to.have.status(200);
					chai.expect(_res.body).to.eql(["exampleResearcher"]);
					done();
				});
			});
		});
	});

	describe('POST/students/{student_id}/question/{question_number}/prompt', () => {
		questionlist.forEach((qn) => {
			it(`POST/students/{student_id}/question/${qn.question_number}/prompt should add a prompt`, function(done) {
				chai.request(app).get('/students/id/exampleStudent').end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.request(app).post(`/students/${res.body}/question/${qn.question_number}/prompt`).send({prompt: "New Prompt"}).end((_err, _res) => {
						chai.expect(_res).to.have.status(200);
						chai.expect(_res.body).to.eql(["New Prompt"]);
						done();
					});
				});
			});
		});
	});

	describe('POST/students/login', () => {
		students["students"].forEach((student) => {
			it('POST/students/login should return a token', function(done) {
				chai.request(app).post('/students/login').send({username:student.username, password:student.password}).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql("fourmantoken");
					done();
				});
			});
		});

		it('POST/students/login should return No Account Found', function(done) {
			chai.request(app).post('/students/login').send({username:"invalidUsername", password:"invalidPassword"}).end((err, res) => {
				chai.expect(res).to.have.status(400);
				chai.expect(res.body).to.eql("No Account Found");
				done();
			});
		});
		students["students"].forEach((student) => {
			it('POST/students/login should return Incorrect Password', function(done) {
				chai.request(app).post('/students/login').send({username:student.username, password:"invalidPassword"}).end((err, res) => {
					chai.expect(res).to.have.status(401);
					chai.expect(res.body).to.eql("Incorrect Password");
					done();
				});
			});
		});
	});

	describe('PUT/students/{student_id}/password', () => {
		it('PUT/students/{student_id}/password should change the password', function(done) {
			chai.request(app).get('/students/id/exampleStudent').end((err, res) => {
				chai.expect(res).to.have.status(200);
				chai.request(app).put(`/students/${res.body}/password`).send({oldpassword:"examplePassword", newpassword:"NewPassword"}).end((_err, _res) => {
					chai.expect(_res).to.have.status(200);
					chai.expect(_res.body).to.eql("NewPassword");
					done();
				});
			});
		});

		it('PUT/students/{student_id}/password with incorrect password should fail', function(done) {
			chai.request(app).get('/students/id/exampleStudent').end((err, res) => {
				chai.expect(res).to.have.status(200);
				chai.request(app).put(`/students/${res.body}/password`).send({oldpassword:"examplePassword", newpassword:"NewPassword"}).end((_err, _res) => {
					chai.expect(_res).to.have.status(401);
					chai.expect(_res.body).to.eql("Incorrect Password");
					done();
				});
			});
		});
	});

	describe('DELETE/students/{student_id}', () => {
		it('DELETE/students/{student_id} should delete the student account once', function(done) {
			chai.request(app).get('/students/id/exampleStudent').end((err, res) => {
				chai.expect(res).to.have.status(200);
				chai.request(app).del(`/students/${res.body}`).end((_err, _res) => {
					chai.expect(_res).to.have.status(200);
					chai.expect(_res.body).to.eql(res.body)
					chai.request(app).del(`/students/${res.body}`).end((__err, __res) => {
						chai.expect(__res).to.have.status(400);
						chai.expect(__res.body).to.eql("No Account Found");
						done();
					});
				});
			});
		});
	});
});
