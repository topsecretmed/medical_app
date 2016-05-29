<!-- checking to see if the user has permission to view page! -->
<?php
	session_start();

	if (isset($_SESSION["login_special_password"])) {
		if($_SESSION["login_special_password"] != "2f435014eb763632c946476923ce49cf")
			exit();
	} else {
		exit("Please login!!");
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="admin.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script> 
	<script src="https://cdn.firebase.com/js/client/2.4.1/firebase.js"></script>
	<script rel="javascript" src="admin.js"></script>
	<title>Administration Page</title>
</head>
<body>
	<h1 class="description">SeattleNTC Admin</h1>
	<div class="box-table">
		<table>
			<!-- <span class="loading_table">  can be used for loading html/css information--> 
			<tbody>
				<thead id="patient_display_information">
					<tr>
						<th>Patient Name</th>
						<th>Check In</th>
						<th>Provider</th>
						<th>Reason</th>
						<th>Actions</th>
					</tr>
				</thead>
			</tbody>
		</table>    
	</div>
	<div class="button_container">
		<button id="destroy_database">DELETE ALL DATA</button>
	</div>
	<!-- <div class="button_container">
		<button id="remove_strikethrough">DELETE ALL DATA</button>
	</div> Future implementation-->
</body>
</html>