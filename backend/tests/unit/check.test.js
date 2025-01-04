const sinon = require('sinon');
const { expect } = require('chai');
const db = require('../../config/db');  // Adjust to your actual db file
const authModel = require('../../models/authModel');  // Adjust to your actual model file

describe('AuthModel - checkUserExists', () => {
  let queryStub;
  

  beforeEach(() => {
    // Stub the query method to avoid actual DB calls
    queryStub = sinon.stub(db, 'query');
  });

  afterEach(() => {
    // Restore the stub after each test
    sinon.restore();
  });

  it('should return true if the user exists', async () => {
    // Mock the query result as if the user exists
    queryStub.resolves([{ id: 1, email: 'test@example.com' }]);

    const result = await authModel.checkUserExists('test@example.com');
    expect(result).to.be.true;
  });

  it('should return false if the user does not exist', async () => {
    // Mock the query result as if no user exists
    queryStub.resolves([]);

    const result = await authModel.checkUserExists('test@example.com');
    expect(result).to.be.false;
  });
});
