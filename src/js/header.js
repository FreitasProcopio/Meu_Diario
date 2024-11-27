window.addEventListener('scroll', function() {

  let header = document.querySelector ('header')
  header.classList.toggle('rolagem',window.scrollY > 0)

});

function on() {
  document.getElementById("overlay").style.display = "block";
}
  
function off() {
  document.getElementById("overlay").style.display = "none";
}

class Button {
  constructor() {
    this.open();
  }

  open() {

    const btn = document.getElementById("timeline-login");
    const Login = document.getElementById("displayLogin");
    const Cadastro =  document.getElementById("displayCadastro"); 

    btn.addEventListener('click', () => {
      if (btn.innerText === "LOGIN") {
        btn.innerText = "CADASTRO";
        Login.style.display = "none";
        Cadastro.style.display = "block";
      } else {
        btn.innerText = "LOGIN";
        Login.style.display = "block";
        Cadastro.style.display = "none";
      }
    });
  }
}

new Button();