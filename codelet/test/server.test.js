/*
 unit tests for server.js
*/

const chaiModule = require('chai');
const chaiHttp = require('chai-http');
const chai = chaiModule.use(chaiHttp);
const express = require('express');
const app = require('../server.js');
app.use(express.json());

describe('Questions API', () => {

	describe('GET/questions', () => {
        it(`GET/questions should return the 4 questions in the file currently`, function(done) {
            chai.request(app).get(`/questions`).end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.length).to.eql(4);
                chai.expect(res.body[0]).to.eql({
                    name: "blank",
                    number: 0,
                    flags: 0,
                    code: "for 1 based indexing"
                });
                chai.expect(res.body[1]).to.eql({
                    name: "test1",
                    number: 1,
                    flags: 2,
                    code: "test code, this sucks"
                });
                chai.expect(res.body[2]).to.eql({
                    name: "test2",
                    number: 2,
                    flags: 0,
                    code: "hello :["
                });
                chai.expect(res.body[3]).to.eql({
                    name: "test3",
                    number: 3,
                    flags: 0,
                    code: "function ... \n code"
                });
                done();
            });
        });
	});

    describe('POST/questions/:question_number/flag', () => {
		it(`POST/questions/0/flag should increase the flags of question 0 by 1, from 0 to 1, when request is made once`, function(done) {
            chai.request(app).post(`/questions/0/flag`).end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.request(app).get(`/questions`).end((_err, _res) => {
                    chai.expect(_res).to.have.status(200);
                    chai.expect(_res.body[0].flags).to.eql(1);
                    done();
                });
            });
        });

        it(`POST/questions/1/flag should increase the flags of question 0 by 1, from 2 to 3, when request is made once`, function(done) {
            chai.request(app).post(`/questions/1/flag`).end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.request(app).get(`/questions`).end((_err, _res) => {
                    chai.expect(_res).to.have.status(200);
                    chai.expect(_res.body[1].flags).to.eql(3);
                    done();
                });
            });

        });

        it(`POST/questions/0/flag should increase the flags of question 0 by 2, from 1 to 3, when request is made twice`, function(done) {
            chai.request(app).post(`/questions/0/flag`).end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.request(app).get(`/questions`).end((_err, _res) => {
                    chai.expect(_res).to.have.status(200);
                    chai.expect(_res.body[0].flags).to.eql(2);

                    chai.request(app).post(`/questions/0/flag`).end((__err, __res) => {
                        chai.expect(__res).to.have.status(200);
                        chai.request(app).get(`/questions`).end((___err, ___res) => {
                            chai.expect(___res).to.have.status(200);
                            chai.expect(___res.body[0].flags).to.eql(3);
                            done();
                        });
                    });
                });
            });
        });
	});
});
