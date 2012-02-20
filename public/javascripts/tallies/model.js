IOU.Models.Tally = Backbone.Model.extend({
});

IOU.Collections.Tallies = Backbone.Collection.extend({
  model: IOU.Models.Tally,
  url: "/api/tallies"
});