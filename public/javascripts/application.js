window.IOU = {
  Models:       {},
  Collections:  {},
  Views:        {},
  Templates:    {},
  Router:       {},
  init: function(){
    new IOU.Router.Debtors;
    Backbone.history.start();
  }
};

$(function(){
  IOU.init();

})
