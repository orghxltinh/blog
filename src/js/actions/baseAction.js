class BaseAction {
  constructor( apiUrl, name ){
    this.name = name
    this.loadingMessage = '';
    this.loadedMessage = '';
    this.getDataMessage = '';
    this.getItemMessage = '';
    this.createItemStartMessage = '';
    this.createItemSuccessMessage = '';
    this.createItemFalureMessage = '';
    this.deleteItemSuccessMesage = '';
    this.deleteItemFalureMessage = '';
    this.updateItemSuccessMesage = '';
    this.updateItemFalureMessage = '';
    this.isAjaxStartMessage= 'AJAX_START';
    this.isAjaxFinishMessage= 'AJAX_FINISH';
    this.apiUrl = apiUrl
  }

  updateItem(obj){

    return (dispatch, getState) => {
        $.ajax({
          url: `${this.apiUrl}/${obj.id}`, method: 'PUT', dataType: 'JSON',
          data: obj,
          success: res => {
            dispatch( this.updateItemSuccess( res ) )
          },
          error: err => {

          }
        })
    }
  }

  updateItemSuccess(res) {
    return {
      type: this.updateItemSuccessMesage,
      updated: res
    }
  }

  createItem(obj, cb){

    return ( dispatch, getState ) => {
      dispatch(this.isAjaxStart());
      dispatch(this.createItemStart());
      $.ajax({
        url: this.apiUrl, method: 'POST', dataType: 'JSON',
        data: obj,
        success: (res) => {
          dispatch(this.isAjaxFinish());
          if(_.isFunction(cb)) {
            cb();
          }
          return dispatch( this.createItemSuccess(res) );
        },
        error: (err) => {
          dispatch(this.isAjaxFinish());
          return dispatch( this.createItemFalure(err) );
        }
      });
    }
  }

  createItemStart(){
    return {
      type: this.createItemStartMessage,
    }
  }

  createItemSuccess(res){
    console.log('create item success: ',res);
    return {
      type: this.createItemSuccessMessage,
      created: res
    }
  }

  createItemFalure(id){
    return {
      type: this.createItemFalureMessage,
      failAt: id
    }
  }

  deleteItem(id){
    return dispatch => {
      return new Promise((resolve, reject) => {
        $.ajax({
          url:`${this.apiUrl}/${id}`,
          method: 'DELETE',
          dataType: 'JSON',
          data: { id },
          success: res => {
            resolve(res);
            return dispatch(this.deleteItemSuccess(res));
          },
          error: err => {
            reject(err);
            return dispatch(this.deleteItemFalure(err));
          }
        });
      });
    }
  }

  deleteItemSuccess(id){
    return {
      type: this.deleteItemSuccessMesage,
      deletedId: id
    }
  }

  deleteItemFalure(id){
    return {
      type: this.deleteItemFalureMessage,
      failAt: id
    }
  }

  showLoading(){
    return {
      type: this.loadingMessage
    }
  }
  hideLoading(){
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
        method: 'GET',
        dataType: 'json',
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
      return dispatch(this.fetchData())
    }
  }

  fetchItemIfNeeded(id){
    return ( dispatch, getState ) => {
      let state = getState()

      let item = state[ this.name ].get('items').toJS().find( (item) => {
        return item.id === parseInt(id)
      })

      return item === undefined ? dispatch( this.fetchSingleItem(id) ) : dispatch( this.receiveData({
        type: this.getItemMessage,
        singleItem: item
      }))
    }
  }

  isAjaxStart() {
    return {
      type: this.isAjaxStartMessage
    }
  }

  isAjaxFinish() {
    return {
      type: this.isAjaxFinishMessage
    }
  }
}

export default BaseAction
