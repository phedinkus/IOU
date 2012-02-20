IOU.Router.Debtors = Backbone.Router.extend({
  routes: {
    '' : 'index',
  },
  initialize: function(){
    _.bindAll(this, 'index');
    window.debtors = new IOU.Collections.Debtors;
    debtors.fetch();
    window.tallies = new IOU.Collections.Tallies;
    tallies.fetch();
  },
  index: function(){
    var debtor_view = new IOU.Views.Debtors.List({collection: debtors});
    $('#content').html(debtor_view.render().el); 
  }
});