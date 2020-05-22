<?php 
	
	if(isset($_POST["submit"])) {

		$nombre_fichero = "ciclos.txt";

		/*Abrimos el fichero con el puntero al final*/
		$file = fopen($nombre_fichero, "a") or die("Error en la creación del fichero");

		/*Escribimos los datos recogidos en el formulario*/
		fwrite($file, str_pad($_POST["codigo"], 2, " ")."|");
		fwrite($file, str_pad($_POST["nombre"], 50, " ")."|");
		fwrite($file, str_pad($_POST["horas"], 5, " ")."\n");

		fclose($file);

		/*Mensaje de aviso*/
		echo '<script>alert("Ciclo añadido con éxito")</script>';
	}

	/*Formulario*/
	echo '
	<form method="POST" action="ciclos.php">

	<p>Código del ciclo:</p>
	<input type="number" name="codigo">

	<p>Nombre del ciclo:</p>
	<input type="text" name="nombre">

	<p>Horas del ciclo:</p>
	<input type="number" name="horas"><br><br>

	<input type="submit" name="submit">
	';

 ?>