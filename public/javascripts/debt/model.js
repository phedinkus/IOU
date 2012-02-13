IOU.Models.Debt = Backbone.Model.extend({
});

IOU.Models.Debts = Backbone.Collection.extend({
  model: IOU.Models.Debt,
  url: "/debts"
});