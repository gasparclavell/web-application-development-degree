<?php 
	
	if(isset($_POST["submit"])) {

		$nombre_fichero = "alumnos.txt";

		/*Abrimos el fichero con el puntero al final*/
		$file = fopen($nombre_fichero, "a") or die("Error en la creación del fichero");

		/*Escribimos los datos recogidos en el formulario*/
		fwrite($file, str_pad($_POST["codigo_ciclo"], 2, " ")."|");
		fwrite($file, str_pad($_POST["dni"], 9, " ")."|");
		fwrite($file, str_pad($_POST["nombre"], 20, " ")."|");
		fwrite($file, str_pad($_POST["nota_media"], 1, " ")."\n");

		fclose($file);

		/*Mensaje de aviso*/
		echo '<script>alert("Alumno añadido con éxito")</script>';
	}

	/*Formulario*/
	echo '
	<form method="POST" action="alumnos.php">

	<p>Código del ciclo:</p>
	<input type="number" name="codigo_ciclo">

	<p>DNI del alumno:</p>
	<input type="text" name="dni">

	<p>Nombre del alumno:</p>
	<input type="text" name="nombre">

	<p>Nota media:</p>
	<input type="number" name="nota_media"><br><br>

	<input type="submit" name="submit">
	';

 ?>