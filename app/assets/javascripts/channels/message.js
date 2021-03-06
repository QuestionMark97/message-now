// Wait for DOM to load so elements can be queried
$(document).on('turbolinks:load', () => {

	//Iterate through chatrooms
	$('.message-container').each(function() {

		chat_subscribe($(this));

	});
});


chat_subscribe = (el) => {
	// Create subscription for chatroom
	App[`chatroom${el.data('chatroom_id')}`] = App.cable.subscriptions.create({
		channel: "MessageChannel",
		room: String(el.data('chatroom_id'))
	},{

		// Called when the subscription is ready for use on the server
		connected: function() {
		
		},

		// Called when the subscription has been terminated by the server
		disconnected: function() {
		
		},

		// Called when there's incoming data on the websocket for this channel
		received: function(data) {
			// Append message partial to message container
			let current_chatroom = $(`.message-container[data-chatroom_id=${data.chatroom_id}]`);
			current_chatroom.append(data.render_message);
			
			// Style message partial further
			messageStyle(current_chatroom);

			// Increment badge notifications if chatroom not open
			let badge = $(`#chatroom_${data.chatroom_id}_badge`);
			let main_badge = $('#chatrooms_badge');
			if (current_chatroom.css('display') == 'none') {
				let user_id = data.user_id;
				let chatroom_id = data.chatroom_id;
				increase_unread(badge);
				increase_unread(main_badge);
			}
			else {
				reset_unread(badge);
				reset_db_unread(data.user_id, data.chatroom_id);
			};

			// Auto-scroll
			scroll_bottom(true, $('#messages'));
		}

	});
};