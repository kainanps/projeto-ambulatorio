setInterval(function(){
     if(localStorage.getItem('pacienteStart')){
        let paciente = localStorageToArray('pacienteShow')
        chamarPaciente(paciente)
        localStorage.removeItem('pacienteStart')
     }
 }, 1000);

 function chamarPaciente(pacienteArray){
    if(pacienteArray){
        
        textTranfer(2,3)
        textTranfer(1,2)
 
        falar(`Paciente ${pacienteArray[0]}, - prontuário ${pacienteArray[1]}, - especialidade ${pacienteArray[2]}, – dirija-se ao ambulatório consultas. `)
        
        changeText(1, pacienteArray)
        ampliarCardPaciente('.paciente1')
        
    }
}

//esta função fala o texto que recebe como parâmetro
function falar(texto){
    const synth = window.speechSynthesis
    let toSpeak = new SpeechSynthesisUtterance(texto)
    toSpeak.voice = synth.getVoices()[16]
    synth.speak(toSpeak)
}

//Esta função faz um efeito de ampliar o card do paciente e também serve para chamar os próximos pacientes que estão na lista
function ampliarCardPaciente(cardClasse){
    const paciente = document.querySelector(cardClasse)
    paciente.classList.add('pacienteAmplied')
    
    //Este setInterval possibilita que o paciente espere o paciente atual ser chamado
    let timeInterval = setInterval(function(){
        //se a voz do speechSyntesis parar ele vai remover a classe paciente amplied e se ainda tiver algum paciente na lista ele aciona a função chamar paciente novamente
        if(!window.speechSynthesis.speaking){
            document.querySelector('.paciente1').classList.remove('pacienteAmplied')
            clearInterval(timeInterval)
            removeLastPacientCalled('pacienteShow')
            let paciente = localStorageToArray('pacienteShow')
            if(paciente){
                chamarPaciente(paciente)
            }
        }
    },500)

}

//esta função recebe o id de 2 card de paciente e pega o innerText de 1 e coloca dentro de outro
function textTranfer(sendTextId, receiverTextId){
    let sendNome = document.querySelector(`.paciente${sendTextId} .nome`).innerText
    let sendProntuario = document.querySelector(`.paciente${sendTextId} .prontuario`).innerText
    let sendEspecialidade = document.querySelector(`.paciente${sendTextId} .especialidade`).innerText
    
    document.querySelector(`.paciente${receiverTextId} .nome`).innerText = sendNome
    document.querySelector(`.paciente${receiverTextId} .prontuario`).innerText = sendProntuario
    document.querySelector(`.paciente${receiverTextId} .especialidade`).innerText = sendEspecialidade
}

//esta função recebe o id da classe do html e um array pega o valor dele e coloca dentro da tag html
function changeText(classId, pacienteValue){

    let paciente = document.querySelector(`.paciente${classId} .nome`)
    let prontuario = document.querySelector(`.paciente${classId} .prontuario`)
    let especialidade = document.querySelector(`.paciente${classId} .especialidade`)

    paciente.innerText = "Paciente: " + pacienteValue[0]
    prontuario.innerText = "Prontuario: " + pacienteValue[1]
    especialidade.innerText = "Especialidade: " + pacienteValue[2]
}

//Retorna um array do localStorage showPaciente
function localStorageToArray(sessionId){
    let sessionValue = localStorage.getItem(sessionId)
    if(sessionValue){
        return sessionValue.split(';')
    }
}

//remove as informações da session do último paciente chamado, apesar de na ordem da session ele ser o primeiro
function removeLastPacientCalled(sessionId){
    let pacientes = localStorageToArray(sessionId)
    if(pacientes.length > 3){
        pacientes.splice(0,3)
        localStorage.setItem(sessionId, pacientes.join(';'))
    }else if(pacientes.length == 3){
        localStorage.removeItem(sessionId)
    }
}