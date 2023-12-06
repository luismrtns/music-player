const texto = document.getElementById("texto")

function digitador(elemento) {
  const textoarray = elemento.innerHTML.split("") //vai separar cada letra da frase
  elemento.innerHTML = "" //vai tirar o texto da teal e só vai aparecer quando o site reiniciar
  textoarray.forEach((letra, indice) => {
    setTimeout(() => (elemento.innerHTML += letra), 250 * indice)
  })
}

digitador(texto)
