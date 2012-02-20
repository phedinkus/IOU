window.IOU = {
  Models:       {},
  Collections:  {},
  Views:        {},
  Templates:    {},
  Router:       {},
  init: function(){
    new IOU.Router.Debtors;
    // new IOU.Router.Tallies;
    Backbone.history.start();
  }
};

$(function(){
  IOU.init();

})
