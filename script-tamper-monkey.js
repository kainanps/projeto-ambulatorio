// ==UserScript==
// @name        Chamada-Ambulatório
// @namespace   pacientes
// @description Gerar etiqueta
// @include     http://10.4.1.3:8080/paciente*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    function criarBotoes(){
    if(!document.querySelector('.botaoChamar')){
        let linhas = document.querySelectorAll('.rich-table-row')
        linhas.forEach(item => {
            let celula = document.createElement('td')
            let celula2 = document.createElement('td')
            let botao = document.createElement('input')
            let textConsultorio = document.createElement('input')
            textConsultorio.placeholder = "Consultório"
            botao.onclick = e => meuEscritorDeArquivo(path, item.children[2].innerText)
            botao.classList.add('botaoChamar')
            botao.type = "button"
            botao.value = "CHAMAR"
            botao.style = "color: #fff;border-radius: 5px; margin: 5px; padding: 5px 15px;  font-family: 'Arial', sans-serif;  font-weight: 500;  cursor: pointer;box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),   7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1); outline: none;background: rgb(96,9,240); border: none;"
            celula.appendChild(botao)
            celula2.appendChild(textConsultorio)
            item.appendChild(celula)
            item.appendChild(celula2)
        })
    }
}


setInterval(criarBotoes, 1000)

})();
