<?php
	if(isset($_GET["accion"])) {

		// Enlazamos con el .php que contiene las funciones
		require_once("funciones.php");
 ?>

		<!DOCTYPE html>
		<html lang="es-ES">
		<head>
		 	<meta charset="UTF-8">
		 	<title>Fichero</title>
		</head>
		<body>
			
			<!-- En caso de que el link clicado en enlaces.php sea "ALTA ARTICULOS" -->

		 	<?php  
				if($_GET["accion"] == "alta") {
		 	?>

			<form action="accesoDatos.php" method="POST">
				<p>Código del artículo: </p>
				<input type="number" name="codArt">
				<p>Nombre del artículo: </p>
				<input type="text" name="nombreArticulo">
				<p>Precio de compra: </p>
				<input type="number" name="pc">
				<p>Cantidad: </p>
				<input type="number" name="cantidad">
				<p>Tipo de articulo: </p>
				<select name="tipoArticulo">
					<option value="" disabled="true" selected="true">-- Seleccionar --</option>
					<option value="alimento">Alimento</option>
					<option value="mobiliario">Mobiliario</option>
					<option value="moda">Moda</option>
					<option value="electronica">Electrónica</option>			
				</select>
				<br><br>
				<input type="submit" name="submit_alta">
			</form>

			<?php
				}
		 	?>

		 	<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		 	<!-- En caso de que el link clicado en enlaces.php sea "BAJA ARTICULOS" -->

		 	<?php  
				if($_GET["accion"] == "baja") {

					// Conexión con PDO a la base de datos para recoger los registros de la tabla artículos
					$con = conexion("localhost", "examen_febrero", "root", "");
					$select = sentencias($con, 'SELECT codArt FROM articulos');

					while ($fila = $select->fetch()) {
						echo $fila[0].' <a href="accesoDatos.php?codArt='.$fila[0].'">Eliminar</a><br>';   
					}

					cerrar($con);
				}
		 	?>

		 	<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		 	<!-- En caso de que el link clicado en enlaces.php sea "PEDIDOS" -->

		 	<?php  
				if($_GET["accion"] == "pedido") {
		 	?>

			<form action="accesoDatos.php" method="POST">

				<?php

					// Creamos los campos de pedido con un for
					for ($i=0; $i < 5; $i++) { 
						echo '<p>Teclea cod_articulo: <input type="number" name="codArt_'.$i.'"> Teclea cantidad: <input type="number" name="cantidad_'.$i.'"></p>';
					}
				 ?>
				 <br>
				<input type="submit" name="submit_pedido">
			</form>

			<?php
				}
		 	?>

			<br><br><a href="enlaces.php">Menú principal</a>
		 	
		</body>
		</html>

 <?php
	} else {

		// En caso de acceder directamente a fichero.php, nos redirecciona a enlaces.php
		header('Location: enlaces.php');
	}
 ?>