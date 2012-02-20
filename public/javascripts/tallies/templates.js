IOU.Templates.Tally = {};

IOU.Templates.Tally.New = Hogan.compile(
  // "<div class='span6 offset3'>" + 
    "<form class='well form-search'>" + 
      "<input type='text' class='input-large' id='new_tally_name' name='name' placeholder='Name...'>" +
      "<input type='text' class='input-small' id='new_tally_amount' name='amount' placeholder='$$$...'>" +
      "<button type='submit' class='btn btn-success save_tally'>+</button>" +
    "</form>"// +
  // "</div>"

);

IOU.Templates.Tally.List = Hogan.compile(
  // "<div class='span9'>" + 
    "<table class='table table-condensed'>" + 
      "<thead>" +
        "<tr>" + 
          "<th>Who</th>" + 
          "<th>How Much</th>" + 
        "</tr>" + 
      "</thead>" +
      "<tbody></tbody>" +
    "</table>"// +
  // "</div>"
);

IOU.Templates.Tally.Show = Hogan.compile(
  "<td><a href='#'>{{name}}</a></td>" + 
  "<td>{{amount}}</td>"
);