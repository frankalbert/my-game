"use strict";
const cifrasNumero = 4,
  numeroGuardado = window.sessionStorage,
  numeroValidado = numeroGuardado.getItem("numero");

numeroValidado ? console.log(JSON.parse(numeroValidado)) : "";

document
  .querySelector("#guardarNumero")
  .addEventListener("click", guardarNumero);

function guardarNumero() {
  const numero = document.querySelector("#miNumero"),
    valorNumero = numero.value,
    tamanoNumero = numero.value.length;

  tamanoNumero !== 4 || !/^([0-9])*$/.test(valorNumero)
    ? (alert(
        "Por favor, debe introducir un número de " + cifrasNumero + " cifras"
      ),
      numero.focus())
    : Number(valorNumero[0]) === 0
      ? (alert("Su número no puede empezar por 0"),
        document.querySelector("#miNumero").focus())
      : recorrerNumero(tamanoNumero, valorNumero);

}

function recorrerNumero(tamanoNumero, valorNumero) {

  for(let i = 0; i < tamanoNumero; i++) {
    let contador = 0;
    var digitosRepetidos = false;
    for(let j = 0; j < tamanoNumero; j++){
      if(valorNumero[j] === valorNumero[i]){
        contador++;
      }
  
    }

    if(contador >= 2){
      digitosRepetidos = true;
      alert('Error, su número contiene dígitos repetidos');
      document.querySelector("#miNumero").focus();
      break;
    }

  } 

  confirmarNumero(digitosRepetidos, tamanoNumero, valorNumero)

}

function confirmarNumero(digitosRepetidos, tamanoNumero, valorNumero){
  if(!digitosRepetidos){
    numeroGuardado.setItem("numero", JSON.stringify(valorNumero));
    if(numeroGuardado.getItem("numero")) { 
      document.querySelector(".contenedor__datos__numero").innerHTML = "";
      document.querySelector("#contenido").innerHTML = `
          <h4>Mi N&uacute;mero es: ${JSON.parse(
              numeroGuardado.getItem("numero")
          )}</h4>
      `;
    };
  }
}