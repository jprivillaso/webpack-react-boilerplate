import $ from 'jquery';

const BASE_REST_API = 'http://localhost:3000';

export default class RestApi {

  DEFAULT_REST_PARAMS = {
    dataType: 'json'
  };

  DEFAULT_HEADERS = {
    'Autorization': `Bearer ${this.getToken()}`
  };

  get(url, params) {
    
    const requestParams = Object.assign({}, params, {
      url: `${BASE_REST_API}/${url}`,
      type: 'GET',
      crossDomain: true
    });

    return $.ajax(requestParams);

  }

  post(url, params, postData) {
    
    const requestParams = Object.assign({}, params, {
      url: `${BASE_REST_API}/${url}`,
      type: 'POST',
      body: JSON.stringify(postData),
      crossDomain: true
    });

    return $.ajax(requestParams);

  }

}
