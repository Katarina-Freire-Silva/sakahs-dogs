const seletor = document.querySelector('#seletor-raca');
const botao = document.querySelector('#btn-buscar');
const imagem = document.querySelector('#foto-dog');
const loader = document.querySelector('#carregando');
const erroMsg = document.querySelector('#erro');
const buscaInput = document.querySelector('#busca-raca');


async function carregarListaDeRacas() {
    const urlRacas = 'https://dog.ceo/api/breeds/list/all';
    
    try {
        const resposta = await fetch(urlRacas);
        const dados = await resposta.json();
        const racas = Object.keys(dados.message); 
        
        racas.forEach(raca => {
            const opcao = document.createElement('option');
            opcao.value = raca;
            opcao.innerText = raca.charAt(0).toUpperCase() + raca.slice(1);
            seletor.appendChild(opcao);
        });

    } catch (erro) {
        console.error("Erro ao carregar lista de raças", erro);
    }
}


async function buscarCachorro() {
    const texto = buscaInput.value.trim().toLowerCase();
    const racaSelecionada = seletor.value;

    let url = '';

    if (texto) {
        url = `https://dog.ceo/api/breed/${texto}/images/random`;
    }
    else if (racaSelecionada) {
        url = `https://dog.ceo/api/breed/${racaSelecionada}/images/random`;
    }
    else {
        url = 'https://dog.ceo/api/breeds/image/random';
    }

    imagem.style.display = 'none';
    loader.style.display = 'block';
    erroMsg.innerText = '';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "error") {
            loader.style.display = 'none';
            erroMsg.innerText = "Raça não encontrada";
            return;
        }

        imagem.src = data.message;

        imagem.onload = () => {
            loader.style.display = 'none';
            imagem.style.display = 'block';
        };

    } catch (error) {
        loader.style.display = 'none';
        erroMsg.innerText = "Erro ao buscar cachorro";
    }
}


botao.addEventListener('click', buscarCachorro);

buscaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarCachorro();
    }
});

seletor.addEventListener('change', () => {
    buscaInput.value = ''; 
    buscarCachorro();
});

carregarListaDeRacas();
buscarCachorro();