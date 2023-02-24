window.addEventListener('storage', function(e) {
    updateStatusPaciente()
})

function busca(){
    $.ajax({
        type: "POST",
        url: "busca.php",
        data: {},
        success: function(result){
            updateTable(result)
        }
    })
}

function updateTable(jsonData){
    
    const pacienteArray = JSON.parse(jsonData)

    pacienteArray.forEach(element => {
        const tr = document.createElement('tr')
        const tdNome = document.createElement('td')
        const tdProntuario = document.createElement('td')
        const tdEspecialidade = document.createElement('td')
        const tdChamadas = document.createElement('td')
        const tdStatus = document.createElement('td')
        const buttonChamar = document.createElement('button')

        buttonChamar.innerText = "Chamar"

        tdNome.innerText = element.Paciente
        tdProntuario.innerText = element.Prontuario
        tdEspecialidade.innerText = element.Especialidade
        tdChamadas.innerText = element.TotalChamadas
        tdStatus.appendChild(buttonChamar)


        tr.append(tdNome,tdProntuario,tdEspecialidade,tdChamadas,tdStatus)

        const tbody = document.querySelector('.tabelaPaciente tbody')
        tbody.appendChild(tr)

        buttonChamar.onclick = e =>{
            paciente = localStorage.getItem('pacienteShow')
            if(paciente){
                localStorage.setItem('pacienteShow', `${paciente};${element.Paciente};${element.Prontuario};${element.Especialidade}`)
            }else{
                localStorage.setItem('pacienteShow', `${element.Paciente};${element.Prontuario};${element.Especialidade}`)
                localStorage.setItem('pacienteStart', '1')
            }
            updateStatusPaciente()
        }

    });

}

//atualiza o status do paciente
function updateStatusPaciente(){
    const botoes = document.querySelectorAll('.tabelaPaciente button')
    botoes.forEach(item =>{
        const pacientesShow = localStorageToArray()

        //pegar o nome do paciente a partir do botao selecionado
        const nomePaciente = item.parentNode.parentNode.firstElementChild.textContent

        const index = pacientesShow.indexOf(nomePaciente)

        if(index === 0){
            item.innerText = "Chamando..."
            item.style.fontStyle = 'italic'
            item.style.backgroundColor = 'rgb(231, 40, 40)'
        }else if(pacientesShow.indexOf(nomePaciente) === -1){
            item.style.fontStyle = ''
            item.innerText = "Chamar"
            item.style.backgroundColor = 'rgb(50, 72, 172)'
        }else{
            item.style.fontStyle = 'italic'
            item.innerText = "Será chamado..."
            item.style.backgroundColor = 'rgb(40, 185, 89)'
        }
    })
}

function localStorageToArray(){
    let sessionValue = localStorage.getItem("pacienteShow")
    if(sessionValue){
        return sessionValue.split(';')
    }else{
        return []
    }
}

busca()