var db = new PouchDB('my_db');

function add(txt)
{
  var todo = {
    _id = new Date().toISOstring(),
    title: account
  };
  db.put(todo, function callback(e, r)
  {
    console.log('successfully kekked');
  });
}
