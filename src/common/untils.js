const getPath = (type,header) => {
  let path = "";
  if(type == "Boss"){
    path = "/boss"
  }else{
    path = "/jobhunter"
  }

  if(!header){
    path += "info"
  }
  return path;
}

export {
  getPath
}