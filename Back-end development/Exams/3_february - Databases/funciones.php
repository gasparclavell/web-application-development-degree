<!-- Capa de abstracción -->

<?php 
	
	// Funciones PDO

	function conexion($host, $nomBaseDatos, $nomUsuario, $passUsuario) {
		try {

			$con = new PDO('mysql:host='.$host.';dbname='.$nomBaseDatos.'', $nomUsuario, $passUsuario);
			return $con;

		} catch(PDOException $e) {
			echo 'Error conectando con la base de datos: '.$e->getMessage();
		}
	}

	function sentencias($conexion, $sentencia) {

		try	{

	  		$con = $conexion;	  
	 		$stmt = $con->query($sentencia);
	 		return $stmt;
		}
		catch(PDOException $e) {
		  echo 'Error: '.$e->getMessage();
		}
	}

	function cerrar($conexion) {
		try	{
	  		return $conexion = null;
		}
		catch(PDOException $e) {
		  echo 'Error: '.$e->getMessage();
		}		
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// Funciones mysqli (no lograba procesar el resultado de la Select en PDO, al no poder consultar su sintaxis usé el fetch_array de mysqli)

	/*function conectarse($nombreServer, $nombreUsuario, $passUsuario, $nombreBaseDatos) {
		return mysqli_connect($nombreServer, $nombreUsuario, $passUsuario, $nombreBaseDatos); 
	}

	function hacerSelect($conexion, $sentencia) {		
		return mysqli_query($conexion, $sentencia);
	}

	function obtenerFila($resultado) {
		return mysqli_fetch_array($resultado);
	}

	function cerrarConexion($conexion) {
		return mysqli_close($conexion);
	}*/

 ?>