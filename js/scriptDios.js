var abiertos = 0;
var p1, p2;
var parejas = 0;
var seleccionadas = [];
var fallos = 0;

const NOMBRES = ["frodo", "sam", "gandalf", "arwen", "aragorn", "legolas", "gimli", "gollum", "eowyn", "faramir", "boromir", "galadriel"];
var num;
var repetido = 0;

//función para asignar aleatoriamente los nombres de las clases
function asignarClases() {
    for (let i = 0; i < 24; i++) {
        do {
            repetido = 0;
            num = Math.floor(Math.random() * 12);
            //este bucle comprueba que el nombre no esté repetido más de una vez entre las imágenes
            //a las que ya les hemos asignado la clase
            for (let j = 0; j < i; j++) {
                if (NOMBRES[num] == document.getElementsByTagName("img")[j].classList[1]) {
                    repetido++;
                    if (repetido >= 2) {
                        break;
                    }
                }
            }
        } while (repetido >= 2);
        //una vez sabemos que no está repetido, asignamos el nombre del personaje como clase
        document.getElementsByTagName("img")[i].classList.add(NOMBRES[num]);
    }
}

//llamamos a la función
asignarClases();

for (let i = 0; i < 24; i++) {
    document.getElementsByTagName("img")[i].onclick = function () {
        //solo se puede hacer click a la imagen si faltan parejas por encontrar
        //y si la imagen clickada no tiene pareja (le falta la clase "emparejada")
        if (parejas < 12 && document.getElementsByTagName("img")[i].classList.length < 3) {
            //guardo en un array las dos imágenes seleccionadas para que no se "pueda"
            //hacer click dos veces seguidas a la misma imagen
            seleccionadas[abiertos] = document.getElementsByTagName("img")[i];
            if (seleccionadas[0] != seleccionadas[1]) {
                if (abiertos == 0) {
                    //extraigo la primera clase, que es la que lleva el nombre del personaje
                    p1 = document.getElementsByTagName("img")[i].classList[1];
                    //cambio el src usando el nombre de la clase para que se revele el personaje correspondiente
                    document.getElementsByTagName("img")[i].src = "img/" + p1 + ".png";
                    abiertos++;
                } else if (abiertos == 1) {
                    //extraigo la primera clase, que es la que lleva el nombre del personaje
                    p2 = document.getElementsByTagName("img")[i].classList[1];
                    //cambio el src usando el nombre de la clase para que se revele el personaje correspondiente
                    document.getElementsByTagName("img")[i].src = "img/" + p2 + ".png";
                    abiertos++;

                    if (p1 == p2) {
                        abiertos = 0;
                        parejas++;
                        document.getElementById("contadorParejas").textContent = parejas;
                        document.getElementsByClassName(p1)[0].classList.add("emparejada");
                        document.getElementsByClassName(p1)[1].classList.add("emparejada");
                        //Necesito este timeout porque, si no, salta el alert antes de que cambie el src
                        if (parejas == 12) {
                            setTimeout(() => {
                                alert("¡Enhorabuena! Has completado el memory nivel Dios.");
                            }, 200)
                        }
                    } else {
                        fallos++;
                        setTimeout(() => {
                            abiertos = 0;
                            document.getElementById("intentosFallidos").textContent = fallos;
                            document.getElementsByClassName(p1)[0].src = "img/logo3.png";
                            document.getElementsByClassName(p1)[1].src = "img/logo3.png";
                            document.getElementsByClassName(p2)[0].src = "img/logo3.png";
                            document.getElementsByClassName(p2)[1].src = "img/logo3.png";
                        }, 500);
                    }
                    //Hay que "reiniciar" las seleccionadas porque, si no, no se puede volver a hacer
                    //click a la misma justo después de comprobarla
                    seleccionadas[0] = null;
                    seleccionadas[1] = null;
                }
            }
        }
    }
}

//función del botón volver
document.getElementById("volver").onclick = function () {
    window.location.href = "index.html";
}

//función del botón reiniciar
document.getElementById("reiniciar").onclick = function () {
    window.location.reload();
}