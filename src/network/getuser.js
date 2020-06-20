import request from './request';

const getUser = () => {
  return request({
    method:"GET",
    url: "/api/user"
  })
}

export {
  getUser
}