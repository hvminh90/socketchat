$(document).ready(function(){
        var socket = io.connect('http://127.0.0.1:2308');
        var messages = [];

        socket.on('message', function(data){
            if(data.message)
            {
            	var html = '';
            	messages.push(data);
            	for (var i = 0; i < messages.length; i++) {
	                

            		html += '<li class="media">';

                    html += '<div class="media-body">';

                    html += '<div class="media">';
                    html += '<a class="pull-left" href="#">';
                    html += '<img class="media-object img-circle " src="/img/user.png" /></a>';
                    html += '<div class="media-body" >';
                    html += messages[i].message + '</br>';                             
                                                  
                     html += '<small class="text-muted">' + (messages[i].username ? messages[i].username : 'Server') +' | 23rd June at 5:00pm</small><hr /></div></div></div></li>';
            	}
            	 $('#bodyChat').html(html);

            }
            else
            {
            	console.log('Có lỗi xảy ra: ' + data);
            }
        })

        $('#btnSend').click(function(){
        	var username = 'Minh';
        	var message = $('#message').val();
        	socket.emit('send', {message : message, username: username});
        	$('#message').val('');
        });

        $("#message").keyup(function (e) {
        if (e.keyCode == 13) {
            $("#btnSend").click();
        }
    });
})