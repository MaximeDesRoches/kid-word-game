<?php require_once("Utils.php"); ?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1"/>
		<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
		<link rel="stylesheet" href="/assets/built/css/index.css">

		<title>Word Game</title>

		<?php
			ini_set("error_reporting", E_ALL);
			error_reporting(E_ALL);
			$lang = isset($_GET['l']) ? $_GET['l'] : 'fr';

			if ($lang != 'fr') {
				$lang = 'en';
			}
			$data = json_decode(file_get_contents("./languages/content_$lang.json"));
		?>
	</head>
	<body>
		<div id="root"></div>
		<script src="/assets/built/js/index.js"></script>
	</body>
</html>