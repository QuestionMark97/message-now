showMenu = (mode) => {
	$('.profile').hide();
	$('.new-action').hide();
	$('.view-action').hide();
	$('.chatroom-options').hide();
	$('.chatroom-name').hide();
	$('.confirm.button').hide();
	let el;
	switch (mode) {
		case 'profile':
			el = $('.profile');
			break;
		case 'new':
			el = $('.new-action');
			break;
		case 'view':
			el = $('.view-action');
			break;
		default:
			el = $(`.chatroom-options[data-chatroom_id = ${mode}]`);
			break;
	};
	el.fadeIn(500);

	$('.edit.button').removeClass('blue');
	$('.add.button').removeClass('blue');
	$('.remove.button').removeClass('red');
};

uncheckAll = () => {
	uncheck($('.chatroom-form'));
	uncheck($('.add-form'));
	uncheck($('.remove-form'));
};

uncheck = form => {
	form.find(':input').prop('checked', false);
};

// Checkbox functionality
checkbox = (mode, element='') => {
	let [el, color, form_sibling] = getCardVarsFromName(mode);
	el = (element === '') ? el : element;
	el.click(event => {
		let target = $(event.target).closest('.user.card');
		let form_parent = target.closest(form_sibling).siblings(`.${mode}-action`);
		form_parent.find(`:input[value=${target.data('user-id')}]`).click();
		if (target.css('background-color') == 'rgb(136, 136, 136)') {
			target.css('background-color', color);
		}
		else {
			target.removeAttr('style');
		};
	});
};

removeCheckbox = (mode, chatroom_id, user_id) => {
	let checkbox = $(`#${mode}-form-${chatroom_id} [for = chatroom_user_ids_${user_id}]`);
	return checkbox.remove();
};

addCheckbox = (mode, chatroom_id, checkbox) => {
	let checkbox_group = $(`#${mode}-form-${chatroom_id}>.field>.fluid.input`);
	checkbox_group.append(checkbox[0].outerHTML);
	uncheck($(`#${mode}-form-${chatroom_id}`));
};

getCardVarsFromName = name => {
	switch (name) {
		case 'new':
			return [$('#users>.cards>.user.card>.content'), '#2185d0', '.new-action'];
		case 'add':
			return [$('.add>.cards>.user.card>.content'), '#2185d0', '.cards'];
		case 'remove':
			return [$('.remove>.cards>.user.card>.content'), '#db2828', '.cards'];
	};
};

idToUsername = (id) => {
	return $(`h2.chatroom-options[data-chatroom_id = ${id}]`).text();
};

subtractNotif = (chatroom_id) => {
	let chat_notif = $(`#chatroom_${chatroom_id}_badge`).text();
	let total_notif = $('#chatrooms_badge');
	total_notif.text(Number(total_notif.text()) - Number(chat_notif));
};

isVisible = (el) => {
	return (el.css('display') === 'none') ? false : true;
};