import request from './request';

function login(context){
  return request({
    method: "POST",
    url: "/api/login",
    data: context
  });
}

export {
  login
}