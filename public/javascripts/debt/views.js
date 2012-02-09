IOU.Views.Debt = {};

IOU.Views.Debt.Index = Backbone.View.extend({
  el: "#debts_container",
  initialize: function(){
    _.bindAll(this, 'render', 'addDebt');
    var newForm = new IOU.Views.Debt.New({ collection: this.collection });
    newForm.render();
    this.collection.bind('reset', this.render);
  },
  
  render: function(filteredCollection){
    if(filteredCollection && _.isArray(filteredCollection)) {
      _.each(filteredCollection, this.addDebt)
    } else {
      this.collection.each(this.addDebt)
    }
  },
  
  addDebt: function(debt){
    var view = new IOU.Views.Debt.Show({model: debt});
    $(this.el).append(view.render().el);
  }
});

IOU.Views.Debt.New = Backbone.View.extend({
  tagName: 'form',
  className: 'form-horizontal',
  template: IOU.Templates.Debt.New,
  initialize: function() {
    _.bindAll(this, 'render');
  },
  
  render: function() {
    var content = this.template.render();
    $('#debts_container').append($(this.el).html(content));
    return this;
  }
});

IOU.Views.Debt.Show = Backbone.View.extend({
  tagName: 'li',
  template: IOU.Templates.Debt.Show,
  initialize: function(){
    _.bindAll(this, 'render');
    
  },
  render: function(){
    var debt = this.model;
    var output = this.template.render({
      name: debt.get('name'),
      amount: debt.get('amount')
    });
    $(this.el).html(output);
    return this;
  }
});

