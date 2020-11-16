import Config from './Config';

class WebService {
  _post_data = async(endpoint, headers, body) => {
    let url = `${Config.apiUrl}${endpoint}`;
    let result;

    await fetch(url, {
       method: 'post',
       headers: headers,
       body: body
     })
     .then(response => response.json())
     .then(res => {
       result = res;
    })
    .catch((exception) => {
      console.log('\n \n exceptionnnnnnn', exception, '\n \n');
    })
    return result;
  }

  _get_data = async(endpoint, headers, data) => {
    let result;
    let url = `${Config.API_URL}${endpoint}`;

    if(data) {
      let parsed_data = JSON.parse(data)
      let query = Object.keys(parsed_data)
                   .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(parsed_data[key]))
                   .join('&');

      url = `${url}?${query}`;
    }

    await fetch(url, {
       method: 'get',
       headers: headers
     })
     .then(response => response.json())
     .then(res => {
       result = res;
    })
    .catch((exception) => {
      console.log("exception occured", exception);
    });
    return result;
  }
}

module.exports = WebService;
