const inputMsg = document.querySelector('.bottom-screen textarea');
const btnSend = document.querySelector('.send');
const divMensagens = document.querySelector('.mensagens');
const buttonComercial = document.getElementById('comercial');
const buttonSuporte = document.getElementById('suporte');
const refresh = document.getElementById('refresh');
document.querySelector('.hora-mensagem').textContent = getFormattedTime();

function updateHora() {
    const horaElementos = document.querySelectorAll('.hora-mensagem');
    horaElementos.forEach(function(elemento) {
        elemento.textContent = getFormattedTime();
    });
}

setInterval(updateHora, 100);

let msgAtual = 0;
const mensagens = [
    `<div class="msg-bot">
    <p class="message-text">Descreva em <b>apenas uma mensagem</b> o assunto que deseja tratar.</p>
    <p class="hora-mensagem"></p>
</div>`,
    `<div class="msg-bot">
    <p class="message-text">Perfeito, entraremos em contato!</p>
    <p class="hora-mensagem"></p>
</div>`
];

const respostas = []

function chatComercial() {
    if (msgAtual == 0) {
        const texto = inputMsg.value = 'Comercial';
        enviarMensagem();
        inputMsg.removeAttribute('disabled', "");
        inputMsg.setAttribute('placeholder','Mensagem');
    }
}

function chatSuporte() {
    if (msgAtual == 0) {
        const texto = inputMsg.value = 'Suporte';
        enviarMensagem();
        inputMsg.removeAttribute('disabled', "");
        inputMsg.setAttribute('placeholder','Mensagem');
    }
}

function refreshPag() {
    window.location.reload(true);
}

function getFormattedTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

function criarMensagem(texto, tipo) {
    const mensagem = document.createElement('div');
    mensagem.classList.add(tipo);

    const pTexto = document.createElement('p');
    pTexto.classList.add('message-text');
    pTexto.textContent = texto;

    const pHora = document.createElement('p');
    pHora.classList.add('hora-mensagem');
    pHora.textContent = getFormattedTime();

    mensagem.appendChild(pTexto);
    mensagem.appendChild(pHora);

    return mensagem;
}

function enviarMensagem() {
    const texto = inputMsg.value.trim();
    if (texto && msgAtual < 2) {
        const novaMensagem = criarMensagem(texto, 'msg-send');
        divMensagens.prepend(novaMensagem);
        inputMsg.value = '';
        divMensagens.scrollTop = divMensagens.scrollHeight;
        enviarMensagemBot(mensagens[msgAtual]);
            msgAtual += 1;
        respostas.push(texto);
    }
    if (msgAtual == 2) {
        inputMsg.setAttribute('disabled', "");
        inputMsg.setAttribute('placeholder','Obrigado!')
        console.log('Resposta salvas no banco', respostas);
    }
}

function textoParaHTML(textoHTML) {
    const div = document.createElement('div');
    div.innerHTML = textoHTML.trim();
    return div.firstChild;
}

function enviarMensagemBot(texto) {
    if (texto) {
        divMensagens.prepend(textoParaHTML(texto));
        divMensagens.scrollTop = divMensagens.scrollHeight;

    }
}

btnSend.addEventListener('click', enviarMensagem);

inputMsg.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        enviarMensagem();
    }
});