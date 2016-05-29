var ref = new Firebase("https://sntc-check-in.firebaseio.com/patients"); //change the firebase link 
																			//leave the /patients part

$(function() { //wait for the DOM to be ready!
	var count = 1;
	ref.on("child_added", function(data) {
		var patient_name = data.child("patient").val();
		var check_in_time = data.child("CheckIn").val();
		var provider = data.child("Provider").val();
		var reason = data.child("Reason").val();
		var should_display = data.child("display").val();

		if(should_display === "true") {
			$("#patient_display_information").append("<tr><td>" + patient_name + 
												 "</td><td>" + check_in_time + 
												 "</td><td>" + provider + 
												 "</td><td>" + reason + "</td><td><button onclick=\"strikeOutPatient("+ count + ")\" id=\"" + count + "\">" +
												 "Checked In</button></td></tr>");
		} else {
			$("#patient_display_information").append("<tr class='strikeOut'><td>" + patient_name + 
												 "</td><td>" + check_in_time + 
												 "</td><td>" + provider + 
												 "</td><td>" + reason + "</td><td><button onclick=\"strikeOutPatient("+ count + ")\" id=\"" + count + "\">" +
												 "Checked In</button></td></tr>");
		}
		count++;
	});
	
	
	// Attach an asynchronous callback to when a child is removed! Just refreshes the page!
	//This enables multiple computers to have the admin page and if anyone checks in a patient,
	//the data will be updated for everybody!	
	ref.on("child_changed", function(data) {
		location.reload();
	});
	
	//If an admin removes a patient, not just strikeout, then the page will refresh as well!
	ref.on("child_removed", function(data) {
		location.reload();
	});
	//This will forver destroy all data in the database!
	$("#destroy_database").click(function() {
		if(confirm("Are you sure?") == true) {
			ref.remove();
			location.reload();
		}
		else {
			return;
		}
	});
});

//The function that will strikeout the patient as well as update the database!
function strikeOutPatient(patient_number) {
	var count = 0;
	$("tr").eq(patient_number).addClass("strikeOut");
	var string = "https://sntc-check-in.firebaseio.com/patients/";

	ref.once("value", function(snapshotparent) {
		snapshotparent.forEach(function(childSnapshot) {
			if (count === patient_number - 1) {
				string += childSnapshot.key();
			}
			count++;
		});
	});
	var remove_node = new Firebase(string);
	//remove_node.remove(); //this is to forever erase the data!
	remove_node.update({display: "false"});
}
