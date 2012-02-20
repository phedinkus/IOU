IOU.Views.Debtors = {};

IOU.Views.Debtors.List = Backbone.View.extend({
  id: 'debtors_container',
  template: IOU.Templates.Debtors.List,
  initialize: function(){
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },
  render: function(){
    $(this.el).html(this.template.render({debtors: this.collection.models}));
    return this;
  }
})