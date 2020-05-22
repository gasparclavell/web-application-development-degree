<?php
	
	// Enlazamos con el .php que contiene las funciones
	require_once("funciones.php");

	// En caso de que demos de alta un nuevo artículo
	if(isset($_POST["submit_alta"])) {

		// Tornamos el precio de venta un 20% mayor que el precio de compra
		$pv = $_POST['pc'] + $_POST['pc'] * 0.2;

		// Nos conectamos a la base de datos mediante PDO
		$con = conexion("localhost", "examen_febrero", "root", "");

		// Hacemos una Select para obtener la cantidad mínima de control
		$select = sentencias($con, 'SELECT cantMinima FROM control WHERE tipoArticulo = "'.$_POST['tipoArticulo'].'"');
		$art;
		if ($fila = $select->fetch()){
			$art = $fila[0];	    
		}

		$cantidadMinima = $art;

		// Insertamos el nuevo registro
		$con = conexion("localhost", "examen_febrero", "root", "");
		sentencias($con, 'INSERT INTO articulos VALUES ("'.$_POST['codArt'].'", "'.$_POST['nombreArticulo'].'", "'.$_POST['pc'].'", "'.$pv.'", "'.$_POST['cantidad'].'", "'.$cantidadMinima.'", "'.$_POST['tipoArticulo'].'")');

		cerrar($con);

		header('Location: fichero.php?accion=alta');
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// En caso de recibir la orden de eliminar un artículo
	else if(isset($_GET["codArt"])) {

		$conDelete = conexion("localhost", "examen_febrero", "root", "");
		sentencias($conDelete, 'DELETE FROM articulos WHERE codArt = "'.$_GET["codArt"].'"');
		cerrar($conDelete);

		header('Location: fichero.php?accion=baja');
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// En caso de recibir la orden de realizar un pedido
	else if(isset($_POST["submit_pedido"])) {

		session_start();
		/*session_destroy();
		session_start();*/

		// Contadores
		$contPedidos = 0;
		$artBajoStock = 0;
		$artSinSufStock = 0;
		$i = 0;

		// Nos conectamos para hacer las Selects necesarias con las que comprobar si existe stock suficiente
		$conSelect = conexion("localhost", "examen_febrero", "root", "");

		while(isset($_POST["codArt_".$i])) {

			if($_POST["codArt_".$i] != "" && $_POST["cantidad_".$i] != "") {

				$contPedidos++;

				// Nos conectamos mediante PDO
				$conSelect = conexion("localhost", "examen_febrero", "root", "");

				$select = sentencias($conSelect, 'SELECT cantidad FROM articulos WHERE codArt = "'.$_POST["codArt_".$i].'"');
				$art;
				while ($fila = $select->fetch()){
					$art = $fila[0];	    
				}				

				//echo "Cantidad pedida: ".$_POST["cantidad_".$i]." | Stock disponible: ".$fila[0]."<br>";

				if($_POST["cantidad_".$i] < $art) {
					$artBajoStock++;
					$_SESSION["articulosBajoStock_".$i] = $_POST["codArt_".$i];
				} else {
					$artSinSufStock++;
					$_SESSION["articulosInsuficientes_".$i] = $_POST["codArt_".$i];		
				}
			}
			$i++;
		}

		cerrar($conSelect);

		// Imprimimos por pantalla los resultados
		echo "INCIDENCIAS <br>";
		echo "De ".$contPedidos." artículo/s pedido/s <br>";
		echo $artBajoStock." artículo/s bajo stock <br>";
		echo $artSinSufStock." artículo/s sin suficiente stock <br>";
		echo '<a href="incidencias.php">VER INCIDENCIAS</a><br>';

		echo '<br><br><a href="enlaces.php">Menú principal</a>';
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// En caso de acceder directamente a accedoDatos.php, nos redirecciona a enlaces.php
	else {
		header('Location: enlaces.php');
	}

 ?>