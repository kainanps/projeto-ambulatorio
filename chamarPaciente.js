setInterval(function(){
    busca()
 }, 1000);
if(localStorage.getItem('paciente1')){
    localStorage.setItem('paciente1', '')
    localStorage.setItem('paciente2', '')
    localStorage.setItem('paciente3', '')
    localStorage.setItem('paciente4', '')
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

function chamarPaciente(jsonData){
    const paciente = JSON.parse(jsonData)
    if(localStorage.getItem('paciente1') != paciente.Paciente){
        
        localStorage.setItem('paciente4', localStorage.getItem('paciente3'))

        localStorage.setItem('paciente3', localStorage.getItem('paciente2'))

        localStorage.setItem('paciente2', localStorage.getItem('paciente1'))

        localStorage.setItem('paciente1', paciente.Paciente)
        falar(localStorage.getItem('paciente')+" Comparecer ao consultório 1")
        

        const paciente1 = document.querySelector('.paciente1 p span')
        paciente1.innerText = "Nome: " + localStorage.getItem('paciente1')

        const paciente2 = document.querySelector('.paciente2 p span')
        paciente2.innerText = "Nome: " + localStorage.getItem('paciente2')

        const paciente3 = document.querySelector('.paciente3 p span')
        paciente3.innerText = "Nome: " + localStorage.getItem('paciente3')

        const paciente4 = document.querySelector('.paciente4 p span')
        paciente4.innerText = "Nome: " + localStorage.getItem('paciente4')
    }
}

function falar(texto){
    const synth = window.speechSynthesis
    var toSpeak = new SpeechSynthesisUtterance(texto)
    toSpeak.voice = synth.getVoices()[0]
    synth.speak(toSpeak)
}