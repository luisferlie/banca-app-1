import enviarMensaje from './mensajes.js'

export default function solicitarCredito(monto) {
       console.log(`Solicitando crédito para ${monto}`)
       enviarMensaje(`se ha registrado su solicitud decredito por${monto} € `)

}