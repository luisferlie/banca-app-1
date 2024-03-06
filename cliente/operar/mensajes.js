export default function enviarMensaje(mensaje,clase){
    const mensajeEl = document.querySelector('.mensaje')
    mensajeEl.innerHTML=mensaje
    mensajeEl.classList.add('clase')
    mensajeEl.classList.remove('d-none') 
        mensajeEl.classList.add('d-block') 
        mensajeEl.classList.add(clase) 
    setTimeout(() => {
        mensajeEl.classList.add('d-none') 
    }, 3000);
}