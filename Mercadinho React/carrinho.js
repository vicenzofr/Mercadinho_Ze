const { useEffect, useState } = React;

function Carrinho() {
     const [isImageOpen, setImageOpen] = useState(false);
     const openImage = () => {
        setImageOpen(true);
    };

    const closeImage = () => {
        setImageOpen(false);
    };
 

    const [carrinho, setCarrinho] = useState([]); 
    const [valorTotal, setValorTotal] = useState(0);

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem("carrinho") || "[]"); 
        setCarrinho(dados);
        setValorTotal(dados.reduce((acc, item) => acc + item.valor * item.qtd, 0));
    }, []);

    const remove = (nome) => {
        const atualizado = carrinho.filter((item) => item.nome !== nome);
        setCarrinho(atualizado);
        setValorTotal(dados.reduce((acc, item) => acc + item.valor * item.qtd, 0));
        localStorage.setItem("carrinho", JSON.stringify(atualizado));
        window.dispatchEvent(new Event("carrinho:updated"));
  }

  return (
    <aside className="w-80 bg-[#F9FAFB] rounded-lg shadow p-4 sticky top-6 mt-25">
      <h2 className="text-black text-[30px] font-bold">Carrinho</h2>

      <div className="flex flex-col gap-2 mt-5 mb-5 text-black text-[20px]">
        {carrinho.length ? (
          carrinho.map((item, i) => (
            <div key={i} className="flex justify-between">
              <p>{item.nome} x{item.qtd}</p>
              <p>R${(item.valor * item.qtd).toFixed(2)}</p>
              <button
                onClick={() => remove(item.nome)}
                className="w-5 h-5 bg-cover bg-[url('./assets/icons/close.png')] rounded-full cursor-pointer "
                aria-label="Botão com imagem">
                </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-[17px]">Carrinho vazio</p>
        )}
      </div>

      <p className="border-b-2 border-gray-300"></p>

      <div className="flex gap-35 font-bold mt-3">
        <h2 className="text-[20px]">Total</h2>
        <h2 className="text-[20px]">R${valorTotal.toFixed(2)}</h2>
      </div>

      <button className="h-15 w-70 bg-[#4EB352] justify-center items-center rounded-xl mx-1 font-bold text-white text-[20px] mt-5 cursor-pointer" onClick={openImage}>
        Finalizar compra
      </button>
        {isImageOpen && (
        <div className="image-modal">
          <div className="image-modal-content">
            <span className="close-button" onClick={closeImage}>&times;</span>
            <img src="./assets/QRcode.jpg" alt="Imagem expandida" />
          </div>
        </div>
      )}
     
    </aside>
  );
}

window.Carrinho = Carrinho;
