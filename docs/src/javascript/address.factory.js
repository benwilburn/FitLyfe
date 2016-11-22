app.factory('AddressFactory', [ function(){
  let apiRootAddress = '';
  if(window.location.href === "http://localhost:8080/#/"){
    apiRootAddress = "http://127.0.0.1:8000/"
  } else {
    apiRootAddress = "http://45.55.253.64:8000/"
  }

  return {
    getApiRootAddress () {
      return apiRootAddress
    }
  }
}])
