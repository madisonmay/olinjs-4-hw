
var refresh = function() {
	$(".tweets").load('/tweets/refresh');
};

$(document).ready(function () {

	setInterval(refresh, 2000);

	$(".post_tweet").click(function () {
		var message = $("#new_tweet").val();
		var datetime = new Date().getTime() / -1000;
		if (message.length <= 140 && message.length > 0) {
			$.post('/tweet/create', { message : message, datetime : datetime });
			refresh();
			$("#new_tweet").val('');
		}
		else {
			$("#new_tweet").val('1 to 140 characters, please.');
		}
	});
});