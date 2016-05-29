
<?php
	//It is important to note that when setting up the gmail account, please go into settings
	//and allow any app to access the account. Bascially disable and security checks in order for
	//us to use this code!
	require_once 'swiftmailer/lib/swift_required.php'; //require necessary php file

	$provider_email = htmlspecialchars($_POST["provider_email"]);
	$patient_name = htmlspecialchars($_POST["patient"]);
	$provider = htmlspecialchars($_POST["provider"]);

	$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
	  ->setUsername('sntc.checkin@gmail.com') //gmail account information
	  ->setPassword('Seattlentc2@!6'); //gmail password

	$mailer = Swift_Mailer::newInstance($transport);
	
	if(strcmp($provider, "TMS Clinician") == 0 ) {
		$message = Swift_Message::newInstance('Your patient has checked in for TMS!') //subject line
		  ->setFrom(array('sntc.checkin@gmail.com')) //from which email address 
		  ->setTo(array("ilya.frid@seattlentc.com", "jennifer.bolton@seattlentc.com", "serena.smith@seattlentc.com", "stephanie.ingle@seattlentc.com", "simon.kaplan@seattlentc.com", "brooks.page@seattlentc.com", "crystal.retino@seattlentc.com", "olivia.wong@seattlentc.com", "corrina.smith@seattlentc.com"))	//list all 6 people who are TMS Clinician
		  ->setBody(" Your patient, " . $patient_name . ", has checked in for TMS!", 'text/html');	//this is where you would add content to the email!
	} else {
		$message = Swift_Message::newInstance('New Patient Check in!') //subject line
		  ->setFrom(array('sntc.checkin@gmail.com')) //from which email address
		  ->setTo(array($provider_email, "ilya.frid@seattlentc.com", "jennifer.bolton@seattlentc.com", "simon.kaplan@seattlentc.com"))	
		  ->setBody($provider . " your patient, " . $patient_name . ", has checked in!", 'text/html');
	}
	$result = $mailer->send($message);
	echo("Done sending the email!");
?>