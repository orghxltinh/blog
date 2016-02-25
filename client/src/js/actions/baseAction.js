class BaseAction {
  constructor(apiUrl){
    this.loadingMessage = ""
    this.loadedMessage = ""
    this.getDataMessage = ""
    this.getItemMessage = ""
    this.apiUrl = apiUrl
  }
  showLoading(){
    console.log("show loading ");
    return {
      type: this.loadingMessage
    }
  }
  hideLoading(){
    console.log("hide loading");
    return {
      type: this.loadedMessage
    }
  }
  getAuth(){
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization : localStorage.getItem( appConfig.AUTHENTICATION_KEY ) || null
    }
  }
  fetch(url){
    return new Promise( ( resolve, reject) => {
      $.ajax({
        url,
        method: "GET",
        dataType: "json",
        success: function(){
          resolve.apply(this,arguments)
        },
        error: function(err){
          reject(err)
        }
      })
    })
  }
  fetchData(){
    
    return dispatch => {
      dispatch(this.showLoading())
      return fetch(this.apiUrl, { headers: this.getAuth() })
        .then(response => response.json() )
        .then( json => {
          dispatch(this.hideLoading())
          return dispatch(this.receiveData({
              type: this.getDataMessage,
              items: json
          }))
        })
    }
  }

  fetchSingleItem(id){
    return dispatch => {
      dispatch(this.showLoading())
      return fetch( `${this.apiUrl}/${id}`, { headers: this.getAuth() } )
        .then(response => response.json() )
        .then( json => {
          dispatch(this.hideLoading())
          return dispatch(this.receiveData({
            type: this.getItemMessage,
            singleItem: json
          }))
        })
    }
  }

  receiveData(json){
    return json
  }

  fetchDataIfNeeded(){
    return ( dispatch, getState) => {
      return dispatch(this.fetchData());
    }
  }

  fetchItemIfNeeded(id){
    return ( dispatch, getState ) => {
      let state = getState()

      let item = state.blog.items.find( (item) => {
        return item.id === parseInt(id)
      })

      if(item === undefined){
        dispatch(this.fetchSingleItem(id))
      }

      return item === undefined ? dispatch( this.fetchSingleItem(id) ) : dispatch( this.receiveData({
        type: this.getItemMessage,
        singleItem: item
      }))

    }
  }

}

export default BaseAction
