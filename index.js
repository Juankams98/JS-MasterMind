// Inicio de variables
var n1 = 0;
var n2 = 0;
var n3 = 0;
var n4 = 0;
var muertos = 0;
var heridos = 0;
var nIntentos = 1;
var jsonobjeto;
var posicion = 0;
var puntosfinales = 0;
var segundos = 0;
window.onload = inicio;

function inicio() {

    window.setInterval(function() {
        segundos++;
    }, 1000);
    $(":image").css("display", "hidden");
    $("#scoreboard-container").hide();
    n1 = 0;
    n2 = 0;
    n3 = 0;
    n4 = 0;
    muertos = 0;
    heridos = 0;
    nIntentos = 1;
    //Se genera los cuatro numeros aleatorios
    n1 = Math.floor(Math.random() * 9);

    while (n2 == n1) {
        n2 = Math.floor(Math.random() * 9);
    }
    while (n3 == n2 || n3 == n1) {
        n3 = Math.floor(Math.random() * 9);
    }
    while (n4 == n3 || n4 == n2 || n4 == n1) {
        n4 = Math.floor(Math.random() * 9);
    }
    $("#respuesta").html(n1 + " " + n2 + " " + n3 + " " + n4);
}
//Funcion parpadeo de las alertas
function parpadear() { $('#alerta').fadeIn(500).delay(250).fadeOut(500, parpadear) }


function comprN() {
    $("#alerta").text("");
    var rn1 = $("#n1").val();
    var rn2 = $("#n2").val();
    var rn3 = $("#n3").val();
    var rn4 = $("#n4").val();
    //Comprobacion de que los numeros introducidos son correctos
    if ($.isNumeric(rn1) == false || $.isNumeric(rn2) == false || $.isNumeric(rn3) == false || $.isNumeric(rn4) == false) {
        $("#alerta").css("font-size", "16px");
        $("#alerta").text("LA COMPROBACION NO SE HA EJECUTADO PORQUE LOS VALORES NO SON CORRECTOS (SOLO NUMEROS DEL 1 AL 9) O ESTAN VACIOS");
        parpadear();
    } else {
        if (rn1 == rn2 || rn3 == rn4 || rn2 == rn3 || rn1 == rn4 || rn1 == rn3 || rn2 == rn4) {
            $("#alerta").css("font-size", "16px");
            $("#alerta").text("LA COMPROBACION NO SE HA EJECUTADO PORQUE NO PUEDE HABER NUMEROS IGUALES");
            parpadear();
        } else {
            if ($("#nick").val().length < 1 || $("#nick").val().length > 10) {
                $("#alerta").css("font-size", "16px");
                $("#alerta").text("EL NOMBRE NO PUEDE ESTAR EN BLANCO O TENER MAS DE 10 LETRAS");
                parpadear();
            } else {
                //Se comprueban los muertos y heridos
                if (rn1 == n1) {
                    muertos++;

                } else {
                    if (rn1 == n2 || rn1 == n3 || rn1 == n4) {
                        heridos++;
                    }
                }
                if (rn2 == n2) {
                    muertos++;
                } else {
                    if (rn2 == n1 || rn2 == n3 || rn2 == n4) {
                        heridos++;
                    }
                }
                if (rn3 == n3) {
                    muertos++;
                } else {
                    if (rn3 == n1 || rn3 == n2 || rn3 == n4) {
                        heridos++;
                    }
                }
                if (rn4 == n4) {
                    muertos++;
                } else {
                    if (rn4 == n1 || rn4 == n2 || rn4 == n3) {
                        heridos++;
                    }
                }

                //Se genera el intento en la lista de intentos
                $("#intentos").prepend("<p>Intento nº" + nIntentos + " con el numero <span>" + rn1 + rn2 + rn3 + rn4 + "</span> || Muertos: " + muertos + " Heridos: " + heridos + " </p>");
                //Comprueba si has ganado
                if (muertos == 4) {
                    puntosfinales = 10000 - nIntentos * 200 - segundos * 10;
                    if (puntosfinales < 0) {
                        puntosfinales = 0;
                    }
                    $("#tus-puntos").html(puntosfinales);
                    $.ajax({
                        url: "./puntuaciones.json",
                        dataType: "json",
                        success: function(data1) {
                            posicion = 0;
                            jsonobjeto = data1;
                            var nuevapuntuacion = Object();
                            nuevapuntuacion.nombre = $("#nick").val();
                            nuevapuntuacion.puntos = puntosfinales;

                            jsonobjeto.push(nuevapuntuacion);
                            jsonobjeto = jsonobjeto.sort(function(a, b) {
                                return (b.puntos - a.puntos)
                            })
                            var JsonString = JSON.stringify(jsonobjeto);
                            $.ajax({
                                type: "POST",
                                url: "./ladderboard.php",
                                data: {
                                    "json": JsonString
                                },
                                success: function(data) {}

                            });
                            $("table").empty();
                            $("table").append("<tr><td> Posicion </td><td> Nombre </td><td> Puntos </td><tr>");
                            for (let i = 0; i < 15; i++) {
                                posicion++;
                                var linea = "<tr><td>" + posicion + "</td><td>" + data1[i].nombre + "</td><td>" + data1[i].puntos + "</td><tr>"
                                $("table").append(linea);
                            }
                        }
                    });

                    $("#gamecontainer").hide();
                    $("#scoreboard-container").show();
                }
                muertos = 0;
                heridos = 0;
                nIntentos++;
            }
        }
    }
}

function cambiarnumero(input, operacion) {
    if (operacion == "sumar" && $("#" + input).val() < 9) {
        $("#" + input).val(parseInt($("#" + input).val()) + 1)
    }
    if (operacion == "sumar" && $.isNumeric($("#" + input).val()) == false) {
        $("#" + input).val(0)
    }
    if (operacion == "restar" && $("#" + input).val() > 0) {
        $("#" + input).val($("#" + input).val() - 1)
    }
    if (operacion == "restar" && $.isNumeric($("#" + input).val()) == false) {
        $("#" + input).val(9)
    }
}
//Funcion que reinicia el jeugo
function restart() {
    var rn1 = $("#n1").val("");
    var rn2 = $("#n2").val("");
    var rn3 = $("#n3").val("");
    var rn4 = $("#n4").val("");
    $("#intentos").empty();
    // $("#intcontainer").append("<p>Registro de intentos:</p>");
    $("#alerta").text("");
    $("#resultadof").text("");
    $("#homer").hide();
    inicio();
    $("#bcompr").removeAttr("disabled");
    $(".inputNumeros").removeAttr("disabled");
    $("#gamecontainer").show();
    $("#scoreboard-container").hide();
}