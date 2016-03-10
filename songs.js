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
      document.getElementById('songPLacement').innerHTML = ""
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

        document.getElementById('songPLacement').innerHTML += nextSong
      };
      lastNum = i
    }
  }
})()

var dude = new XMLHttpRequest();
dude.addEventListener("load", songsOnLoad);
dude.open("GET", "songs.json");
dude.send();

function songsOnLoad() {
  var song = JSON.parse(this.responseText)
  for (i in song.songs) {
    songList.addSongs(song.songs[i]);
  }
  songList.insertSongs()
}

document.getElementById('addStuff').addEventListener("click", function() {
  var newObject = {}
  newObject.title = document.getElementById("songName").value
  newObject.artist = document.getElementById("artistName").value
  newObject.album = document.getElementById("albumName").value
  songList.addSongs(newObject)
  viewMusic()
  songList.insertSongs()
  document.getElementById("songName").value = ""
  document.getElementById("artistName").value = ""
  document.getElementById("albumName").value = ""
})

document.getElementById('songPLacement').addEventListener("click", function(e) {
  console.log("e", e.target.id.substring(6,e.target.id.length));
  if (e.target.id.substring(0,6) === "delete") {
    songList.deleteSongs(e.target.id.substring(6,e.target.id.length))
    songList.insertSongs()
  }
})