const axios = require('axios');
const mockData = require('./__mock__/bar');

jest.mock('axios');

describe('Controller of Bars: Checking API request.', () => {
  let response;

  beforeEach(() => {
    response = mockData;
  });

  test('Should return array of bars.', async () => {
      let result;

      axios.get.mockReturnValue(response);
      result = await axios.get('http://localhost:9996/bars');

      expect(result).toEqual(response);
  });

  afterAll(() => {
    response = null
  })
});