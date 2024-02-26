const inputTarefa = document.querySelector(".input-tarefa")
const btnTarefa = document.querySelector(".btn-tarefa")
const tarefas = document.querySelector(".tarefas")





// cria li
function criaLi() {
    const li = document.createElement('li');
    return li;
}

//pegar o press da enter
inputTarefa.addEventListener('keypress', function (e){
    if (e.keyCode === 13) {
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

// limpar input
function limpaTarefa(){
    inputTarefa.value = "";
    inputTarefa.focus();
}
// criar botão apagar
function criaBotaoApagar(li) {
    li.innerText += "  ";
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = "APAGAR";
    botaoApagar.setAttribute("class" , "apagar");
    botaoApagar.setAttribute("title" , "apagar esta tarefa");
    li.appendChild(botaoApagar);
}

// botão concluir

function criaBotaoConcluir(li){
    const botaoConcluir = document.createElement("button");
    botaoConcluir.innerText = "concluir";
    botaoConcluir.setAttribute("class" , "concluir");
    li.appendChild(botaoConcluir);
}

// cria tarefa
function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaTarefa();
    criaBotaoApagar(li);
    criaBotaoConcluir(li)
    salvarTarefas();
}
// captura do evento do botão
btnTarefa.addEventListener('click', () => {
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});


// botão apagar
document.addEventListener ("click", function(e){
    const el = e.target;

    if (el.classList.contains("apagar")){
       
        Swal.fire({
            title: "Tem certeza?",
            text: "Você não poderar reverter isto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!"
          }).then((result) => {

            if (result.isConfirmed) {
              Swal.fire({
                title: "Deletado!",
                text: "Sua tarefa foi deletada.",
                icon: "success"
              });
              el.parentElement.remove();
            } else{
                return
            }
          });
       
    
        salvarTarefas();
    }
});

// botão concluir



// salvar tarefas
function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
   const listaDeTarefas = [];

   for (let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('APAGAR', 'CONCLUIR').trim();
    listaDeTarefas.push(tarefaTexto);
   }

   const tarefaJSON = JSON.stringify(listaDeTarefas);
   localStorage.setItem('tarefas', tarefaJSON);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();
