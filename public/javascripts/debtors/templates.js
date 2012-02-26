IOU.Templates.Debtors = {};

IOU.Templates.Debtors.New = Hogan.compile(
  "<form class='well form-search'>" + 
    "<input type='text' class='input-large search-query' id='new_debtor_name' name='name' placeholder='Name...'>" +
    "<button type='submit' class='btn btn-primary save_debtor'>+</button>" +
  "</form>"
)

IOU.Templates.Debtors.List = Hogan.compile(
  "{{#debtors}}" + 
    "{{#attributes}}" +
      "<div class='row-fluid debtor-heading' data-debtor_id='{{id}}'>" + 
        "<div class='debtor span10'>{{name}}</div>"  + 
        "<div class='amount'>{{debtAmount}}</div>" +
      "</div>" +
    "{{/attributes}}" +
  "{{/debtors}}"
);