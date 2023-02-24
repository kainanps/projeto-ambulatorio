setInterval(function(){
    //busca()
 
 }, 1000);

if(sessionStorage.getItem('paciente1') != ''){
    setCookie(1,"")
    setCookie(2,"")
    setCookie(3,"")
    setCookie(4,"")
}

function busca(){
    $.ajax({
        type: "POST",
        url: "busca.php",
        data: {},
        success: function(result){
            chamarPaciente(result)
        }
    });
}

 function chamarPaciente(pacienteArray){
    //const paciente = JSON.parse(jsonData)
    
    // if(sessionStorage.getItem('prontuario1') != paciente.Prontuario && paciente){
    if(pacienteArray){
        
        cookieTransfer(3,4)
        cookieTransfer(2,3)
        cookieTransfer(1,2)
 
        sessionStorage.setItem('paciente1', paciente.Paciente)
        sessionStorage.setItem('prontuario1', paciente.Prontuario)
        sessionStorage.setItem('especialidade1', paciente.Especialidade)
        falar(`Paciente ${paciente[0]}, - prontuário ${paciente[1]}, - especialidade ${paciente[2]}, – dirija-se ao ambulatório consultas. `)
        
        ampliar('.paciente1')
        
        
        changeText(1)
        changeText(2)
        changeText(3)
        changeText(4)
    }
}

//esta função fala o texto que recebe como parâmetro
function falar(texto){
    const synth = window.speechSynthesis
    let toSpeak = new SpeechSynthesisUtterance(texto)
    toSpeak.voice = synth.getVoices()[16]
    synth.speak(toSpeak)
}

//Esta função faz um efeito de ampliar o card do paciente
function ampliar(cardClasse){
    let paciente = document.querySelector(cardClasse)
    paciente.classList.add('pacienteAmplied')
    
    //Este setInterval possibilita que o paciente espere o paciente atual ser chamado
    let timeInterval = setInterval(function(){
        //se a voz do speechSyntesis parar ele vai remover a classe paciente amplied e se ainda tiver algum paciente na lista ele aciona a função chamar paciente novamente
        if(!window.speechSynthesis.speaking){
            paciente.classList.remove('pacienteAmplied')
            clearInterval(timeInterval)
            removeLastPacientCalled('pacienteShow')
            let paciente = sessionStorageToArray('pacienteShow')
            if(paciente){
                chamarPaciente(paciente)
            }
        }
    },500)

}

//esta função recebe o id de 2 cookies e pega o valor de 1 e coloca dentro de outro
function cookieTransfer(sendCookie, receiverCookie){
    let paciente = sessionStorage.getItem('paciente' + sendCookie)
    let prontuario = sessionStorage.getItem('prontuario' + sendCookie)
    let especialidade = sessionStorage.getItem('especialidade' + sendCookie)
    
    sessionStorage.setItem('paciente'+receiverCookie, paciente)
    sessionStorage.setItem('prontuario'+receiverCookie, prontuario)
    sessionStorage.setItem('especialidade'+receiverCookie, especialidade)
}

//esta função recebe o id do cookie e insere um valor dentro dele, importante atentar-se pois muda todos os cookies ao mesmo tempo, usada com propósito de esvaziar o cookie
function setCookie(cookieId, value){
    sessionStorage.setItem('paciente'+cookieId, value)
    sessionStorage.setItem('prontuario'+cookieId, value)
    sessionStorage.setItem('especialidade'+cookieId, value)
}

//esta função recebe o id do cookie pega o valor dele e coloca dentro da tag html
function changeText(cookieId){
    let pacienteValue = sessionStorage.getItem('paciente' + cookieId)
    let prontuarioValue = sessionStorage.getItem('prontuario' + cookieId)
    let especialidadeValue = sessionStorage.getItem('especialidade' + cookieId)
    let paciente = document.querySelector(`.paciente${cookieId} .nome`)
    let prontuario = document.querySelector(`.paciente${cookieId} .prontuario`)
    let especialidade = document.querySelector(`.paciente${cookieId} .especialidade`)

    paciente.innerText = "Paciente: " + pacienteValue
    prontuario.innerText = "Prontuario: " + prontuarioValue
    especialidade.innerText = "Especialidade: " + especialidadeValue
}

//Retorna um array do sessionStorage showPaciente
function sessionStorageToArray(sessionId){
    let sessionValue = sessionStorage.getItem(sessionId)
    if(sessionValue){
        return sessionValue.split(';')
    }
}


//remove as informações da session do último paciente chamado, apesar de na ordem da session ele ser o primeiro
function removeLastPacientCalled(sessionId){
    let pacientes = sessionStorageToArray(sessionId)
    if(pacientes.length > 1){
        pacientes.splice(0,3)
        sessionStorage.setItem(sessionId, pacientes.join(';'))
    }else if(pacientes.length == 1){
        sessionStorage.removeItem(sessionId)
    }
}