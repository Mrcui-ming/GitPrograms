import request from './request';

function perfect(context){
  return request({
    method: "POST",
    url: "/api/perfect",
    data: context
  });
}

export {
  perfect
}