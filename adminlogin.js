$(function() {
	var password;
	var username;
	//when you hit enter on the keyboard, it's the same as hitting click
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        $("#submit").trigger("click");
	    }
	});
	
	$("#submit").click(function() {
		var username = $("input[name='username']").val();
		var password = $("input[name='password']").val();

		if(username.length == 0) {
			alert("Please enter a username!");
			return;
		} 

		if(password.length == 0) {
			alert("Please enter a password!");
			return;
		}

		$.post( 
			  "login.php",
			  { 
			  	username: username,
			  	password: password 
			  })
			.done(function( data ) {
				console.log(data);
				if(data === "true") {
					window.location.replace("admin.php");
				} else {
					alert("Sorry wrong information entered!");
					location.reload();
				}
			});
		});
	});