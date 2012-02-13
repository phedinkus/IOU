IOU.Views.Debt = {};

IOU.AppView = Backbone.View.extend({
  el: "#debts_container",
  initialize: function(){
    _.bindAll(this, 'render');
    var newForm, debtList;
    newForm = new IOU.Views.Debt.New({ collection: this.collection });
    newForm.render();
    debtList = new IOU.Views.Debt.List({ collection: this.collection });
  },
  render: function(){
    // $("#debts_container").append(this.el);
  }
});

IOU.Views.Debt.List = Backbone.View.extend({
  // className: 'row',
  template: IOU.Templates.Debt.List,
  initialize: function(){
    _.bindAll(this, 'render', 'addDebt');
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.render);
  },
  render: function(filteredCollection){
    $(this.el).append(this.template.render());
    if(filteredCollection && _.isArray(filteredCollection)) {
      _.each(filteredCollection, this.addDebt);
    } else {
      this.collection.each(this.addDebt);
    }
    $("#debts_container").append(this.el);
    return this;
  },
  addDebt: function(debt){
    var view = new IOU.Views.Debt.Show({model: debt});
    $("tbody", this.el).append(view.render().el);
  }
})

IOU.Views.Debt.New = Backbone.View.extend({
  // tagName: "div",
  // className: 'row',
  // tagName: 'form',
  // className: 'form-horizontal',
  template: IOU.Templates.Debt.New,
  initialize: function() {
    _.bindAll(this, 'render', 'saveDebt');
    this.collection.bind('add', this.render);
  },
  events: {
    "click .save_debt": "saveDebt"
  },
  render: function() {
    var content = this.template.render();
    $('#debts_container').append($(this.el).html(content));
    return this;
  },
  saveDebt: function(event){
    event.preventDefault();
    var data = $.deparam( $('form', this.el).serialize() );
    this.collection.create(data, {
      error: function(model, error){
        alert(model);
      },
      success: function(){
        
      }
    })
  }
});

IOU.Views.Debt.Show = Backbone.View.extend({
  tagName: 'tr',
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

