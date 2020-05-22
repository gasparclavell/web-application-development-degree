<?php 
	
	/*Establecemos la conexión con la base de datos*/
	$conexion = mysqli_connect("localhost", "root", "", "ceinmark") or die("Error al conectarse a la base de datos");

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	/*Dar de alta a un registro en la tabla "ciclos"*/
	mysqli_query($conexion, "insert into ciclos values('3','Turismo','1200')") or die("Error al introducir un registro");

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	/*Modificar la nota media de un alumno*/
	mysqli_query($conexion, 'update alumnos set nota_media = "4" where dni_alumno = "76834533O"') or die("Error al realizar una modificación");

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	/*Visualizar todos los ciclos de más de 1400 horas*/
	$registros = mysqli_query($conexion, 'select a.nombre_alumno as nombre_alumno, a.nota_media as nota_media from alumnos a, ciclos c where c.codigo_ciclo = a.codigo_ciclo AND c.horas_ciclo > 1400') or die("Error en la select");

	echo '<h1>Alumnos de ciclos de más de 1400 horas</h1><br><br>';

	while($reg = mysqli_fetch_array($registros)) {
		echo "Nombre: ".$reg["nombre_alumno"]."<br>";
		echo "Nota media: ".$reg["nota_media"]."<br>";
		echo "<hr>";
	}

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	/*Cerramos la conexión con la base de datos*/
	mysqli_close($conexion);

?>