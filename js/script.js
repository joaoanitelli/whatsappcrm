const inputMsg = document.querySelector('.bottom-screen textarea');
const btnSend = document.querySelector('.send');
const divMensagens = document.querySelector('.mensagens');
const buttonComercial = document.getElementById('comercial');
const buttonSuporte = document.getElementById('suporte');
const refresh = document.getElementById('refresh');
document.querySelector('.hora-mensagem').textContent = getFormattedTime();

let msgAtual = 0;
const mensagens = [
    `<div class="msg-bot">
    <p class="message-text">Você já usa o Xtema em seu estabelecimento?<br><br>
    <button onclick="chatSim()" class="button-chat" id="sim">Sim</button>
    <button onclick="chatNao()" class="button-chat" id="nao">Não</button></p>
    <p class="hora-mensagem"></p>
</div>`,
    `<div class="msg-bot">
    <p class="message-text">Possui um domínio?<br>Se sim, digite-o.<br><br>
    <button onclick="dominio()" class="button-chat" id="dominio">Não possuo domínio</button></p>
    <p class="hora-mensagem"></p>
</div>`,
    `<div class="msg-bot">
    <p class="message-text">Possui email de cadastro?<br>Se sim, digite-o.<br><br>
    <button onclick="email()" class="button-chat" id="email">Não possuo email cadastrado</button></p>
    <p class="hora-mensagem"></p>
</div>`,
    `<div class="msg-bot">
    <p class="message-text">Qual o seu telefone para contato?</p>
    <p class="hora-mensagem"></p>
</div>`,
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

function updateHora() {
    const horaElementos = document.querySelectorAll('.hora-mensagem');
    horaElementos.forEach(function (elemento) {
        elemento.textContent = getFormattedTime();
    });
}

setInterval(updateHora, 100);

function chatComercial() {
    if (msgAtual == 0) {
        const texto = inputMsg.value = 'Comercial';
        enviarMensagem();
    }
}

function chatSuporte() {
    if (msgAtual == 0) {
        const texto = inputMsg.value = 'Suporte';
        enviarMensagem();
    }
}

function chatSim() {
    if (msgAtual == 1) {
        const texto = inputMsg.value = 'Sim';
        enviarMensagem();
        inputMsg.removeAttribute('disabled');
        inputMsg.setAttribute('placeholder', 'Mensagem')
    }
}
function chatNao() {
    if (msgAtual == 1) {
        const texto = inputMsg.value = 'Não';
        enviarMensagem();
        inputMsg.removeAttribute('disabled');
        inputMsg.setAttribute('placeholder', 'Mensagem')
    }
}



function dominio() {
    if (msgAtual == 2) {
        const texto = inputMsg.value = 'Não possuo domínio';
        enviarMensagem();
    }
}

function email() {
    if (msgAtual == 3) {
        const texto = inputMsg.value = 'Não possuo email cadastrado';
        enviarMensagem();
    }
}

// Máscara Telefone

function mask(o) {
    setTimeout(function () {
        var v = mphone(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}

function mphone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (r.length > 0) {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

// Fim

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
    if (msgAtual == 4) {
        mask(inputMsg);
    }
    if (texto && msgAtual < 6) {
        const novaMensagem = criarMensagem(texto, 'msg-send');
        divMensagens.prepend(novaMensagem);
        inputMsg.value = '';
        divMensagens.scrollTop = divMensagens.scrollHeight;
        enviarMensagemBot(mensagens[msgAtual]);
        msgAtual += 1;
        respostas.push(texto);
    }
    if (msgAtual == 6) {
        inputMsg.setAttribute('disabled', "");
        inputMsg.setAttribute('placeholder', 'Obrigado!')
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


inputMsg.addEventListener('input', function () {
    if (msgAtual == 4) {
        mask(inputMsg);
    }
});