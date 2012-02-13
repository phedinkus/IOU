window.IOU = {
  Models:     {},
  Views:      {},
  Templates:  {},
  Routers:    {}
};

$(function(){
  window.debts = new IOU.Models.Debts;
  new IOU.AppView({collection: debts});
  
  debts.fetch();
})
