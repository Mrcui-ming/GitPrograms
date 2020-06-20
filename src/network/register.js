import request from './request';

function register(context){
  return request({
    method: "POST",
    url: "/api/register",
    data: context
  });
}

export {
  register
}