class BaseAction {
  constructor( apiUrl, name ){
    this.name = name;
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
    this.apiUrl = apiUrl;
  }

  updateItem(obj){
    return dispatch => {
      $.ajax({
        url: `${this.apiUrl}/${obj.id}`, method: 'PUT', dataType: 'JSON',
        data: obj,
        success: res => {
          dispatch(this.updateItemSuccess(res));
        },
        error: err => {

        }
      });
    };
  }

  updateItemSuccess(res) {
    return {
      type: this.updateItemSuccessMesage,
      updated: res
    };
  }

  createItem(obj, cb){
    return dispatch => {
      dispatch(this.sendOneMessage(this.isAjaxStartMessage));
      dispatch(this.sendOneMessage(this.createItemStartMessage));
      $.ajax({
        url: this.apiUrl, method: 'POST', dataType: 'JSON',
        data: obj,
        success: (res) => {
          dispatch(this.sendOneMessage(this.isAjaxFinishMessage));
          if(_.isFunction(cb)) {
            cb();
          }
          return dispatch(this.sendOneMessageWithObject(this.createItemSuccessMessage, res));
        },
        error: (err) => {
          dispatch(this.sendOneMessage(this.isAjaxFinishMessage));
          return dispatch(this.sendOneMessageWithObject(this.createItemFalureMessage, err));
        }
      });
    };
  }


  deleteItem(id){
    return dispatch => {
      return new Promise((resolve, reject) => {
        $.ajax({
          url:`${this.apiUrl}/${id}`,
          method: 'DELETE', dataType: 'JSON',
          data: { id },
          success: res => {
            resolve(res);
            return dispatch(this.sendOneMessageWithObject(this.deleteItemSuccessMesage, res));
          },
          error: err => {
            reject(err);
            return dispatch(this.sendOneMessageWithObject(this.deleteItemFalureMessage, err));
          }
        });
      });
    };
  }

  deleteItemSuccess(id){
    return {
      type: this.deleteItemSuccessMesage,
      deletedId: id
    };
  }

  deleteItemFalure(id){
    return {
      type: this.deleteItemFalureMessage,
      failAt: id
    };
  }

  showLoading(){
    return {
      type: this.loadingMessage
    };
  }
  hideLoading(){
    return {
      type: this.loadedMessage
    };
  }
  getAuth(){
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization : localStorage.getItem( hxltinh.appConfig.AUTHENTICATION_KEY ) || null
    };
  }
  fetch(url){
    return new Promise( ( resolve, reject) => {
      $.ajax({
        url,
        method: 'GET',
        dataType: 'json',
        success: function(){
          resolve.apply(this,arguments);
        },
        error: function(err){
          reject(err);
        }
      });
    });
  }

  fetchAllData() {
    return dispatch => {
      dispatch(this.sendOneMessage(this.loadingMessage));
      return new Promise((resolve, reject) => {
        $.ajax({
          url: this.apiUrl,
          method: 'GET',
          dataType: 'json',
          success: (res) => {
            resolve(res);
            dispatch(this.sendOneMessage(this.loadedMessage));
            return dispatch(this.sendOneMessageWithObject(this.getDataMessage, res));
          },
          error: function(err){
            reject(err);
            dispatch(this.sendOneMessage(this.loadedMessage));
          }
        });
      });
    };
  }

  fetchSingleItem(id) {
    return dispatch => {
      dispatch(this.sendOneMessage(this.loadingMessage));
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `${this.apiUrl}/${id}`,
          method: 'GET', dataType: 'json',
          success: (res) => {
            resolve(res);
            dispatch(this.sendOneMessage(this.loadedMessage));
            return dispatch(this.sendOneMessageWithObject(this.getItemMessage, res));
          },
          error: function(err){
            reject(err);
            dispatch(this.sendOneMessage(this.loadedMessage));
          }
        });
      });
    };
  }

  receiveData(json){
    return json;
  }

  fetchDataIfNeeded(){
    return dispatch => {
      return dispatch(this.fetchAllData());
    };
  }

  fetchItemIfNeeded(id){
    return ( dispatch, getState ) => {
      let state = getState();

      let item = state[ this.name ].get('items').toJS().find( (item) => {
        return item.id === parseInt(id);
      });
      return item === undefined ? dispatch( this.fetchSingleItem(id) ) :
        dispatch( this.sendOneMessageWithObject(this.getItemMessage, item));
    };
  }

  sendOneMessage(type) {
    return { type };
  }

  sendOneMessageWithObject(type, data) {
    return { type, data };
  }

}

export default BaseAction;
