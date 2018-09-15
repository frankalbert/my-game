'use strict'
const cifrasNumero = 4,
numeroGuardado = window.sessionStorage,
numeroValidado = numeroGuardado.getItem("numero");

(numeroValidado) ? (console.log(JSON.parse(numeroValidado))) : "";


document.querySelector('#guardarNumero').addEventListener('click', guardarNumero);

function guardarNumero(){
    const entrada = document.querySelector('#miNumero'),
    entradaVal = entrada.value,
    entradaSize = entrada.value.length;
    

    ((entradaSize!== 4) || (!/^([0-9])*$/.test(entradaVal))) ? (
        alert('Por favor, debe introducir un número de' + cifrasNumero + 'cifras'),
        entrada.focus()
    ) : (
        recorrerNumero(entradaSize, entradaVal)
    )

    function recorrerNumero(largoCadena, valorCadena){
    
        //for (let i = 0; i < largoCadena; i++){
            if(Number(valorCadena[0]) === 0) {
                console.log('Su número no puede empezar por 0');
                entrada.focus();
                return false;
            } else{
                numeroGuardado.setItem("numero", JSON.stringify(valorCadena));
                for (let i = 0; i < largoCadena; i++){
                    console.log(valorCadena[i]);
                }
                //console.log(valorCadena[i]);
            }
            
        //}
        
    }

}