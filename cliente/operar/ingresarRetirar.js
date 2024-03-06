import enviarMensaje from "./mensajes.js";

export function ingresar(user, token, e) {
    const ingreso = Number(document.getElementById('ingreso').value)
    const btnLogin = document.querySelector('.btn-login')
    console.log(ingreso)
    const ingresarUrl = `http://localhost:4000/movements?token=${token}`
    console.log('desde ingresar', e, ingreso, user);
    const movement = {
        amount: ingreso,
        date: new Date().toISOString()
    }


    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movement) // Convertir el objeto a formato JSON
    };

    // Realizar la solicitud fetch al servidor
    fetch(ingresarUrl, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de red');
            }
            return response.json(); // Parsear la respuesta JSON
        })
        .then(data => {
            // Manejar la respuesta del servidor
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    btnLogin.click()
}
export function retirar(user, token, e) {
    const btnLogin = document.querySelector('.btn-login')
    const saldo = document.querySelector('.saldo').textContent
 
    let retirada = document.getElementById('retirada')
    console.log(saldo, retirada)
    //COMPROBACION DE SALDO
    if (Number(saldo) < Number(retirada.value)) {
        console.log('no hayt')
        enviarMensaje(`no dispones de saldo,tienes ${saldo}`)
        retirada.value =''
        return;
    }


    const retirarUrl = `http://localhost:4000/movements?token=${token}`
    const ingresoObj = {
        amount: -parseInt(retirada),
        date: new Date().toISOString()
    }
    console.log('desde retirar', e, retirada, user);

    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingresoObj) // Convertir el objeto a formato JSON
    };

    // Realizar la solicitud fetch al servidor
    fetch(retirarUrl, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de red');
            }
            return response.json(); // Parsear la respuesta JSON
        })
        .then(data => {
            // Manejar la respuesta del servidor
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    btnLogin.click()
}