import { authHttpRequestBase } from '../http-common';
import { type User } from '../../../backend/models/userModel';

class AuthHttpRequest {
  signup(data: User) {
    return authHttpRequestBase.post('/signup', data);
  }

  login(data: User) {
    return authHttpRequestBase.post(`/login`, data);
  }
}

const service = new AuthHttpRequest();
export default service;
