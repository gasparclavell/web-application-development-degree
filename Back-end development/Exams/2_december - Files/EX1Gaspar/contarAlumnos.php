<?php 
	
	/*Abrimos los archivos al inicio, de forma que los punteros sean estables*/
	$file_alumnos = fopen("alumnos.txt", "r") or die("Error en la lectura del fichero");
	$file_ciclos = fopen("ciclos.txt", "r") or die("Error en la lectura del fichero");
	$file_contarAlumnos = fopen("contarAlumnos.txt", "w") or die("Error en la creación del fichero");

	/*Leemos línea en el fichero "ciclos.txt"*/
	$line_ciclos = fgets($file_ciclos);

	/*Mientras no sea final de fichero en "ciclos.txt"*/
	while(!feof($file_ciclos)) {

		/*Guardamos en un array el contenido de la primera línea del fichero*/
		$array_ciclos = explode("|", $line_ciclos);

		/*Escribimos el código del ciclo en el archivo "contarAlumnos.txt"*/
		fwrite($file_contarAlumnos, str_pad($array_ciclos[0], 2, " ")."|");

		/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

		/*Leemos línea en el fichero "alumnos.txt"*/
		$line_alumnos = fgets($file_alumnos);
		/*Contador de alumnos a 0*/
		$contAlumnos = 0;
		/*Controlamos con un boolenao si el código de ciclo del fichero "ciclos.txt" coincide con el leído en "alumnos.txt"*/
		$mismoCiclo = true;

		/*Mientras no sea final de fichero en "alumnos.txt" y el alumno tenga el mismo código que el ciclo de turno*/
		while(!feof($file_alumnos) && $mismoCiclo) {

			/*Guardamos en un array el contenido de la primera línea del fichero*/
			$array_alumnos = explode("|", $line_alumnos);

			/*Pruebas por pantalla*/
			echo $array_alumnos[0]." = ";
			echo $array_ciclos[0]."<br>";

			/*En el momento en el que no coincidan los códigos de ciclo, pasamos el booleano a false*/
			if($array_alumnos[0] == $array_ciclos[0]) {
				
			} else if($contAlumnos != 0) {
				$mismoCiclo = false;
			}

			/*Leemos línea en el fichero "alumnos.txt"*/
			if($mismoCiclo) {
				$line_alumnos = fgets($file_alumnos);
			}

			/*Aumentamos en uno el contador de alumnos*/
			$contAlumnos++;
		}

		/*Arreglo para la contabilización del primer ciclo*/
		if($array_ciclos[0] == 1) {
			$contAlumnos--;
		}

		/*Escribimos el número de alumnos en el archivo "contarAlumnos.txt"*/
		fwrite($file_contarAlumnos, str_pad($contAlumnos, 3, " ")."\n");

		/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

		/*Leemos línea en el fichero "ciclos.txt"*/
		$line_ciclos = fgets($file_ciclos);

		echo "<br>";
	}

	/*Cerramos los archivos*/
	fclose($file_alumnos);
	fclose($file_ciclos);
	fclose($file_contarAlumnos);

 ?>