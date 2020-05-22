<?php
	
	session_start();

	// Imprimimos los artículos para los que el stock sea insuficiente

	echo "No podemos enviar por stock insuficiente los siguientes artículos: <br>";

	for ($i = 0; $i < 5; $i++) { 
		if(isset($_SESSION["articulosInsuficientes_".$i])) {

			echo $_SESSION["articulosInsuficientes_".$i]."<br>";
		}
	}

	echo "<br>";

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// Imprimimos los artículos cuyo stock sea suficiente


	echo "Los siguientes artículos quedarán bajo stock: <br>";

	for ($j = 0; $j < 5; $j++) { 
		if(isset($_SESSION["articulosBajoStock_".$j])) {

			echo $_SESSION["articulosBajoStock_".$j]."<br>";
		}
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	echo '<br><br><a href="enlaces.php">Menú principal</a>';
	session_destroy();

 ?>