$('#musicForm').hide()
$('#addMusic').click(function() {
  $('#options').hide()
  $('#songlist').hide()
  $('#musicForm').show()
})
$('#viewMusic').click(viewMusic)
function viewMusic() {
  $('#options').show()
  $('#songlist').show()
  $('#musicForm').hide()
}
$('#more').click(function() {
   songList.insertSongs()
})