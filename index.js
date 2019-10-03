$(function(){
  // GET/READ SONGS //
  $('#get-btn').on('click', function(){
    $.ajax({
      url: '/api/songs',
      method: 'GET',
      contentType: 'application/json',
      success: function(response) {
        var tbodyEl = $('tbody');
        tbodyEl.html('');
        response.songs.forEach((songs) => {
          tbodyEl.append('\
          <tr>\
            <td class="id">' + songs.id + '</td>\
            <td><input type="text" class="name" value="' + songs.track + '"></td>\
            <td>\
              <button class="update-btn">UPDATE/PUT</button>\
              <button class="delete-btn">DELETE</button>\
            <td>\
            </tr>\
          ');
        });
      }
    });
  });


  // CREATE/POST //
  $('#create-form').on('submit', (event) => {
    event.preventDefault();

    var createInput = $('#create-input');

    $.ajax({
      url: '/api/songs',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({track: createInput.val() }),
      success: (response) => {
        console.log(response);
        createInput.val('');
        $('#get-btn').click();
      }


    });
  })

});