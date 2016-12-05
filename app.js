var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var command = 'python linear_regress.py ';
var filename;
var x_param;
var y_param;
var type;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// app.get('/api/v1/search/', function(req, res){
//   res.sendFile(path.join(__dirname, 'views/index.html'));
// });

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    filename = file.name;
    regression(filename, type, x_param, y_param);
  });

  form.on('field', function(name, value) {
    if (name == 'x') {
      x_param = value;
      console.log("x: " + x_param);
    }
    else if (name == 'y') {
      y_param = value;
      console.log("y: " + y_param);
    }
    else if (name == 'type') {
      if (value == 'regression') {
        type = 'linear_regress.py';
      }
      else {
        type = 'cluster.py'
      }
      console.log("type: " + type);
    }
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

 
});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});

function regression(file,type,x,y) {
  console.log('hello');
  var command = 'python' + ' ' + type + ' ' + file + ' ' + x + ' ' + y;
  const exec = require('child_process').exec;
  exec(command, (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    console.log('stdout ', stdout);
    console.log('stderr ', stderr);
  });
  window.location.reload();
}