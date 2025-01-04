const sinon = require('sinon');
const { expect } = require('chai');
const db = require('../../config/db');  // Adjust to your actual db file
const authModel = require('../../models/authModel');  // Adjust to your actual model file



describe('AuthModel - insertPrestataire', () => {
  let queryStub;

  beforeEach(() => {
    // Stub the query method
    queryStub = sinon.stub(db, 'query');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should insert a new user and return success', async () => {
    // Mock the query to simulate a successful insert
    queryStub.resolves({ affectedRows: 1 });

    const result = await authModel.insertPrestataire('test@example.com', 'password');
    expect(result).to.equal('Prestataire registered successfully');
  });

  it('should fail to insert if the user already exists', async () => {
    // Mock the query to simulate an existing user
    queryStub.resolves({ affectedRows: 0 });

    const result = await authModel.insertPrestataire('test@example.com', 'password');
    expect(result).to.equal('Error inserting user');
  });
});
