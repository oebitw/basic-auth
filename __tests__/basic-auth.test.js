'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server.js');
const request = supergoose(app);
const base64 = require('base-64');


let user={
  username: 'ewies',
  password: '123123',
};




describe('API SERVER TEST', () => {
  it('Testing Home page', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(201);
    expect(response.text).toEqual('Basic Auth');
  });
  it('Testing invalid routes', async () => {
    const response = await request.get('/anything');
    expect(response.status).toEqual(404);
  });
  
});


describe('Test Signup', ()=>{
  it('Test signing up', async () => {
    const response = await request.post('/api/v1/signup').send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('ewies');
  });
});


describe('Test Signin', ()=>{
  it('Test signing in and find data for the user', async () => {
    const response = await request
      .post('/api/v1/signin')
      .set(
        'Authorization',
        'basic ' + new Buffer.from(`${user.username}:${user.password}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual(user.username);
  });

  it('Testing Sign in with wrong username', async () => {
    const response = await request
      .post('/api/v1/signin')
      .set(
        'Authorization',
        'basic ' + new Buffer.from(`zzz: ${user.password}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(403);
  });

  it('Test 500 Error: Sign in with wrong password', async () => {
    const response = await request
      .post('/api/v1/signin')
      .set(
        'Authorization',
        'basic ' + new Buffer.from(`${user.username}:${123}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(500);
  });
});

