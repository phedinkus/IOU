IOU.Views.Debtors = {};

IOU.Views.Debtors.New = Backbone.View.extend({
  id: 'debtor_form',
  template: IOU.Templates.Debtors.New,
  initialize: function(){
    _.bindAll(this, 'render');
  },
  render: function(){
    $(this.el).html(this.template.render());
    return this;
  }
});

IOU.Views.Debtors.List = Backbone.View.extend({
  id: 'debtors_container',
  template: IOU.Templates.Debtors.List,
  initialize: function(){
    _.bindAll(this, 'render');
    this.collection.on('reset', this.render);
    this.collection.on('change', this.render);
    this.collection.view = this;
  },
  render: function(){
    $(this.el).html(this.template.render({debtors: this.collection.models}));
    return this;
  }
});