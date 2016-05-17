"use strict";
$('#musicForm').hide();
$('#addMusic').click(function() {
  $('#options').hide();
  $('#songlist').hide();
  $('#musicForm').show();
  type = "POST";
});
$('#viewMusic').click(viewMusic);
function viewMusic() {
  $('#options').show();
  $('#songlist').show();
  $('#musicForm').hide();
}