var r_des = Math.floor(Math.random() * 10) % 3;
results = [];

caching();

function drawPlot()
{
  var canv = document.getElementById("canv");
  var con = canv.getContext('2d');

  con.clearRect(0, 0, canv.width, canv.height);

  width = canv.width;
  height = canv.height;
  delta = canv.width / (results.length);
  offset_x = 15;
  offset_y = 10;
  Mapping = {'y' : 1/10};

  var gradient = con.createLinearGradient(0, 0, 0, height/2);
  gradient.addColorStop("0"," magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");

  drawLine(0, height - 100/Mapping['y'] - offset_y,
       width, height - 100/Mapping['y'] - offset_y,
       gradient, true);

  //90
  y90 = height - 90/Mapping['y'] - offset_y;
  drawLine(0, y90,
       width, y90,
       gradient, true);
  con.font = '20px Verdana';
  con.textAlign = 'center';
  con.fillStyle = gradient;
  con.fillText('90', width - 18, y90 - 3);
  //90

  drawLine(0, height - offset_y,
       width, height - offset_y,
       gradient, true);

  //average
  var average_score = 0;
  for (var i = 0; i < results.length; i++)
    average_score += results[i];
  average_score /= results.length;

  var y = height - average_score/Mapping['y'] - offset_y
  drawLine(0, y,
       width, y,
       gradient, true);

  con.font = '20px Verdana';
  con.textAlign = 'center';
  con.fillStyle = gradient;
  con.fillText(Math.round(average_score), width - 50 + 25 - 12 - 6 - 4, y - 5);
  //average-end

  for (var i = 0; i < results.length; i++)
  {
    if (results[i] != 100 && results[i] != 0)
    {
      var y = height - (results[i]) / Mapping['y'] - offset_y;

      drawLine(0, y,
          width, y,
          'gray', true);
    }
  }

  console.log('delta' + delta);

  for (var i = 1; i < results.length; i++)
  {
    var j = i - 1;
    drawLine(offset_x + delta * (i - 1), height - (results[i - 1]) / Mapping['y'] - offset_y,
             offset_x + delta * i, height - (results[i]) / Mapping['y'] - offset_y,
             'black', false, '1.5');
  }

  con.font = '20px Verdana';
  con.textAlign = 'center';
  con.fillStyle = gradient;
  var font_width = 20;
  var font_height = 20;

  for (var i = 0; i < results.length; i++)
  {
    var x = delta * i + offset_x;
    var y = height - (results[i]) / Mapping['y'] - offset_y;

    con.beginPath();
    con.fillRect(x - 4, y - 4, 8, 8);
    con.stroke();

    con.fillText(results[i], x, y - font_height/2);
  }
}
drawPlot();



user_name = '-1';
current_sub = '-1';
function prechoose(sub)
{
  user_name = getUserName();
  const ref = firebase.database().ref().child('u').child(user_name).child(sub);
  ref.on('value', function(snap)
      {
        vals = snap.val() + "";
        results = superparse(vals);
        drawPlot();

        if (sub == 'i')
          res_i = superparse(vals);
        if (sub == 'm')
          res_m = superparse(vals);
        if (sub == 'r')
          res_r = superparse(vals);
        if (sub == 'c')
          res_c = superparse(vals);
        if (sub == 'b')
          res_b = superparse(vals);
      });
}


function choose(sub)
{
  current_sub = sub;
  if (sub == 'i')
  {
    results = res_i;
  }
  if (sub == 'm')
  {
    results = res_m;
  }
  if (sub == 'r')
  {
    results = res_r;
  }
  if (sub == 'c')
  {
    results = res_c;
  }
  if (sub == 'b')
  {
    results = res_b;
  }
  prechoose(sub)
}


function add()
{
  const ref = firebase.database().ref().child('u').child(user_name).child(current_sub);
  results.push(getNewMark());
  ref.set(results.join(','))
}
