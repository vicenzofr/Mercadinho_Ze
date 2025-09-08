const { useEffect, useState } = React;

function Carrinho() {
  const [isImageOpen, setImageOpen] = useState(false);
  const [carrinho, setCarrinho] = useState([]); 
  const [valorTotal, setValorTotal] = useState(0);

  const clear = (dados) =>
    (dados || []).filter(it => it && typeof it.valor === "number" && typeof it.qtd === "number");

    useEffect(() => {
      const loadCarrinho = async () => {
        const dados = clear(JSON.parse(localStorage.getItem("carrinho") || "[]"));//pegando do local 

        try {
          const response = await fetch("http://localhost:3000/products");// pegando do banco de dados
          const produtosDB = await response.json();
  
          //mantem se os produtos realmente existir no banco de dados 
          const sincronizado = dados.filter(item =>
            produtosDB.some(prod => prod.nome === item.nome)
          );

          setCarrinho(sincronizado);
          setValorTotal(sincronizado.reduce((acc, item) => acc + item.valor * item.qtd, 0));

          localStorage.setItem("carrinho", JSON.stringify(sincronizado));
        } catch (err) {
          console.error("Erro ao carregar produtos:", err);
          setCarrinho(dados);
          setValorTotal(dados.reduce((acc, item) => acc + item.valor * item.qtd, 0));
      }
    };

    loadCarrinho();
    window.addEventListener("carrinho:updated", loadCarrinho);
    return () => window.removeEventListener("carrinho:updated", loadCarrinho);
  }, []);

  const remove = (nome) => {
    const atual = clear(JSON.parse(localStorage.getItem("carrinho") || "[]"));
    const removeOne = atual.findIndex(item => item.nome === nome);
    
    if (removeOne !== -1) {
      if (atual[removeOne].qtd > 1) {
        atual[removeOne].qtd -= 1;
      } else {
        atual.splice(removeOne, 1); 
      }
    }

    localStorage.setItem("carrinho", JSON.stringify(atual));

    setCarrinho(atual);
    setValorTotal(atual.reduce((acc, it) => acc + it.valor * it.qtd, 0));

    window.dispatchEvent(new Event("carrinho:updated"));
  };

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
                aria-label={`Remover ${item.nome}`}>
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

      <button
        className="h-15 w-70 bg-[#4EB352] hover:bg-green-700 justify-center items-center rounded-xl mx-1 font-bold text-white text-[20px] mt-5 cursor-pointer"
        onClick={() => {
          if(carrinho.length == 0){
            alert("Seu carrinho esta vazio")
            return
          }
          setImageOpen(true)
          
        }}> 
        Finalizar compra
      </button>

      


      {isImageOpen && (
        <div className="image-modal justify-center items-center flex mt-10">
          <div className="image-modal-content ">
           <button 
              id="creditCard" 
              className="h-15 w-75 border-1 border-gray-500 rounded-xl mt-3 cursor-pointer flex items-center justify-between px-4 font-bold text-[#4EB352]">
              <div className="flex items-center">
                <img 
                  src="./assets/icons/shopping-cart/credit-card.png" 
                  className="w-6 h-6 mr-3" 
                  alt="Cartão de crédito"
                />
                <span>Cartão de crédito</span>
              </div>

              <img 
                src="./assets/icons/shopping-cart/right-arrow.png" 
                className="w-5 h-5" 
                alt="Seta"
              />
            </button>

            <button 
              id="bankSlip" 
              className="h-15 w-75 border-1 border-gray-500 rounded-xl mt-3 cursor-pointer flex items-center justify-between px-4 font-bold text-[#4EB352]" onClick={() => gerarPDFCarrinho()}
>
              <div className="flex items-center">
                <img src="./assets/icons/shopping-cart/receipt.png" className="w-6 h-6 mr-3" alt="Boleto"/>
                <span>Boleto bancário</span>
              </div>

              <img src="./assets/icons/shopping-cart/right-arrow.png" className="w-5 h-5" alt="Seta"/>
            </button>

            <button 
              id="pix" 
              className="h-15 w-75 border-1 border-gray-500 rounded-xl mt-3 cursor-pointer flex items-center justify-between px-4 font-bold text-[#4EB352]">
              <div className="flex items-center">
                <img src="./assets/icons/shopping-cart/pix.png" className="w-6 h-6 mr-3" alt="PIX"/>
                <span>Chave PIX</span>
              </div>

              <img src="./assets/icons/shopping-cart/right-arrow.png" className="w-5 h-5" alt="Seta" />
            </button>

          </div>
        </div>
      )}
    </aside>
  );
}

window.Carrinho = Carrinho;
