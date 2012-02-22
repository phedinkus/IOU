IOU.Models.Debtor = Backbone.Model.extend({
  initialize: function(){
    _.bindAll(this, 'createTallyCollection', 'totalDebt');
    this.createTallyCollection();
  },
  createTallyCollection: function(){
    this.tallies = new IOU.Collections.Tallies(this.attributes.tallies);
    this.totalDebt()
  },
  totalDebt: function(){
    var total = 0;
    _.each(this.tallies.models, function(t){
      total += t.get("amount");
    });
    // return total;
    this.set("debtAmount", total);
    return this.get("debtAmount");
  }
});

IOU.Collections.Debtors = Backbone.Collection.extend({
  model: IOU.Models.Debtor,
  url: '/api/debtors',
  initialize: function(){
    _.bindAll(this, 'fetchTalliesForDebtor', 'totalDebt');
    this.on("reset", this.fetchTalliesForDebtor);
  },
  fetchTalliesForDebtor: function(){
  },  
  totalDebt: function(){
      var total = 0;
      _.each(this.tallies.models, function(t){
        total += t.get("amount");
      });
      return total;
    }
});