IOU.Templates.Debtors = {};
IOU.Templates.Debtors.List = Hogan.compile(
  "{{#debtors}}" + 
    "{{#attributes}}" +
      "<div class='debtor row-fluid' data-debtor_id='{{id}}'>" + 
        "<span><h4>{{name}}</h4></span>"  + 
        "<span><h4>{{debtAmount}}</h4></span>" +
      "</div>" +
    "{{/attributes}}" +
  "{{/debtors}}"
);