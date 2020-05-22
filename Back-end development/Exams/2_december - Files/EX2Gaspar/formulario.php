<?php 
	
	if(isset($_POST["submit"])) {
		if(get_cfg_var('file_uploads')) {

			/*Dos copias del primer archivo subidas al servidor. Nombres diferentes*/
			copy($_FILES['fichero_1']['tmp_name'], 'fichero1.txt');
			copy($_FILES['fichero_1']['tmp_name'], 'fichero1_2.txt');

			/*Segundo archivo. Mismo nombre de origen*/
			copy($_FILES['fichero_2']['tmp_name'], $_FILES['fichero_2']['name']);

			echo $_FILES['fichero_1']['tmp_name'];
			echo "<br>";
			echo $_FILES['fichero_1']['size'];
			echo "<br>";
			echo $_FILES['fichero_1']['type'];

			echo "<br>";
			echo "<br>";

			echo $_FILES['fichero_2']['tmp_name'];
			echo "<br>";
			echo $_FILES['fichero_2']['size'];
			echo "<br>";
			echo $_FILES['fichero_2']['type'];

			echo '<script>alert("Los archivos se han subido con éxito al servidor")</script>';
		}
	}

	/*Formulario*/
	echo '

	<form action="formulario.php" method="post" enctype="multipart/form-data">
		
		<input type="file" name="fichero_1"><br><br>
		<input type="file" name="fichero_2"><br><br><br>
		<input type="submit" name="submit">

	</form>

	';
?>