window.addEventListener('scroll', function() {

    let header = document.querySelector ('header')
    header.classList.toggle('rolagem',window.scrollY > 0)
    /* Add uma class js ao #header. 'toggle' = Se essa classe (css) que eu escrever já existir, ele apaga. Se não existir, ele cria uma */
    /* traduzindo : Eu quero que essa classe 'rolagem', seja add sempre que a minha ' window ' tiver uma rolagem no eixo y, sempre que for maior que 0 */
    
});

function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }

