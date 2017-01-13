const server = require('../server');
const supertest = require('supertest');
const chai = require('chai');
chai.should();

const agent = supertest.agent(server);

describe('sanity', () => {

  it('should be true', () => {
    true.should.equal(true);
  });
});