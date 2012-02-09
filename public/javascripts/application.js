window.IOU = {
  Models:     {},
  Views:      {},
  Templates:  {},
  Routers:    {}
};

$(function(){
  window.debts = new IOU.Models.Debts;
  new IOU.Views.Debt.Index({collection: debts});
  
  debts.fetch();
})
