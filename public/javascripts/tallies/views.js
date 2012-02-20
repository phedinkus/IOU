IOU.Views.Tally = {};

IOU.AppView = Backbone.View.extend({
  el: "#tallies_container",
  initialize: function(){
    _.bindAll(this, 'render');
    var newForm, tallyList;
    newForm = new IOU.Views.Tally.New({ collection: this.collection });
    newForm.render();
    tallyList = new IOU.Views.Tally.List({ collection: this.collection });
  },
  render: function(){
    // $("#tallies_container").append(this.el);
  }
});

IOU.Views.Tally.List = Backbone.View.extend({
  // className: 'row',
  template: IOU.Templates.Tally.List,
  initialize: function(){
    _.bindAll(this, 'render', 'addTally');
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.render);
  },
  render: function(filteredCollection){
    $(this.el).append(this.template.render());
    if(filteredCollection && _.isArray(filteredCollection)) {
      _.each(filteredCollection, this.addTally);
    } else {
      this.collection.each(this.addTally);
    }
    $("#tallies_container").append(this.el);
    return this;
  },
  addTally: function(tally){
    var view = new IOU.Views.Tally.Show({model: tally});
    $("tbody", this.el).append(view.render().el);
  }
})

IOU.Views.Tally.New = Backbone.View.extend({
  // tagName: "div",
  // className: 'row',
  // tagName: 'form',
  // className: 'form-horizontal',
  template: IOU.Templates.Tally.New,
  initialize: function() {
    _.bindAll(this, 'render', 'saveTally');
    this.collection.bind('add', this.render);
  },
  events: {
    "click .save_tally": "saveTally"
  },
  render: function() {
    var content = this.template.render();
    $('#tallies_container').append($(this.el).html(content));
    return this;
  },
  saveTally: function(event){
    event.preventDefault();
    var data = {name: $("#new_tally_name").val(), amount: $("#new_tally_amount").val()};
    this.collection.create(data, {
      error: function(model, error){
        alert(model);
      },
      success: function(){
        
      }
    })
  }
});

IOU.Views.Tally.Show = Backbone.View.extend({
  tagName: 'tr',
  template: IOU.Templates.Tally.Show,
  initialize: function(){
    _.bindAll(this, 'render');
    
  },
  render: function(){
    var tally = this.model;
    var output = this.template.render({
      name: tally.get('name'),
      amount: tally.get('amount')
    });
    $(this.el).html(output);
    return this;
  }
});

