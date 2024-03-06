import { ingresar, retirar } from './operar/ingresarRetirar.js'
import enviarMensaje from './operar/mensajes.js'
import realizarTransferencia from './operar/transferir.js'
import solicitarCredito from './operar/solicitarCredito.js'

const btnLogin = document.querySelector('.btn-login')
const inputUser = document.querySelector('.input-user')
const inputPin = document.querySelector('.input-pin')

btnLogin.addEventListener('click', login)

//DATOS DEL USUARIO
const datosUsuarioEl = document.querySelector('.datos-usuario')
const nombreEl = document.querySelector('.nombre-usuario')
const usuarioEl = document.querySelector('.usuario')
const cuentaEl = document.querySelector('.cuenta-usuario')
const direccionEl = document.querySelector('.direccion-usuario')
const paisEl = document.querySelector('.pais-usuario')
const dniEl = document.querySelector('.dni-usuario')
const tipoEl = document.querySelector('.tipo-usuario')
//MOVIMIENTOS
const movimientosEl = document.querySelector('.movimientos')
const saldoEl = document.querySelector('.saldo')
//OPERAR
const operarEl = document.querySelector(".operar")
const ingresarBtn = document.getElementById("ingresarBtn")
const retirarBtn = document.getElementById("retirarBtn")
//TRANSFERENCIAS
const transferirBtn = document.getElementById('btn-transfer')
const transferirCuenta = document.getElementById('transferir-cuenta')
const transferirAmount = document.getElementById('amountTrans')
console.log(transferirAmount)
//MENSAJES
const mensaje = document.querySelector('.mensaje')
//SOLICITAR CREDITO
const solicitarCreditoBtn = document.querySelector('.form__btn--loan')
const montoCreditoEl=document.querySelector('.form__input--loan-amount')
//CANCELAR CUENTA
const cancelarBtn = document.querySelector('.cerrar-cuenta')



async function login() {
  operarEl.classList.remove('d-none')
  let user = inputUser.value
  let pin = inputPin.value
  const url = `http://localhost:4000/login?username=${user}&pin=${pin}`

  // Realizar la llamada fetch
  try {
    // Realizar la llamada fetch
    const response = await fetch(url)

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    // Parsear la respuesta como JSON
    const data = await response.json()

    // Manejar la respuesta
    console.log('Respuesta del servidor:', data.account)
    // Puedes realizar cualquier otra operación necesaria con los datos
    nombreEl.innerHTML = data.account.owner
    usuarioEl.innerHTML = data.account.username
    cuentaEl.innerHTML = data.account.numberAccount
    direccionEl.innerHTML = data.account.address
    paisEl.innerHTML = data.account.country
    dniEl.innerHTML = data.account.nationalIdNumber

    datosUsuarioEl.classList.remove('d-none')
    const movimientos = data.account.movements
    console.log(movimientos)

    displayMovements(movimientos)

    const amounts = movimientos.map((mov) => mov.amount)
    const balance = amounts.reduce((previous, current) => previous + current, 0)
    saldoEl.innerHTML = ` ${balance} `

    const token = data.token

    console.log(user, token)
    const usuario={ user : user , token : token , pin : pin }
    console.log(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario))

  } catch (error) {
    console.error('Hubo un error:', error)
    // Manejar errores aquí
  }
}

ingresarBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let user =JSON.parse( localStorage.getItem('usuario')).user
  let token=JSON.parse( localStorage.getItem('usuario')).token
  console.log(user,token)

  ingresar(user, token,e)
 
  
 
})
retirarBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let user =JSON.parse( localStorage.getItem('usuario')).user
  let token=JSON.parse( localStorage.getItem('usuario')).token
  retirar(user, token, e)
})

transferirBtn.addEventListener('click', (e) => {
  let user =JSON.parse( localStorage.getItem('usuario')).user
  let token=JSON.parse( localStorage.getItem('usuario')).token
  e.preventDefault()
  transferir(user, token, e)
})
cancelarBtn.addEventListener('click', (e) => {
   e.preventDefault()
  cancelarCuenta()
})
solicitarCreditoBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const monto=montoCreditoEl.value
  solicitarCredito(monto)
})
  //dado que no hay ningun requisito simplemente se informa de que queda registrada su solicitud y se le enviaun mensaje

function displayMovements(movimientos) {
  movimientosEl.innerHTML = ''
  movimientos.forEach(function (mov, i) {
    const type = mov.amount > 0 ? 'deposit' : 'withdrawal'
    const html = `
        <div class="movements__row d-flex justify-content-around ">
        <span class="fs-5 text-info me-1">${i + 1} </span><div class="movements__type movements__type--${type} "> ${type}</div>
          <div class="d-flex flex-column ">
              <div class="movements__value">${mov.amount}€</div>
              <div class="date">${mov.date.slice(0, 10)}</div>
          </div>
        </div>
      `
    movimientosEl.insertAdjacentHTML('afterbegin', html)
  })
}

function transferir(user, token) {

  const transferAmount = Number(transferirAmount.value)
  console.log(transferirCuenta)

  const transferTo = transferirCuenta.value


  console.log(user, transferAmount, token, transferTo)

  if (validateAccountNumber(transferTo)) {
    console.log('Account number is valid.emisor:', user)
  } else {
    console.log('Account number is invalid.')
  }

  realizarTransferencia(transferAmount, transferTo, user, token)


  console.log(
    'Se ha intentado realizar una transacción',
    transferTo,
    transferAmount,
  )
}

function validateAccountNumber(accountNumber) {
  // Check if the account number is 8 digits long
  if (accountNumber.length === 8 && /^\d+$/.test(accountNumber)) {
    return true // Invalid format
  }

  // Convert the account number to an array of digits
  const digits = accountNumber.split('').map(Number)

  // Apply the checksum algorithm
  const checksum = digits.reduce((accumulator, currentValue, index) => {
    if (index % 2 === 0) {
      currentValue *= 2
      if (currentValue > 9) {
        currentValue -= 9
      }
    }
    return accumulator + currentValue
  }, 0)

  // If the checksum is divisible by 10, the account number is valid
  return checksum % 10 === 0
}




function cancelarCuenta() {
  const user =JSON.parse( localStorage.getItem('usuario')).user
  const pin=JSON.parse( localStorage.getItem('usuario')).pin
  const confirmUser = document.querySelector('.confirm-user')
  const confirmPin = document.querySelector('.confirm-pin')
  const pinIntro = confirmPin.value
  const userIntro = confirmUser.value
  console.log(user, pin, pinIntro, userIntro)
  if (userIntro == user && pinIntro == pin) {
    enviarMensaje('se ha procedido a  cerrar tu cuenta');
    //TODO llamada fetch para eliminar cuenta
    console.log('cuenta cancelada')
  }
}


