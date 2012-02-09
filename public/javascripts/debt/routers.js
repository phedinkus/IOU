IOU.Routers.Debts = Backbone.Router.extend({
  routes: {
    "debt/new": "newDebt"
  },
  
  newDebt: function(){
    var view = new IOU.Views.Debt.New
    view.render();
  }
});