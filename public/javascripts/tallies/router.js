IOU.Router.Tallies = Backbone.Router.extend({
  routes: {
    '' : 'index',
  },
  initialize: function(){
    _.bindAll(this, 'index');
    this.collection = new IOU.Collections.Tallies;
    this.collection.fetch();
  },
  
  index: function(){
    var view = new IOU.Views.Tally.List({ collection: this.collection });
    $("#tallies_container").append(this.el);
  }
});