import axios from 'axios';

function request(context) {

  const instance = axios.create({
    timeout: 5000
  });

  return instance(context);
}

export default request;