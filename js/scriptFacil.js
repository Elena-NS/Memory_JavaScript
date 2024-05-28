var abiertos = 0;
var p1, p2;
var parejas = 0;
var seleccionadas = [];

for (let i = 0; i < 12; i++) {
    document.getElementsByTagName("img")[i].onclick = function () {
        //solo se puede hacer click a la imagen si faltan parejas por encontrar
        //y si la imagen clickada no tiene pareja (le falta la clase "emparejada")
        if (parejas < 6 && document.getElementsByTagName("img")[i].classList.length < 3) {
            //guardo en un array las dos imágenes seleccionadas para que no se "pueda"
            //hacer click dos veces seguidas a la misma imagen
            seleccionadas[abiertos] = document.getElementsByTagName("img")[i];
            if (seleccionadas[0] != seleccionadas[1]) {
                if (abiertos == 0) {
                    //extraigo la primera clase, que es la que lleva el nombre del personaje
                    p1 = document.getElementsByTagName("img")[i].classList[0];
                    //cambio el src usando el nombre de la clase para que se revele el personaje correspondiente
                    document.getElementsByTagName("img")[i].src = "img/" + p1 + ".png";
                    abiertos++;
                } else if (abiertos == 1) {
                    //extraigo la primera clase, que es la que lleva el nombre del personaje
                    p2 = document.getElementsByTagName("img")[i].classList[0];
                    //cambio el src usando el nombre de la clase para que se revele el personaje correspondiente
                    document.getElementsByTagName("img")[i].src = "img/" + p2 + ".png";
                    abiertos++;

                    if (p1 == p2) {
                        abiertos = 0;
                        parejas++;
                        document.getElementsByClassName(p1)[0].style.background = "rgba(255, 192, 203, 0.486)";
                        document.getElementsByClassName(p1)[0].classList.add("emparejada");
                        document.getElementsByClassName(p1)[1].style.background = "rgba(255, 192, 203, 0.486)";
                        document.getElementsByClassName(p1)[1].classList.add("emparejada");
                        //Necesito este timeout porque, si no, salta el alert antes de que cambie el src
                        if (parejas == 6) {
                            setTimeout(() => {
                                alert("¡Enhorabuena! Has completado el memory nivel fácil.");
                            }, 200)
                        }
                    } else {
                        setTimeout(() => {
                            abiertos = 0;
                            document.getElementsByClassName(p1)[0].src = "img/logo.png";
                            document.getElementsByClassName(p1)[1].src = "img/logo.png";
                            document.getElementsByClassName(p2)[0].src = "img/logo.png";
                            document.getElementsByClassName(p2)[1].src = "img/logo.png";
                        }, 1500);
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