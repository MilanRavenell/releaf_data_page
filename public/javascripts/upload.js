
$('.upload-btn').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

var X = 'X';
var Y = 'Y';
var type;

$('#parameters').on('submit', function(e){
  e.preventDefault();
  X = $('#parameter1').val();
  Y = $('#parameter2').val();
  type = $('#analysis-type').val();
  $('#checkmark').show();
});


$('#upload-input').on('change', function(){
//$('#parameters').on('submit', function(e){
//$("form").submit(function(e){

  //e.preventDefault();

  var files = $(this).get(0).files;

  var data = $("#parameters :input").serializeArray();
  console.log(data);

  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }

    console.log(data);

    formData.append('x', X);
    formData.append('y', Y);
    formData.append('type', type);

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!\n' + data);
      }
    });

  }
});