// client-side js
// run by the browser each time your view template is loaded

$(function() {
    
  $.get('/search-track', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
    var trackName = $('<h3>' + '<a href="' + data.external_urls.spotify + '" target="_blank">' + data.name + '</a>' + '</h3>');
    //`<h3><a href="$(data.external_urls.spotify)"> $(data.name) </a>` - New Javascript allows you to use template literals and avoid complicated concatination
    trackName.appendTo('#search-track-container');
    
    
    //Display the artist name
    var artistName = $('<h5>' + data.artists[0].name + '</h5>');
    artistName.appendTo('#search-track-container');

    
    //If more than one artist on a track:
    //For each calls function for each element in an array; will loop until array is complete
    //var artists ='';
    //data.artists.forEach(function(element) {
    //  artists = artist.element.name + ' ';
    // })
    //; 
    
    // Display the album art
    var img = $('<img/>');
    img.attr('src', data.album.images[0].url);
    img.appendTo('#search-track-container');
  });
  
  $.get('/category-playlists', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the playlists
    data.items.map(function(playlist, i) {
      var img = $('<img class="cover-image"/>');
      img.attr('src', playlist.images[0].url);
      img.appendTo('#category-playlists-container');
    });
  });
  
  $.get('/audio-features', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness","liveness","energy","speechiness"]
    
    // Display the audio features
    keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
        var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        feature.appendTo('#audio-features-container');
        // var trackName = $('<h3>' + data.artists[0].name + '</h3>');
        // trackName.appendTo('#audio-features-container');
      }
    });
  });
  
  $.get('/artist', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the artist's image
    var img = $('<img class="circle-image" />');
    img.attr('src', data.images[0].url);
    img.appendTo('#artist-container');
    
    // Display the artist name
    var trackName = $('<h3>' + data.name + '</h3>');
    trackName.appendTo('#artist-container');
    
    // Display the artist's genres
    data.genres.map(function(genre, i) {
      var genreItem = $('<p>' + genre + '</p>');
      genreItem.appendTo('#artist-container');
    });
    
    //Display the artist's popularity
    console.log(data.popularity);
    var artistPopularity = $('<h4> Popularity: ' + data.popularity + '</h4>');
    artistPopularity.appendTo('#artist-container');
    
    //Display the artist's followers
    console.log(data.followers.total);
    var artistFollowers = $('<h4> Followers: ' + data.followers.total + '</h4>');
    artistFollowers.appendTo('#artist-container');
    
  });
    
  
  $.get('/artist-top-tracks', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    
    //Display artist name
    var artistName = $('<h3>' + data[0].artists[0].name + '</h3>')
    artistName.appendTo('#top-tracks-container');
    
    console.log(data);
    console.groupEnd();
    
    // Display the audio features
    data.map(function(track, i) {
      var trackName = $('<li>' + track.name + '</li>');
      trackName.appendTo('#top-tracks-container');
    });
  });
  
  
  $.get('/related-artists', function(data) {
    
    console.group('%cResponse from /related-artists', 'color: #000000; font-size: large');
    var artistId = '6DnF6PBcTSsEZuEjXpK0gX';
    if (data.body.artists.length) {
      // Print the number of similar artists
      console.log('I got ' + data.body.artists.length + ' similar artists!');

      console.log('The most similar one is ' + data.body.artists[0].name);
    } else {
      console.log("I didn't find any similar artists.. Sorry.");
    }
  },
  function(err) {
    console.log('Something went wrong..', err.message);
  });

  //

});
