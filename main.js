document.getElementById('addMusic').addEventListener("click", function() {
  document.getElementById('options').style.visibility = "hidden"
  document.getElementById('songlist').style.visibility = "hidden"
  document.getElementById('musicForm').style.visibility = "visible"
})
document.getElementById('viewMusic').addEventListener("click", viewMusic)
function viewMusic() {
  document.getElementById('options').style.visibility = "visible"
  document.getElementById('songlist').style.visibility = "visible"
  document.getElementById('musicForm').style.visibility = "hidden"
}