"use strict";
var newSongs = 0
var songList = (function() {
  var i;
  var funkySongs = [];
  var funkyKeys = []
  var lastNum = 0;
  return {
    getKeys: function() {
      return funkyKeys
    },
    getSongs: function(num) {
      return funkySongs[num];
    },
    addSongs: function(newSong, songKey) {
      funkySongs.push(newSong);
      funkyKeys.push(songKey)
      i = 0;
      lastNum = 0;
    },
    deleteSongs: function(num) {

      $.ajax({
        url: `https://resplendent-torch-2777.firebaseio.com/songs/${funkyKeys[num]}.json`,
        type: "DELETE"
      }).done(function(){
        funkySongs.splice(num,1);
        funkyKeys.splice(num,1);
        i = 0;
        lastNum = 0;
      });
    },
    insertSongs: function() {
      $('#songPLacement').html("");
      for (var i = lastNum, j = 0; j < 4; i++, j++) {
        if (funkySongs.length === i) {
          i = 0;
          lastNum = 0;
          break;
        }
        var currentSong = songList.getSongs(i);
        var nextSong = "";
        nextSong += `<h1>${currentSong.title}</h1>`;
        nextSong += `<ul><li>${currentSong.artist}</li>`;
        nextSong += `<li>${currentSong.album}</li></ul><button id="delete${i}">delete</button>`;

        $('#songPLacement').append(nextSong);
      }
      lastNum = i;
    }
  };
})();


$.ajax({
  url: "https://resplendent-torch-2777.firebaseio.com/songs.json",
  success: songsOnLoad
});

function songsOnLoad(song) {
  for (let i in song) {
    songList.addSongs(song[i], i);
  }
  songList.insertSongs();
}

$('#addStuff').click(function() {

  let newSong = {
      "title": $("#songName").val(),
      "album": $("#albumName").val(),
      "artist": $("#artistName").val()
  }
  $.ajax({
    url: "https://resplendent-torch-2777.firebaseio.com/songs.json",
    type: "POST",
    data: JSON.stringify(newSong)
  }).done(function(KeyOfStuff){
    console.log("it saved");
    songList.addSongs(newSong, KeyOfStuff.name)
    viewMusic();
    songList.insertSongs();
    $("#songName").val("");
    $("#artistName").val("");
    $("#albumName").val("");
  })



});

$('#songPLacement').click(function(e) {
  if (e.target.id.substring(0,6) === "delete") {
    songList.deleteSongs(e.target.id.substring(6,e.target.id.length));
    songList.insertSongs();
  }
});