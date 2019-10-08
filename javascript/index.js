$(() => {

  // GET/READ SONGS //
  $('#get-btn').on('click', () => {
    $.ajax({
      url: '/api/songs',
      method: 'GET',
      contentType: 'application/json',
      success: (response) => {
        var tbodyEl = $('tbody');
        tbodyEl.html('');
        response.songs.forEach((songs) => {
          tbodyEl.append('\
          <tr>\
            <td class="id">' + songs.id + '</td>\
            <td><input type="text" class="name" value="' + songs.track + '"></td>\
            <td><input type="text" class="artist" value=" ' + songs.artist + '"></td>\
            <td><input type="text" class="genre" value=" ' + songs.genre + '"></td>\
            <td>\
              <button class="waves-effect waves-light btn update-btn">edit</button>\
              <button class="waves-effect waves-light btn delete-btn"><i class="material-icons">delete</i>\
              </button>\
            </td>\
            </tr>\
          ');
        });
      }
    });
  });




  // CREATE/POST SONG //
  $('#create-form').on('submit', (event) => {
    event.preventDefault();

    var songInput = $('#song-input');
    var artistInput = $('#artist-input');
    var genreInput = $('#genre-input');

    $.ajax({
      url: '/api/songs',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({track: songInput.val(), artist: artistInput.val(), genre: genreInput.val()}),
      success: (response) => {
        console.log(response);
        songInput.val('');
        artistInput.val('');
        genreInput.val('')
        $('#get-btn').click();
      }


    });
  });


  // UPDATING/PUT SONG //
  $('table').on('click', '.update-btn', () => {
    var rowEl = $(this).closest('tr');
    // var id = rowEl.find('.id').text();
    var updatedSong = rowEl.find('.name').val();

    $.ajax({
      url: '/api/songs/:id',
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({updatedSong: updatedSong}),
      success: (response) => {
        console.log(response);
        $('#get-btn').click();
      }
    });
  });

  // DELETE //
  $('table').on('click', '.delete-btn', () => {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.id').text();

    $.ajax({
      url: '/api/songs/:id',
      method: 'DELETE',
      contentType: 'application/json',
      success: (response) => {
        console.log(response);
        $('#get-btn').click();
      }
    })
  })




});