IOU.Router.Debtors = Backbone.Router.extend({
  routes: {
    '' : 'index',
  },
  initialize: function(){
    _.bindAll(this, 'index');
    window.debtors = new IOU.Collections.Debtors;
    debtors.fetch();
  },
  index: function(){
    var debtor_view = new IOU.Views.Debtors.List({collection: debtors});
    var debtor_form = new IOU.Views.Debtors.New();
    $('#content').append(debtor_form.render().el);
    $('#content').append(debtor_view.render().el); 
  }
});