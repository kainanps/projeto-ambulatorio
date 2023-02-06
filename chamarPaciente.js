// setInterval(function(){
//     //location.reload();
//  }, 10000);
busca()
if(localStorage.getItem('paciente1')){
    localStorage.setItem('paciente1', '')
    localStorage.setItem('paciente2', '')
    localStorage.setItem('paciente3', '')
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
    let paciente = JSON.parse(jsonData)
    if(localStorage.getItem('paciente1') != paciente.Paciente){

        localStorage.setItem('paciente1', paciente.Paciente)
        localStorage.setItem('paciente2', localStorage.getItem('paciente1'))

        
    }
}

