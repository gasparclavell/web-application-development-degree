/*Cuando la página web esté lista*/
$(document).ready(function() {

	/*Evitamos que puedan introducirse cifras negativas en los campos numéricos*/
	$('input').bind('keypress', function(e) {
	    if(e.keyCode == 45){
	        return false;
	    }
	});

	/*Evitamos que el usuario pueda introducir sólo 0 y una cifra superior a 99.99*/
	$("input").on("keypress", function(e){
	    var currentValue = String.fromCharCode(e.which);
	    var finalValue = $(this).val() + currentValue;
	    if(finalValue > 99.99 || finalValue == 0) {
	        e.preventDefault();
	    }
	});

	var time = 0; // 300
	var margin = -60;

	/*Función para animar la aparición de las tarjetas*/
	function myFade(shapeId, del) {
		$(shapeId).css("opacity", "1.0");
		$(shapeId).hide();
		/*$(shapeId).css("marginTop", margin + "px")*/;
		$(shapeId).delay(del).fadeIn({queue: false, duration: time + 200}); // 200
		/*$(shapeId).animate({ marginTop: "0" }, time);*/
	}

	/*Aparición de los títulos*/
	$("#title-container_1").css("opacity", "1.0");
	$("#title-container_1").hide();
	$("#title-container_1").fadeIn(200);

	$("#title-container_2").css("opacity", "1.0");
	$("#title-container_2").hide();
	$("#title-container_2").fadeIn(200); // 600

	/*Aparición de las tarjetas*/
	myFade("#triangle-card-aux", 0);
	myFade("#square-card-aux", 100);
	myFade("#rectangle-card-aux", 200);
	myFade("#rhombus-card-aux", 0);
	myFade("#rhomboid-card-aux", 100);
	myFade("#trapezoid-card-aux", 200);
	myFade("#pentagon-card-aux", 0);
	myFade("#hexagon-card-aux", 100);

	myFade("#circle-card-aux", 0);
	myFade("#ellipse-card-aux", 100);

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Triángulo*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var triangle_b = "b";
	var triangle_h = "h";
	var triangle_a = "a";
	var triangle_c = "c";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#triangle-b").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			triangle_b = round(elem.val());
		} else {
			triangle_b = "b";					
		}

		triangleArea();
		trianglePerimeter();
		calculateLastSide();
	});
	$("#triangle-h").on('input', function() {

		var elem = $(this);
		if(elem.val() != "") {
			triangle_h = round(elem.val());
		} else {
			triangle_h = "h";					
		}

		triangleArea();
		trianglePerimeter();
		calculateLastSide();
	});
	$("#triangle-a").on('input', function() {

		var elem = $(this);
		if(elem.val() != "") {
			triangle_a = round(elem.val());
		} else {
			triangle_a = "a";					
		}

		triangleArea();
		trianglePerimeter();
		calculateLastSide();
	});
	$("#triangle-c").on('input', function() {

		var elem = $(this);
		if(elem.val() != "") {
			triangle_c = round(elem.val());
		} else {
			triangle_c = "c";					
		}

		triangleArea();
		trianglePerimeter();
		calculateLastSide();
	});

	function triangleArea() {

		/*Reescribimos la ecuación del área*/
		$("#triangle-area").text("$${" + triangle_b + " · " + triangle_h + " \\over 2}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(triangle_b != "b" && triangle_h != "h") {
			var triangle_area = (triangle_b * triangle_h)/2;
			var triangle_area_round = round(triangle_area);
			$("#triangle-area-result").text(triangle_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#triangle-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function trianglePerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#triangle-perimeter").text("$${" + triangle_a + " + " + triangle_b + " + " + triangle_c + "}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(triangle_a != "a" && triangle_b != "b" && triangle_c != "c") {
			var triangle_perimeter = parseFloat(triangle_a) + parseFloat(triangle_b) + parseFloat(triangle_c);
			var triangle_perimeter_round = round(triangle_perimeter);
			$("#triangle-perimeter-result").text(triangle_perimeter_round + " u");

			/*Obtener la altura a partir de los tres lados*/
			var over_2 = triangle_perimeter / 2;
			var triangle_area_2 = Math.sqrt(over_2 * (over_2 - triangle_a) * (over_2 - triangle_a) * (over_2 - triangle_c));
			var triangle_area_round_2 = round(triangle_area_2);
			$("#triangle-area-result").text(triangle_area_round_2 + " u").append('<sup>2</sup>');
			triangle_h = round((2*triangle_area_2)/triangle_b);
			
			if(triangle_h == 0 || isNaN(triangle_h)) {
				$("#triangle-error").css("opacity", "0.7");
				triangle_h = "h";
				$("#triangle-h").val(triangle_h);
			} else {
				$("#triangle-error").css("opacity", "0");
				$("#triangle-h").val(round(triangle_h));
			}

			triangleArea();
		}
		refreshMath();
	}

	/*function calculateLastSide() {

		var is_side_a = false;
		var is_side_b = false;
		var is_side_c = false;
		var is_height = false;
		var three_values = false;

		if($("#triangle-a").val() != ""){
			is_side_a = true;
		} else {
			is_side_a = false;
		}

		if($("#triangle-b").val() != ""){
			is_side_b = true;
		} else {
			is_side_b = false;
		}

		if($("#triangle-c").val() != ""){
			is_side_c = true;
		} else {
			is_side_c = false;
		}

		if($("#triangle-h").val() != ""){
			is_height = true;
		} else {
			is_height = false;
		}

		if(is_side_a && is_side_b && is_height || is_side_a && is_side_c && is_height || is_side_c && is_side_b && is_height ) {
			three_values = true;
		} else {
			three_values = false;
		}

		if(three_values) {
			if(!is_side_a) {

				triangle_a = triangle_area;
				alert();
				$("#triangle-a").val(round(triangle_a));
				trianglePerimeter();
			}
			if(!is_side_b) {

			}
			if(!is_side_c) {

			}
		}
	}*/

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Cuadrado*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var square_l = "l";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#square-l").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			square_l = round(elem.val());
		} else {
			square_l = "l";					
		}

		squareArea();
		squarePerimeter();
	});

	function squareArea() {

		/*Reescribimos la ecuación del área*/
		$("#square-area").text("$${" + square_l + "^2}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(square_l != "l") {
			var square_area = square_l * square_l;
			var square_area_round = round(square_area);
			$("#square-area-result").text(square_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#square-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function squarePerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#square-perimeter").text("$${" + square_l + " · 4}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(square_l != "l") {
			var square_perimeter = parseFloat(square_l) * 4;
			var square_perimeter_round = round(square_perimeter);
			$("#square-perimeter-result").text(square_perimeter_round + " u");
		} else {
			$("#square-perimeter-result").text("... u");
		}
		refreshMath();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Rectángulo*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var rectangle_b = "b";
	var rectangle_h = "h";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#rectangle-b").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			rectangle_b = round(elem.val());
		} else {
			rectangle_b = "b";					
		}

		rectangleArea();
		rectanglePerimeter();
	});
	$("#rectangle-h").on('input', function() {

		var elem = $(this);			
		if(elem.val() != "") {
			rectangle_h = round(elem.val());
		} else {
			rectangle_h = "h";					
		}

		rectangleArea();
		rectanglePerimeter();
	});

	function rectangleArea() {

		/*Reescribimos la ecuación del área*/
		$("#rectangle-area").text("$${" + rectangle_b + " · " + rectangle_h + "}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(rectangle_b != "b" && rectangle_h != "h") {
			var rectangle_area = rectangle_b * rectangle_h;
			var rectangle_area_round = round(rectangle_area);
			$("#rectangle-area-result").text(rectangle_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#rectangle-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function rectanglePerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#rectangle-perimeter").text("$${2(" + rectangle_b + " + " + rectangle_h + ")}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(rectangle_b != "b" && rectangle_h != "h") {
			var rectangle_perimeter = 2*(parseFloat(rectangle_b) + parseFloat(rectangle_h));
			var rectangle_perimeter_round = round(rectangle_perimeter);
			$("#rectangle-perimeter-result").text(rectangle_perimeter_round + " u");
		} else {
			$("#rectangle-perimeter-result").text("... u");
		}
		refreshMath();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Rombo*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var rhombus_ac = "AC";
	var rhombus_bd = "BD";
	var rhombus_l = "l";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#rhombus-ac").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			rhombus_ac = round(elem.val());
		} else {
			rhombus_ac = "AC";					
		}

		rhombusArea();
		rhombusPerimeter();
	});
	$("#rhombus-bd").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			rhombus_bd = round(elem.val());
		} else {
			rhombus_bd = "BD";					
		}

		rhombusArea();
		rhombusPerimeter();
	});
	$("#rhombus-l").on('input', function() {

		var elem = $(this);		
		if(elem.val() != "") {
			rhombus_l = round(elem.val());
		} else {
			rhombus_l = "l";					
		}

		rhombusArea();
		rhombusPerimeter();
	});

	function rhombusArea() {

		/*Reescribimos la ecuación del área*/
		if(rhombus_ac != "AC" && rhombus_bd != "BD") {
			$("#rhombus-area").text("$${{" + rhombus_ac + "}·{" + rhombus_bd + "} \\over 2}$$");
			$(".division_plus").css("margin-top", "-8px");
		} else if(rhombus_ac == "AC" && rhombus_bd != "BD") {
			$("#rhombus-area").text("$${\\overline{" + rhombus_ac + "}·{" + rhombus_bd + "} \\over 2}$$");
			$("#rhombus-area").css("margin-top", "-14px");
		} else if(rhombus_ac != "AC" && rhombus_bd == "BD") {
			$("#rhombus-area").text("$${{" + rhombus_ac + "}·\\overline{" + rhombus_bd + "} \\over 2}$$");
			$("#rhombus-area").css("margin-top", "-14px");
		} else {
			$("#rhombus-area").text("$${\\overline{" + rhombus_ac + "}·\\overline{" + rhombus_bd + "} \\over 2}$$");
			$("#rhombus-area").css("margin-top", "-14px");
		}

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(rhombus_ac != "AC" && rhombus_bd != "BD") {
			var rhombus_area = (parseFloat(rhombus_ac) * parseFloat(rhombus_bd))/2;
			var rhombus_area_round = round(rhombus_area);
			$("#rhombus-area-result").text(rhombus_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#rhombus-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function rhombusPerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#rhombus-perimeter").text("$${" + rhombus_l + " · 4}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(rhombus_l != "l") {
			var rhombus_perimeter = parseFloat(rhombus_l) * 4;
			var rhombus_perimeter_round = round(rhombus_perimeter);
			$("#rhombus-perimeter-result").text(rhombus_perimeter_round + " u");
		} else {
			$("#rhombus-perimeter-result").text("... u");
		}
		refreshMath();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Romboide*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var rhomboid_b = "b";
	var rhomboid_h = "h";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#rhomboid-b").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			rhomboid_b = round(elem.val());
		} else {
			rhomboid_b = "b";					
		}

		rhomboidArea();
		rhomboidPerimeter();
	});
	$("#rhomboid-h").on('input', function() {

		var elem = $(this);			
		if(elem.val() != "") {
			rhomboid_h = round(elem.val());
		} else {
			rhomboid_h = "h";					
		}

		rhomboidArea();
		rhomboidPerimeter();
	});

	function rhomboidArea() {

		/*Reescribimos la ecuación del área*/
		$("#rhomboid-area").text("$${" + rhomboid_b + " · " + rhomboid_h + "}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(rhomboid_b != "b" && rhomboid_h != "h") {
			var rhomboid_area = rhomboid_b * rhomboid_h;
			var rhomboid_area_round = round(rhomboid_area);
			$("#rhomboid-area-result").text(rhomboid_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#rhomboid-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function rhomboidPerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#rhomboid-perimeter").text("$${2(" + rhomboid_b + " + " + rhomboid_h + ")}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(rhomboid_b != "b" && rhomboid_h != "h") {
			var rhomboid_perimeter = 2*(parseFloat(rhomboid_b) + parseFloat(rhomboid_h));
			var rhomboid_perimeter_round = round(rhomboid_perimeter);
			$("#rhomboid-perimeter-result").text(rhomboid_perimeter_round + " u");
		} else {
			$("#rhomboid-perimeter-result").text("... u");
		}
		refreshMath();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Trapecio*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var trapezoid_h = "h";
	var trapezoid_a = "a";
	var trapezoid_b = "b";
	var trapezoid_c = "c";
	var trapezoid_d = "d";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#trapezoid-h").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			trapezoid_h = round(elem.val());
		} else {
			trapezoid_h = "h";					
		}

		trapezoidArea();
		trapezoidPerimeter();
	});
	$("#trapezoid-a").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			trapezoid_a = round(elem.val());
		} else {
			trapezoid_a = "a";					
		}

		trapezoidArea();
		trapezoidPerimeter();
	});
	$("#trapezoid-b").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			trapezoid_b = round(elem.val());
		} else {
			trapezoid_b = "b";					
		}

		trapezoidArea();
		trapezoidPerimeter();
	});
	$("#trapezoid-c").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			trapezoid_c = round(elem.val());
		} else {
			trapezoid_c = "c";					
		}

		trapezoidArea();
		trapezoidPerimeter();
	});
	$("#trapezoid-d").on('input', function() {

		var elem = $(this);
		if(elem.val() != "") {
			trapezoid_d = round(elem.val());
		} else {
			trapezoid_d = "d";					
		}

		trapezoidArea();
		trapezoidPerimeter();
	});

	function trapezoidArea() {

		/*Reescribimos la ecuación del área*/
		$("#trapezoid-area").text("$${" + trapezoid_h + "·{" + trapezoid_a + " + " + trapezoid_b + " \\over 2}}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(trapezoid_h != "h" && trapezoid_a != "a" && trapezoid_b != "b") {
			var trapezoid_area = parseFloat(trapezoid_h) * ((parseFloat(trapezoid_a) + parseFloat(trapezoid_b))/2);
			var trapezoid_area_round = round(trapezoid_area);
			$("#trapezoid-area-result").text(trapezoid_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#trapezoid-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function trapezoidPerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#trapezoid-perimeter").text("$${" + trapezoid_a + " + " + trapezoid_b + " + " + trapezoid_c + " + " + trapezoid_d + "}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(trapezoid_a != "a" && trapezoid_b != "b" && trapezoid_c != "c" && trapezoid_d != "d") {
			var trapezoid_perimeter = parseFloat(trapezoid_a) + parseFloat(trapezoid_b) + parseFloat(trapezoid_c) + parseFloat(trapezoid_d);
			var trapezoid_perimeter_round = round(trapezoid_perimeter);
			$("#trapezoid-perimeter-result").text(trapezoid_perimeter_round + " u");
		} else {
			$("#trapezoid-perimeter-result").text("... u");
		}
		refreshMath();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Pentágono*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var pentagon_l = "l";
	var pentagon_a = "a";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#pentagon-l").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			pentagon_l = round(elem.val());

			/*El valor del apotema varía en función del lado*/
			var pentagon_apothem = round(pentagon_l / (2 * Math.tan(36 * (Math.PI/180))));
			pentagon_a = pentagon_apothem;
			$("#pentagon-a").val(pentagon_apothem);
		} else {
			pentagon_l = "l";					
		}

		pentagonArea();
		pentagonPerimeter();
	});
	$("#pentagon-a").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			pentagon_a = round(elem.val());

			/*El valor del lado varía en función del apotema*/
			var pentagon_side = round(pentagon_a * (2 * Math.tan(36 * (Math.PI/180))));
			pentagon_l = pentagon_side;
			$("#pentagon-l").val(pentagon_side);
		} else {
			pentagon_a = "a";					
		}

		pentagonArea();
		pentagonPerimeter();
	});

	function pentagonArea() {

		/*Reescribimos la ecuación del área*/
		$("#pentagon-area").text("$${" + pentagon_l + "·5·" + pentagon_a + " \\over 2}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(pentagon_l != "l" && pentagon_a != "a") {
			var pentagon_area = (pentagon_l * 5 * pentagon_a)/2;
			var pentagon_area_round = round(pentagon_area);
			$("#pentagon-area-result").text(pentagon_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#pentagon-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function pentagonPerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#pentagon-perimeter").text("$${" + pentagon_l + " · 6}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(pentagon_l != "l") {
			var pentagon_perimeter = parseFloat(pentagon_l) * 6;
			var pentagon_perimeter_round = round(pentagon_perimeter);
			$("#pentagon-perimeter-result").text(pentagon_perimeter_round + " u");
		} else {
			$("#pentagon-perimeter-result").text("... u");
		}
		refreshMath();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Hexágono*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var hexagon_l = "l";
	var hexagon_a = "a";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#hexagon-l").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			hexagon_l = round(elem.val());

			/*El valor del apotema varía en función del lado*/
			var hexagon_apothem = round(hexagon_l / (2 * Math.tan(30  * (Math.PI/180))));
			hexagon_a = hexagon_apothem;
			$("#hexagon-a").val(hexagon_apothem);
		} else {
			hexagon_l = "l";					
		}

		hexagonArea();
		hexagonPerimeter();
	});
	$("#hexagon-a").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			hexagon_a = round(elem.val());

			/*El valor del lado varía en función del apotema*/
			var hexagon_side = round(hexagon_a * (2 * Math.tan(30 * (Math.PI/180))));
			hexagon_l = hexagon_side;
			$("#hexagon-l").val(hexagon_side);
		} else {
			hexagon_a = "a";					
		}

		hexagonArea();
		hexagonPerimeter();
	});

	function hexagonArea() {

		/*Reescribimos la ecuación del área*/
		$("#hexagon-area").text("$${" + hexagon_l + "·6·" + hexagon_a + " \\over 2}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(hexagon_l != "l" && hexagon_a != "a") {
			var hexagon_area = (hexagon_l * 6 * hexagon_a)/2;
			var hexagon_area_round = round(hexagon_area);
			$("#hexagon-area-result").text(hexagon_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#hexagon-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function hexagonPerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#hexagon-perimeter").text("$${" + hexagon_l + " · 6}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(hexagon_l != "l") {
			var hexagon_perimeter = parseFloat(hexagon_l) * 6;
			var hexagon_perimeter_round = round(hexagon_perimeter);
			$("#hexagon-perimeter-result").text(hexagon_perimeter_round + " u");
		} else {
			$("#hexagon-perimeter-result").text("... u");
		}
		refreshMath();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Círculo*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var circle_r = "r";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#circle-r").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			circle_r = round(elem.val());
		} else {
			circle_r = "r";					
		}

		circleArea();
		circlePerimeter();
	});

	function circleArea() {

		/*Reescribimos la ecuación del área*/
		$("#circle-area").text("$${π·" + circle_r + "^2}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(circle_r != "r") {
			var circle_area = Math.PI * parseFloat(circle_r) * parseFloat(circle_r);
			var circle_area_round = round(circle_area);
			$("#circle-area-result").text(circle_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#circle-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function circlePerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#circle-perimeter").text("$${2·π·" + circle_r + "}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(circle_r != "r") {
			var circle_perimeter = 2 * Math.PI * parseFloat(circle_r);
			var circle_perimeter_round = round(circle_perimeter);
			$("#circle-perimeter-result").text(circle_perimeter_round + " u");
		} else {
			$("#circle-perimeter-result").text("... u");
		}
		refreshMath();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*Elipse*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Variables*/
	var ellipse_a = "a";
	var ellipse_b = "b";

	/*Cada vez que modificamos el valor de una de sus variables*/
	$("#ellipse-a").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			ellipse_a = round(elem.val());
		} else {
			ellipse_a = "a";					
		}

		ellipseArea();
		ellipsePerimeter();
	});
	$("#ellipse-b").on('input', function() {

		var elem = $(this);				
		if(elem.val() != "") {
			ellipse_b = round(elem.val());
		} else {
			ellipse_b = "b";					
		}

		ellipseArea();
		ellipsePerimeter();
	});

	function ellipseArea() {

		/*Reescribimos la ecuación del área*/
		$("#ellipse-area").text("$${π·" + ellipse_a + "·" + ellipse_b + "}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el área*/
		if(ellipse_a != "a" && ellipse_b != "b") {
			var ellipse_area = Math.PI * parseFloat(ellipse_a) * parseFloat(ellipse_b);
			var ellipse_area_round = round(ellipse_area);
			$("#ellipse-area-result").text(ellipse_area_round + " u").append('<sup>2</sup>');
		} else {
			$("#ellipse-area-result").text("... u").append('<sup>2</sup>');
		}
		refreshMath();
	}

	function ellipsePerimeter() {

		/*Reescribimos la ecuación del perímetro*/
		$("#ellipse-perimeter").text("$${2π\\sqrt{" + ellipse_a + "^2 + " + ellipse_b + "^2 \\over 2}}$$");

		/*Si todas las variables contienen un valor numérico, se calcula el perímetro*/
		if(ellipse_a != "a" && ellipse_b != "b") {
			var ellipse_perimeter = 2 * Math.PI * (Math.sqrt((Math.pow(parseFloat(ellipse_a), 2) + Math.pow(parseFloat(ellipse_b), 2))/2));
			var ellipse_perimeter_round = round(ellipse_perimeter);
			$("#ellipse-perimeter-result").text(ellipse_perimeter_round + " u");
		} else {
			$("#ellipse-perimeter-result").text("... u");
		}
		refreshMath();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*Función para refrescar las ecucaciones reescritas*/
	function refreshMath() {
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}

	/*Función para redondear a un decimal*/
	function round($num) {
		return Math.round($num * 10) / 10;
	}
	
});