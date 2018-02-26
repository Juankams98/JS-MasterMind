// Inicio de variables
var n1 = 0;
var n2 = 0;
var n3 = 0;
var n4 = 0;
var muertos = 0;
var heridos = 0;
var nIntentos = 1;
window.onload = inicio;

function inicio() {
    $(":image").css("display", "hidden");
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
            $("#intcontainer").append("<p>Intento nº" + nIntentos + " con el numero <strong>" + rn1 + rn2 + rn3 + rn4 + "</strong> || Muertos: " + muertos + " Heridos: " + heridos + " </p>");
            //Comprueba si has ganado
            if (muertos == 4) {
                $("#alerta").text("HAS GANADO");
                $("#alerta").css("font-size", "40px");
                $("#homer").show();
                parpadear();
                $('#bcompr').attr("disabled", true);
                $('.inputNumeros').attr("disabled", true);
                $("#resultadof").text("Lo has logrado en " + nIntentos + " intentos");
            }
            muertos = 0;
            heridos = 0;
            nIntentos++;
        }
    }
}

function cambiarnumero(input, operacion) {

    if (input == "n1") {
        if (operacion == "sumar" && $("#n1").val() < 9) {
            $("#n1").val(parseInt($("#n1").val()) + 1)
        }
        if (operacion == "sumar" && $.isNumeric($("#n1").val()) == false) {
            $("#n1").val(9)
        }
        if (operacion == "restar" && $("#n1").val() > 0) {
            $("#n1").val($("#n1").val() - 1)
        }
        if (operacion == "restar" && $.isNumeric($("#n1").val()) == false) {
            $("#n1").val(1)
        }
    }

    if (input == "n2") {
        if (operacion == "sumar" && $("#n2").val() < 9) {
            $("#n2").val(parseInt($("#n2").val()) + 1)
        }
        if (operacion == "sumar" && $.isNumeric($("#n2").val()) == false) {
            $("#n2").val(9)
        }
        if (operacion == "restar" && $("#n2").val() > 0) {
            $("#n2").val($("#n2").val() - 1)
        }
        if (operacion == "restar" && $.isNumeric($("#n2").val()) == false) {
            $("#n2").val(1)
        }
    }

    if (input == "n3") {
        if (operacion == "sumar" && $("#n3").val() < 9) {
            $("#n3").val(parseInt($("#n3").val()) + 1)
        }
        if (operacion == "sumar" && $.isNumeric($("#n3").val()) == false) {
            $("#n3").val(9)
        }
        if (operacion == "restar" && $("#n3").val() > 0) {
            $("#n3").val($("#n3").val() - 1)
        }
        if (operacion == "restar" && $.isNumeric($("#n3").val()) == false) {
            $("#n3").val(1)
        }
    }

    if (input == "n4") {
        if (operacion == "sumar" && $("#n4").val() < 9) {
            $("#n4").val(parseInt($("#n4").val()) + 1)
        }
        if (operacion == "sumar" && $.isNumeric($("#n4").val()) == false) {
            $("#n4").val(9)
        }
        if (operacion == "restar" && $("#n4").val() > 0) {
            $("#n4").val($("#n4").val() - 1)
        }
        if (operacion == "restar" && $.isNumeric($("#n4").val()) == false) {
            $("#n4").val(1)
        }
    }
}
//Funcion que reinicia el jeugo
function restart() {
    var rn1 = $("#n1").val("");
    var rn2 = $("#n2").val("");
    var rn3 = $("#n3").val("");
    var rn4 = $("#n4").val("");
    $("#intcontainer").empty();
    $("#intcontainer").append("<p>Registro de intentos:</p>");
    $("#alerta").text("");
    $("#resultadof").text("");
    $("#homer").hide();
    inicio();
    $("#bcompr").removeAttr("disabled");
    $(".inputNumeros").removeAttr("disabled");
}