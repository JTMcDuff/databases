// YOUR CODE HERE:
//figure out the this and inheritance situation
//$.get('https://api.parse.com/1/classes/messages')

var App =  function() {
  // this.server = 'https://api.parse.com/1/classes/messages?order=-createdAt'
  this.server = 'http://127.0.0.1:3000/'
};

App.prototype.init = function() {
  app.friends = {};
   // User Name is Clicked
  $('.username').on('click', app.handleUsernameClick)
  $('body').on('click', '.username', function(that){
    if(app.friends[that.currentTarget.firstChild.data] === undefined){
    app.friends[that.currentTarget.firstChild.data] = "";
    $('.friendList').append(" " + that.currentTarget.firstChild.data + " ")
    }
    app.fetch();
  })

  // Room is Changed.
  $('.rooms').change(function () {
    app.renderRoom($('.rooms option:selected').text());
  });
  // Room is Created
  $('.createroom').on('click', app.handleCreateRoom);

  // MESSAGE IS SENT.
  $('.submit').on('click', app.handleSubmit);
  $('.submit').on('submit', app.handleSubmit);


  //Publish Message
  app.fetch()
  setInterval(function() {

    app.fetch()

  }, 5000) ;
};

App.prototype.send = function(data){

  $.ajax({
    type: 'POST',
    url: this.server,
    data: JSON.stringify(data),
    success: function(data) {
      alert('MESSAGE SENT!');
    },
    error: function(err) {
      console.log(err);
    },
    dataType: 'text/JSON'
  });

  return this;
};

App.prototype.fetch = function(){

  var context = this;

  return $.ajax({
    type: 'GET',
    url: this.server,
    success: function(data) {

      context.parseData(data);

    }

  });
};

App.prototype.clearMessages = function() {

  $('#chats').empty();

};

App.prototype.parseData = function(data) {

  rooms = {};
  rooms['lobby'] = 0
  rooms['DUCK POND'] = 0
  app.clearMessages()
  data.results
    .forEach(function(item) {
      //adds a room property and counts the messages in every room

      rooms[item.roomname] = (rooms[item.roomname] || 0) + 1

      if (item.roomname === $('.rooms').val()) {
        app.renderMessage(item);
      }
  })
//current room
  var currentRoom = $('.rooms').val();

  // populate our roomlist
  $('.rooms').empty();
  $.each(rooms, function(key, value){
    $('.rooms')
    .append($('<option value="' + key  + '">' + key + '</option>'))
  });

  $('.rooms').val(currentRoom)}

App.prototype.renderMessage = function(message) {

  var $userName = $('<a>', {
    'class': 'username',
    'href' : '#',
    'text' : message.username
  });

  var $text = $('<span>', {
    'class' : 'messageText',
    'text' : message.text
  });

  //var text = '<p class="messageText">' + message.text + '</p>';

  var $roomName = $('<span>', {
    'class' : 'roomName',
    'text' : message.roomname
  });

  var $message = $('<div class="chat">');
  if(message.username in app.friends){
    $text.addClass('friendMessage')
  }
  $message
  .append('<strong>Username: </strong> ')
  .append($userName)
  .append('</br> <strong> Message: </strong>')
  .append($text)
  .append('</br> <strong> Room: </strong>')
  .append($roomName)

  $('#chats').append($message);
};

App.prototype.renderRoom = function(room){
  app.fetch();

};

App.prototype.handleUsernameClick = function() {
   return this
}

App.prototype.handleSubmit = function() {
  var message = {};
  message.text = $('.msg-box').val();
  message.roomname = $('.rooms').val();
  message.username = window.location.search.split('=')[1];
  app.send(message);
  app.fetch();
  $('.msg-box').val("")
}

App.prototype.handleCreateRoom = function () {
 var message = {};
  message.text = 'A New room has been Created...' + $('.createroomtextbox').val();
  message.roomname = $('.createroomtextbox').val();
  message.username = window.location.search.split('=')[1];
  app.send(message);
  app.fetch()
    .then(function() {
      $('.rooms').val($('.createroomtextbox').val());
    });
  $('.createroomtextbox').val("");
}

var app = new App();


$(document).ready(function() {

  app.init();

});





