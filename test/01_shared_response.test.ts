const axios = require('axios');
const mockData = require('./__mock__/bar');
import { ResponseEntity } from '../src/modules/shared/model/responce';

jest.mock('axios');

describe('Shared module: Checking response entity.', () => {
  let response;
  let reject;

  beforeAll(() => {
    response = mockData.response;
    reject = mockData.reject;
  });

  beforeEach(() => {
    axios.mockClear();
  });

  test('Should return resonse "Response Entity Model" with Array of Bars.', async () => {
      let data, result: ResponseEntity<any>;

      axios.get.mockReturnValue(response);
      data = await axios.get('http://localhost:9996/bars');
      result = new ResponseEntity({data});

      expect(result).toHaveProperty('success');
      expect(result.success).toBe(true);
      expect(result).toHaveProperty('errors');
      expect(result.errors).toBeNull();
      expect(result).toHaveProperty('data');
      expect(result.data).toEqual(response);
  });

  test('Should return reject "Response Entity Model".', async () => {
    try {
      axios.get.mockRejectedValue(reject);
      await axios.get('http://localhost:9996/bars');
    } catch (err) {
      let result: ResponseEntity<any>;
      result = new ResponseEntity({errors: err});

      expect(result).toHaveProperty('success');
      expect(result.success).toBeFalsy();
      expect(result.errors).toHaveProperty('errors');
      expect(result.errors).toBe(reject);
      expect(result.data).toBeNull();
    }
  });

  afterAll(() => {
    response = null;
    reject = null;
  })
});