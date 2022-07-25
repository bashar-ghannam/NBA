$('#roster-btn').on('click', function () {
  let input = $('#input-teamName').val();

  $.get(`teams/${input}`, function (players) {
    $('.main').empty();
    players.map((player) => {
      render(player);
    });
  });
});

const render = function (player) {
  const source = $('#player-template').html();
  const template = Handlebars.compile(source);
  let newHTML = template(player);
  $('.main').append(newHTML);
};
