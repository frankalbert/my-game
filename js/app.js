"use strict";
const cifrasNumero = 4,
  numeroGuardado = window.sessionStorage,
  numeroValidado = numeroGuardado.getItem("numero");

  let registroTiradas = [];

numeroValidado ? console.log(JSON.parse(numeroValidado)) : "";

document
  .querySelector("#guardarNumero")
  .addEventListener("click", function(){
    comprobarNumero(1);
  });

function comprobarNumero(parametro) {
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
      : recorrerNumero(parametro, tamanoNumero, valorNumero);

}

function recorrerNumero(parametro, tamanoNumero, valorNumero) {

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

  if(parametro === 1){
    guardarNumero(digitosRepetidos, tamanoNumero, valorNumero)
  }else{
    comprobarTirada(digitosRepetidos, tamanoNumero, valorNumero)
  }

}

function guardarNumero(digitosRepetidos, tamanoNumero, valorNumero){
  if(!digitosRepetidos){
    numeroGuardado.setItem("numero", JSON.stringify(valorNumero));
    if(numeroGuardado.getItem("numero")) { 
      document.querySelector(".contenedor__datos__numero").innerHTML = "";
      document.querySelector("#contenido").innerHTML = `

        <h4>Mi N&uacute;mero es: ${JSON.parse(
            numeroGuardado.getItem("numero")
        )}</h4>

        <div class="contenedor__datos__numero">
            <input type="text" minlength="4" maxlength="4" class="entrada__numero elemento__formulario" id="miNumero" placeholder="Introduzca su tirada"
            />
            <button type="button" class="guardar__numero btn btn-primary elemento__formulario" id="realizarTirada">Realizar Tirada</button>
        </div>

        <div class="contenedor__tiradas w-100">

            <div class="contenedor__elemento__tirada contenedor--titulo--tiradas text-center">
                <h5>Registro de mis tiradas</h5>
            </div>

            <div class="contenedor__elemento__tirada contenedor--registro--tiradas">

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">tiradas</th>
                            <th scope="col">N&uacute;mero</th>
                            <th scope="col">Toro(s)</th>
                            <th scope="col">Vaca(s)</th>
                        </tr>
                    </thead>
                    <tbody id="contenido__registro__tiradas">

                    </tbody>
                </table>

            </div>

        </div>
        
     `;

      document.querySelector('#realizarTirada').addEventListener("click", function(){
        comprobarNumero(2);
      });
  
    };
  }
}

function comprobarTirada(digitosRepetidos, tamanoNumero, valorNumero){
  if(!digitosRepetidos){
    let numero = JSON.parse(numeroGuardado.getItem("numero")),
    contadorToros = 0,
    contadorVacas = 0;
    for(let i = 0; i < numero.length; i++){
        for(let j = 0; j < tamanoNumero; j++){
          if((numero[i] === valorNumero[j]) && (i === j)){
            contadorToros++
          }else if((numero[i] === valorNumero[j])){
            contadorVacas++
          }    
    
        }

    }
    
    registroTiradas.push({"numero" : valorNumero, "toros" : contadorToros, "vacas" : contadorVacas});

    listarTiradas(registroTiradas);
  }
}

function listarTiradas(registroTiradas){
  document.querySelector('#miNumero').value = "";

  let contenidoTirada = document.querySelector('#contenido__registro__tiradas');
  contenidoTirada.innerHTML = '';
  registroTiradas.map(function(res, indice){
    contenidoTirada.innerHTML += `
    
    <tr>
      <th scope="row">${indice + 1}</th>
      <th scope="row">${res.numero}</th>
      <td>${res.toros}</td>
      <td>${res.vacas}</td>
    </tr>

    `;
  })

}