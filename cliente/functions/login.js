export async function login(user,pin) {
    /* operarEl.classList.remove('d-none') */
  
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
      console.log('Respuesta del servidor:', data)
      // Puedes realizar cualquier otra operación necesaria con los datos
   /*    nombreEl.innerHTML = data.account.owner
      usuarioEl.innerHTML = data.account.username
      cuentaEl.innerHTML = data.account.numberAccount
      direccionEl.innerHTML = data.account.address
      paisEl.innerHTML = data.account.country
      dniEl.innerHTML = data.account.nationalIdNumber */
  
     /*  datosUsuarioEl.classList.remove('d-none') */
      /* const movimientos = data.account.movements
      console.log(movimientos) */
  
     /*  displayMovements(movimientos) */
  
     /*  const amounts = movimientos.map((mov) => mov.amount)
      const balance = amounts.reduce((previous, current) => previous + current, 0)
      saldoEl.innerHTML = ` ${balance} ` */
  
     /*  const token = data.token */
  
     /*  console.log(user, token)
      const usuario={ user : user , token : token , pin : pin } */
   /*    console.log(usuario);
      localStorage.setItem("usuario", JSON.stringify(usuario)) */
  return data
    } catch (error) {
      console.error('Hubo un error:', error)
      // Manejar errores aquí
    }
  }