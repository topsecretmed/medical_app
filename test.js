//The following code will input random users to the database for testing
var ref = new Firebase("https://medicallogin2193.firebaseio.com/");
var usersRef = ref.child("patients");
for(var i = 0; i < 50; i++) {
	var patient_name = "David Tan Ilya Frid" + i;
	var time = "12:12:12AM";
	var provider = "Dr.Frid";
	var reason_for_visit = "test";
	var newPatients = usersRef.push(); //how do you tell when data has been successfu lly transferred?
	newPatients.set({
	 	patient: patient_name,
	 	CheckIn: time,
	 	Provider: provider,
	 	Reason: reason_for_visit,
	 	display: "true"
	});
}