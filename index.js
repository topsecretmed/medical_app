var ref = new Firebase("https://sntc-check-in.firebaseio.com/"); //changed to the firebase link

$(function() {
	//temp solution for storing email addresses! This will be put on the database eventually!
	var email_address = ["TMS Clinician", "ken.melman@seattlentc.com", "josh.bess@seattlentc.com", "suzanne.kerns@seattlentc.com", "tuesday.burns@seattlentc.com", "ellie.gunnoe@seattlentc.com"];

	$(document).ready(function() {
		$("#submit_button").click(function() {
			clicked();
		});
		//helps prevent the form being submitted when ipad return button is pressed!
		$("form").submit(function(event) {
   			document.activeElement.blur();
		});

		//if user clicks anywhere on the website, it will direct towards input id="name"
		$("html").one("click", function(){
			$("#name").focus();
		});

		function clicked() {
			var patient_submitted_data;

			patient_submitted_data = checkInfo();
			var patient_name = patient_submitted_data[0];
			var provider = patient_submitted_data[1];
			var reason_for_visit = patient_submitted_data[2];
			var provider_email_address_index = patient_submitted_data[3];

			//grab the current time so patient doesn't have to enter it
			var d = new Date();

			//switched to 12 hour instead of 24!
			var hours;
			var AM_PM = " AM";
			if(d.getHours() > 12) {
				hours = d.getHours() - 12;
				if(hours === 0)
					hours = 12;
				AM_PM = " PM";
			} else {
				hours = d.getHours();
			}

			//making sure anything less than 10 minutes doesn't look werid
			var minutes = "";
			if(d.getMinutes() < 10) {
				minutes += "0" + d.getMinutes();
			} else {
				minutes += d.getMinutes();
			}

			var time = hours + ":" + minutes + ":" + d.getSeconds() + AM_PM;
			//storing information on the database!
			var usersRef = ref.child("patients");
			var newPatients = usersRef.push(); //how do you tell when data has been successfu lly transferred?
			newPatients.set({
			 	patient: patient_name,
			 	CheckIn: time,
			 	Provider: provider,
			 	Reason: reason_for_visit,
			 	display: "true"
			});

			alert("Done! Please press 'Ok' to complete your check-in. This page will refresh automatically.");

			//send out the email!
			$.post( 
			  "send.php",
			  { 
			  	provider_email: email_address[provider_email_address_index],
			  	patient: patient_name,
				provider: provider 

			  })
			.done(function( data ) {
				window.setTimeout(function(){ window.location.reload(true); },500);
			});
		}

		function checkInfo() {
			var info;
			//grab patient's name, get rid of extra spaces
			var patient_name = $("#name").val().trim();
			if(patient_name.length === 0) {
				alert("Please fill out your full name!");
				return;
			}

			var name_parts = patient_name.split(" ");
			if(name_parts[1] != null) {
				var last_name = name_parts[1].substring(0,1).toUpperCase() + ".";
				patient_name = name_parts[0].charAt(0).toUpperCase() + name_parts[0].slice(1) + " " + last_name;
			} else {
				patient_name = name_parts[0].charAt(0).toUpperCase() + name_parts[0].slice(1);
			}

			//grab provider radio button:
			var provider;
			var provider_index;
			if($( "input:radio[name=Provider]:checked" ).length === 0) {
				alert("No provider selected!");
				return;
			} else {
				provider = $( "input:radio[name=Provider]:checked" ).val();
				$("input:radio[name=Provider]").each(function(i) {
				   if (this.checked) {
				   		provider_index = i;
				   }
				});
			}

			//grab the reason for visit radio button:
			var reason_for_visit;
			if($( "input:radio[name=RFV]:checked" ).length === 0) {
				alert("Please select reason for visit!");
				return;
			} else {
				reason_for_visit = $( "input:radio[name=RFV]:checked" ).val();
			}
			return info = [patient_name, provider, reason_for_visit, provider_index];
		}
	});
});