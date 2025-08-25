function Produtos({ imagem, nome, valor }) {
  const armazenar = (item) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const i = carrinho.findIndex((p) => p.nome === nome);

    if (i >= 0 ) {
      carrinho[i].qtd += 1; // incrementa
    } else {
      carrinho.push({ nome, valor, imagem, qtd: 1 }); // cria
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
     window.dispatchEvent(new Event("carrinho:updated"));
     // dispatchEvent faz com que o js dipare um evente em um obj para que ele aja de uma forma natural
  };

  return (
    <div className="bg-white w-70 h-80 rounded-lg flex flex-col items-center justify-center gap-2 text-center mt-20 border-1">
      <img src={imagem} alt={nome} className="w-25 h-25 text-center" />
      <h2 className="text-2xl font-bold">{nome}</h2>
      <h1 className="text-[20px]">R${valor}</h1>
      <button
        className="bg-[#4EB352] cursor-pointer h-10 w-30 rounded-lg text-white font-bold"
        onClick={() => armazenar({nome, valor, qtd: 0})}>
        Adicionar
      </button>
    </div>
  );
}

window.Produtos = Produtos;
