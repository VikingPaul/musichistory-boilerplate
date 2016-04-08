var songList = (function() {
  var funkySongs = []
  var funkySongs2 = []
  var lastNum = 0
  return {
    getSongs: function(num) {
      return funkySongs[num]
    },
    addSongs: function(newSong) {
      funkySongs.push(newSong)
      i = 0
      lastNum = 0
    },
    deleteSongs: function(num) {
      funkySongs.splice(num,1)
      i = 0
      lastNum = 0
    },
    insertSongs: function() {
      $('#songPLacement').html("")
      for (var i = lastNum, j = 0; j < 4; i++, j++) {
        if (funkySongs.length === i) {
          i = 0;
          lastNum = 0;
          break;
        }
        var currentSong = songList.getSongs(i)
        var nextSong = ""
        nextSong += `<h1>${currentSong.title}</h1>`
        nextSong += `<ul><li>${currentSong.artist}</li>`
        nextSong += `<li>${currentSong.album}</li></ul><button id="delete${i}">delete</button>`

        $('#songPLacement').append(nextSong)
      };
      lastNum = i
    }
  }
})()

$.ajax({
  url: "songs.json",
  success: songsOnLoad
})

function songsOnLoad(song) {
  for (i in song.songs) {
    songList.addSongs(song.songs[i]);
  }
  songList.insertSongs()
}

$('#addStuff').click(function() {
  var newObject = {}
  newObject.title = $("#songName").val()
  newObject.artist = $("artistName").val()
  newObject.album = $("albumName").val()
  songList.addSongs(newObject)
  viewMusic()
  songList.insertSongs()
  $("#songName").val("")
  $("#artistName").val("")
  $("#albumName").val("")
})

$('#songPLacement').click(function(e) {
  if (e.target.id.substring(0,6) === "delete") {
    songList.deleteSongs(e.target.id.substring(6,e.target.id.length))
    songList.insertSongs()
  }
})