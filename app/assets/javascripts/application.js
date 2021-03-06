// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require turbolinks
//= require semantic-ui
//= require_tree .


// jQuery to be executed after DOM loads
$(document).on('turbolinks:load', () => {
	emptyChatroomNames();
	uncheckAll();
	
	// Flash messages
	message_close();

	// Sessions
	responsive();

	// Chatroom
	submit_message();
	scroll_bottom(false, $('#Messages'));
	$('.ui.dropdown').dropdown();

	// View actions
	view_chatrooms_btn();
	chatroom_btns();
	close_on_scroll();

	// New actions
	new_chatroom_btn();
	checkbox('new');
	submit_chatroom();

	// Options
	removeListener();
	renameListener();
	submitRename();
	addOrRemListener('add');
	addOrRemListener('remove');
	checkbox('add');
	checkbox('remove');
	btnIfCheck('add');
	btnIfCheck('remove');
	addRemSubmit('add');
	addRemSubmit('remove');

})