/*
 unit tests for src/controllers/Question.controller.js
*/

const chaiModule = require('chai');
const chaiHttp = require('chai-http');
const chai = chaiModule.use(chaiHttp);
const express = require('express');
const app = express();
const fs = require('fs');
const question_controller = require('../../src/controllers/Question.controller.js');
app.use(express.json());
app.use('/questions', question_controller);
const question_list = JSON.parse(fs.readFileSync('data/questions.json'))["questionList"];

describe('Question API', () => {
	describe('GET/questions', () => {
		const question_numbers = question_list.map((question) => question.question_number);
		it(`GET/questions should return ${question_numbers}`, function(done) {
			chai.request(app).get('/questions').end((err, res) => {
				chai.expect(res).to.have.status(200);
				chai.expect(res.body).to.eql(question_numbers);
				done();
			});
		});
	});

	describe('GET/questions/topics', (req, res) => {
		const question_topics = question_list.map((question) => question.topic).filter((topic, index, arr) => arr.indexOf(topic) == index);
		it(`GET/questions/topics should return ${question_topics}`, function(done) {
			chai.request(app).get('/questions/topics').end((err, res) => {
				chai.expect(res).to.have.status(200);
				chai.expect(res.body).to.eql(question_topics);
				done();
			});
		});
	});

	describe('GET/questions/{topic}', (req, res) => {
		const question_topics = question_list.map((question) => question.topic).filter((topic, index, arr) => arr.indexOf(topic) == index);
		question_topics.forEach((topic) => {
			const question_numbers = question_list.filter((question) => question.topic == topic).map((question) => question.question_number);
			it(`GET/questions/${topic} should return ${question_numbers}`, function(done) {
				chai.request(app).get(`/questions/${topic}`).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql(question_numbers);
					done();
				});
			});
		});
	});

	describe('GET/questions/{question_number}/code', (req, res) => {
		const question_numbers = question_list.map((question) => question.question_number);
		question_numbers.forEach((number) => {
			const q_code = question_list.find((question) => question.question_number == number)["code"];
			it(`GET/questions/${number}/code should return ${q_code}`, function(done) {
				chai.request(app).get(`/questions/${number}/code`).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql(q_code);
					done();
				});
			});
		});
	});

	describe('GET/questions/{question_number}/title', (req, res) => {
		const question_numbers = question_list.map((question) => question.question_number);
		question_numbers.forEach((number) => {
			const title = question_list.find((question) => question.question_number == number).title;
			it(`GET/questions/${number}/title should return ${title}`, function(done) {
				chai.request(app).get(`/questions/${number}/title`).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql(title);
					done();
				});
			});
		});
	});

	describe('GET/questions/{question_number}/topic', (req, res) => {
		const question_numbers = question_list.map((question) => question.question_number);
		question_numbers.forEach((number) => {
			const topic = question_list.find((question) => question.question_number == number).topic;
			it(`GET/questions/${number}/topic should return ${topic}`, function(done) {
				chai.request(app).get(`/questions/${number}/topic`).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql(topic);
					done();
				});
			});
		});
	});

	describe('GET/questions/{question_number}/flags', (req, res) => {
		const question_numbers = question_list.map((question) => question.question_number);
		question_numbers.forEach((number) => {
			const flag_count = question_list.find((question) => question.question_number == number).flags;
			it(`GET/questions/${number}/flags should return ${flag_count}`, function(done) {
				chai.request(app).get(`/questions/${number}/flags`).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql(flag_count);
					done();
				});
			});
		});
	});

	describe('PUT/questions/{number}/flag', (req, res) => {
		const question_numbers = question_list.map((question) => question.question_number);
		question_numbers.forEach((number) => {
			const flag_count = question_list.find((question) => question.question_number == number).flags;
			it(`PUT/questions/${number}/flags should return ${flag_count + 1}`, function(done) {
				chai.request(app).put(`/questions/${number}/flag`).end((err, res) => {
					chai.expect(res).to.have.status(200);
					chai.expect(res.body).to.eql(flag_count + 1);
					done();
				});
			});
		});
	});
});
