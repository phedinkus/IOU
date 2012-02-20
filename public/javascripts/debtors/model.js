IOU.Models.Debtor = Backbone.Model.extend({
  initialize: function(){
    _.bindAll(this, 'getTallies');
  },
  getTallies: function(){
    this.tallies = new IOU.Collections.Tallies();
    this.tallies.fetch({ data: {debtor_id: this.get("id")}, processData:true });
  }
});

IOU.Collections.Debtors = Backbone.Collection.extend({
  model: IOU.Models.Debtor,
  url: '/api/debtors',
  initialize: function(){
    _.bindAll(this, 'fetchTalliesForModels');
    this.bind("reset", this.fetchTalliesForModels);
  },
  fetchTalliesForModels: function(){
    _.each(this.models, function(model){ model.getTallies() });
  }
});