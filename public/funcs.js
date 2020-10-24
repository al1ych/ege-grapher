var canv = document.getElementById("canv");
var con = canv.getContext('2d');

function drawLine(x1, y1, x2, y2, style, dashed, line_width = '1')
{
  con.beginPath();
  con.strokeStyle = style;
  con.lineWidth = line_width;
  console.log('drawline', x1, y1);
  if (dashed === true)
    con.setLineDash([8, 2]);
  else
    con.setLineDash([]);
  con.moveTo(x1, y1);
  con.lineTo(x2, y2);
  con.stroke();
}




function getUserName()
{
  return document.getElementById("input_name").value.toLowerCase();
}

function getNewMark()
{
  return parseInt(document.getElementById("input_add").value);
}


function superparse(s)
{
  kek = s.split(',');
  for (var i = 0; i < kek.length; i++)
    kek[i] = parseInt(kek[i]);
  return kek;
}
