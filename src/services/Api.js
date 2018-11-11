const baseUrl = 'https://swapi.co/api';

class Api {
  static async getRequest(urlParam, withBaseUrl = true) {
    try {
      const url = (withBaseUrl === true) ?
        baseUrl + urlParam :
        urlParam;
      
      const response = await fetch(url);

      if (response.ok === true) {
        return await response.json();
      } else {
        console.error(
          response.url +
          ' ' + response.status +
          ': ' + response.statusText
        );
        return;
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}

export default Api;
