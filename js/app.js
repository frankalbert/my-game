'use strict'
const cifrasNumero = 4,
numeroGuardado = window.sessionStorage,
numeroValidado = numeroGuardado.getItem("numero");

(numeroValidado) ? (console.log(JSON.parse(numeroValidado))) : "";


document.querySelector('#guardarNumero').addEventListener('click', guardarNumero);

if(numeroValidado) {
    document.querySelector('.contenedor__datos__numero').innerHTML = '';
    document.querySelector('#contenido').innerHTML = `
        <h4>Mi N&uacute;mero es: ${JSON.parse(numeroGuardado.getItem("numero"))}</h4>
    `
}

function guardarNumero(){
    const entrada = document.querySelector('#miNumero'),
    entradaVal = entrada.value,
    entradaSize = entrada.value.length;
    
    ((entradaSize !== 4) || (!/^([0-9])*$/.test(entradaVal))) ? (
        alert('Por favor, debe introducir un número de' + cifrasNumero + 'cifras'),
        entrada.focus()
    ) : (
        recorrerNumero(entradaSize, entradaVal)
    )

    function recorrerNumero(largoCadena, valorCadena){
    
        //for (let i = 0; i < largoCadena; i++){
            if(Number(valorCadena[0]) === 0) {
                alert('Su número no puede empezar por 0');
                entrada.focus();
                return false;
            } else{
                numeroGuardado.setItem("numero", JSON.stringify(valorCadena));
                if(numeroGuardado.getItem("numero")) {
                    document.querySelector('.contenedor__datos__numero').innerHTML = '';
                    document.querySelector('#contenido').innerHTML = `
                        <h4>Mi N&uacute;mero es: ${JSON.parse(numeroGuardado.getItem("numero"))}</h4>
                    `
                }
                
                for (let i = 0; i < largoCadena; i++){
                    if(numeroGuardado.getItem("numero").indexOf(valorCadena[i]) === -1){
                        alert();
                    }else{
                        console.log(valorCadena[i]);
                    }
                   
                }    
                        
                //console.log(valorCadena[i]);
            }
            
        //}
        
    }

}