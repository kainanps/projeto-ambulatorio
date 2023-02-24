// ==UserScript==
// @name Chamada-Ambulatorio2
// @namespace pacientes
// @include http://10.4.1.3:8080/paciente*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @version 1
// @grant none
// ==/UserScript==
(function() {
    function criarBotoes(){
        if(!document.querySelector('.botaoChamar') && document.getElementById('cdAgendamento:tblData2')){
            let linhas = document.querySelectorAll('.rich-table-row')
            let areaPesquisa = document.querySelector('.areaPesquisa')
            let buttonCallAll = document.createElement('input')
            buttonCallAll.value = "Exportar Todos"
            buttonCallAll.type = "button"
            buttonCallAll.style = "color: #fff;border-radius: 5px;font-size: 1.6em; margin: 5px; padding: 5px 15px;  font-family: 'Arial', sans-serif;  font-weight: 500;  cursor: pointer;box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),   7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1); outline: none;background: rgb(96,9,240); border: none;"
            buttonCallAll.onclick = e =>{
                let pacienteObject = {}
                linhas.forEach((item,key) => {
                    pacienteObject['paciente'+key] = {
                        paciente: item.children[2].innerText.toLowerCase(),
                        especialidade: item.children[9].innerText.toLowerCase(),
                        data: item.children[3].innerText,
                        prontuario: item.children[1].innerText,
                        chamadas: 0
                    }
                })
                $.ajax({
                    type: 'POST',
                    url: "http://localhost:80/Projeto-ambulatorio/receiverAll.php",
                    data: pacienteObject,
                    success: function(response) {
                        alert(response)
                    }
                });
            }

            areaPesquisa.insertBefore(buttonCallAll, areaPesquisa.childNodes[2])

            linhas.forEach(item => {
                let celula = document.createElement('td')
                let botao = document.createElement('input')
                
                botao.onclick = e => {
                    let dados = {
                                    paciente: item.children[2].innerText.toLowerCase(),
                                    especialidade: item.children[9].innerText.toLowerCase(),
                                    data: item.children[3].innerText,
                                    prontuario: item.children[1].innerText,
                                    chamadas: 0
                    }
                    $.ajax({
                        type: 'POST',
                        url: "http://localhost:80/Projeto-ambulatorio/receiver.php",
                        data: dados,
                        success: function(response) {
                            alert(response)
                        }
                    });
                }

                botao.classList.add('botaoChamar')
                botao.type = "button"
                botao.value = "Exportar"
                botao.style = "color: #fff;border-radius: 5px; margin: 5px; padding: 5px 15px;  font-family: 'Arial', sans-serif;  font-weight: 500;  cursor: pointer;box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),   7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1); outline: none;background: rgb(96,9,240); border: none;"
                celula.appendChild(botao)
                item.appendChild(celula)

            })
        }
    }
    setInterval(criarBotoes, 1000)
})();