IOU.Templates.Debt = {};

IOU.Templates.Debt.New = Hogan.compile(
  "<fieldset>" + 
    "<div class='control-group'>" + 
      "<label class='control-label'>Who</label>" + 
        "<div class='controls'>" + 
          "<input type='text' class='input-large' id='new_debt_name' name='debt[person]'>" +
          "</div>" +
      "<label class='control-label'>Amount</label>" +
      "<div class='controls'>" + 
        "<input type='text' class='input-large' id='new_debt_amount' name='debt[amount]'>" +
      "</div>" +
      
      "<button type='submit' class='btn'>Save</button>" +
    "</div>" +
  "</fieldset>"


);

IOU.Templates.Debt.Show = Hogan.compile(
  "<div>{{name}}: {{amount}}</div>"
);