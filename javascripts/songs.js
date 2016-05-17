"use strict";
var type;
var songList = (function() {
  return {
    deleteSongs: function(num) {
      $.ajax({
        url: `https://resplendent-torch-2777.firebaseio.com/songs/${num}.json`,
        type: "DELETE"
      }).done(function(){
        firebaseCall();
      });
    },
    editSongs: function(num) {
      var newThing = {};
      $.ajax({
        url: `https://resplendent-torch-2777.firebaseio.com/songs/${num}.json`,
        type: "GET",
      }).done(function(thing) {
        $('#options').hide();
        $('#songlist').hide();
        $('#musicForm').show();
        $("#songName").val(thing.title);
        $("#artistName").val(thing.artist);
        $("#albumName").val(thing.album);
      }).then(function() {
        type = num;
      });
    },
    insertSongs: function(songs) {
      $('#songPLacement').html("");
      for (let i in songs) {
        var nextSong = "";
        nextSong += `<h1>${songs[i].title}</h1>`;
        nextSong += `<ul><li>${songs[i].artist}</li>`;
        nextSong += `<li>${songs[i].album}</li></ul><button id="delete${i}">delete</button><button id="edit${i}">edit</button>`;
        $('#songPLacement').append(nextSong);
      }
    }
  };
})();

function firebaseCall() {
  $.ajax({
    url: "https://resplendent-torch-2777.firebaseio.com/songs.json",
    success: songList.insertSongs
  });
}

$('#addStuff').click(function() {
  let newSong = {
      "title": $("#songName").val(),
      "album": $("#albumName").val(),
      "artist": $("#artistName").val()
  };
  if (type === "POST") {
    $.ajax({
      url: "https://resplendent-torch-2777.firebaseio.com/songs.json",
      type: "POST",
      data: JSON.stringify(newSong)
    }).done(function(){
      firebaseCall();
      $("#songName").val("");
      $("#artistName").val("");
      $("#albumName").val("");
    });
  } else {
    $.ajax({
      url: `https://resplendent-torch-2777.firebaseio.com/songs/${type}.json`,
      type: "PUT",
      data: JSON.stringify(newSong)
    }).done(function(){
      firebaseCall();
      $("#songName").val("");
      $("#artistName").val("");
      $("#albumName").val("");
    });
  }
  viewMusic();
});

$('#songPLacement').click(function(e) {
  if (e.target.id.substring(0,6) === "delete") {
    songList.deleteSongs(e.target.id.substring(6,e.target.id.length));
  } else if (e.target.id.substring(0,4) === "edit") {
    songList.editSongs(e.target.id.substring(4,e.target.id.length));
  }
});
firebaseCall();