const containerCadastrar = document.querySelector('.cadastrar');
const inputTarefa = containerCadastrar.querySelector('input');
const btmAdicionar = containerCadastrar.querySelector('button');
const containerTarefas = document.querySelector('.tarefas');
const templateTarefa = containerTarefas.querySelector('template');

function carregarTarefas() {
    const stringTarefas = localStorage.getItem('tarefas');
    const arrayTarefas = JSON.parse(stringTarefas) || [];
    arrayTarefas.forEach(criarTarefa);

}

function salvarTarefa() {
    const nodeListTarefas = containerTarefas.querySelectorAll(':scope > .tarefa span');
    const arrayTarefas = Array.from(nodeListTarefas).map(el => el.textContent);
    const StringTarefas = JSON.stringify(arrayTarefas);
    localStorage.setItem('tarefas', StringTarefas);
}

function criarTarefa(texto) {
    if (texto.trim() === '') return;
    const tarefa = templateTarefa.content.cloneNode(true)
    const spanTitle = tarefa.querySelector('span')
    const btnExcluir = tarefa.querySelector('button');
    spanTitle.textContent = texto;
    btnExcluir.onclick = () => {
        btnExcluir.closest('.tarefa').remove();
        salvarTarefa();
    }
    containerTarefas.appendChild(tarefa)
    salvarTarefa();
}

btmAdicionar.onclick = function () {
    const texto = inputTarefa.value.trim()
    criarTarefa(texto);
    inputTarefa.value = '';
}
inputTarefa.addEventListener('keypress', (event) => {
    if (event.key !== 'Enter') return;
    btmAdicionar.click();
})
carregarTarefas();