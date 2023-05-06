// Operador lógico que retorna com dados salvos, ou string vazia,
// utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        //criaElemento agora recebe itemAtual para função de armazenar no localStorage
        criaElemento(itemAtual);

        //push comando para colocar itens dentro do array
        itens.push(itemAtual);
    }

    //JSON.stringify comando para converter object em string
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
});

function criaElemento(item) {
    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
};

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();

    //remover item do Array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    console.log(itens);

    // escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens));
}