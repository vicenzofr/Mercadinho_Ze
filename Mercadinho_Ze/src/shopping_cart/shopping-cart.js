const { useEffect, useState } = React;

function Carrinho() {
  const [isImageOpen, setImageOpen] = useState(false);
  const [carrinho, setCarrinho] = useState([]); 
  const [valorTotal, setValorTotal] = useState(0);
  const [isCardCredit, setCard] = useState(false);

  const toggleImage = () => {
    setImageOpen(true);
    setCard(false); // garante que o outro fique falso
  };

  const toggleCard = () => {
    setCard(true);
    setImageOpen(false); // garante que o outro fique falso
  };

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

  const adicionar = (nome) =>{
    const atual = clear(JSON.parse(localStorage.getItem("carrinho") || "[]"));
    const addOne = atual.findIndex(item => item.nome === nome);

    if (addOne >= 0 ) {
      atual[addOne].qtd += 1
      } else {
        atual.push({ nome, qtd: 1, valor: addValor(nome) });       
      }
    

    localStorage.setItem("carrinho", JSON.stringify(atual));

    setCarrinho(atual);
    setValorTotal(atual.reduce((acc, it) => acc + it.valor * it.qtd, 0));

    window.dispatchEvent(new Event("carrinho:updated"));
  }

  return (
    <aside className="w-80 bg-[#F9FAFB] rounded-lg shadow p-4 sticky top-6 mt-25">
      <h2 className="text-black text-[30px] font-bold">Carrinho</h2>

      <div className="flex flex-col gap-2 mt-5 mb-5 text-black text-[20px] ">
        {carrinho.length ? (
          carrinho.map((item, i) => (
            <div key={i} className="flex  h-18 w-72 bg-[#e7e9eb] text-center items-center rounded-md justify-betweens">
              <div className="flex items-center gap-4"> 
                <img
                  src={`./assets/food/${item.nome}.png`}
                  alt={item.nome}
                  className="w-13 h-13 object-contain mx-3"
                />
              </div>
              
              <div className="mx-6">
                <div>
                  <p className="font-bold text-[#4EB352] text-[23px]">{item.nome}</p>
                </div>

                <div className="mt-1">
                  <p className="font-bold text-[16px] text-right">R${(item.valor * item.qtd).toFixed(2)}</p>
                </div>
              </div>

              <div className="flex justify-center text-center items-center ml-auto gap-2 self-end">
                <button
                onClick={() => remove(item.nome)}
                className="w-5 h-7 bg-cover bg-[#4EB352] rounded-t-lg cursor-pointer text-white text-[18px]"
                aria-label={`Remover ${item.nome}`}>
                  -
                </button>

                <p className="text-[17px] text-black w-6 text-center">{item.qtd}</p>
                
                <button
                onClick={() => adicionar(item.nome)}
                className="w-5 h-7 bg-cover bg-[#4EB352] rounded-t-lg cursor-pointer text-white text-[18px]"
                aria-label={`Adicionar ${item.nome}`}> 
                  +
                </button>
              </div>
        
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
              className="h-15 w-75 border-1 border-gray-500 rounded-xl mt-3 cursor-pointer flex items-center justify-between px-4 font-bold text-[#4EB352]"
              onClick={toggleCard}>
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
              className="h-15 w-75 border-1 border-gray-500 rounded-xl mt-3 cursor-pointer flex items-center justify-between px-4 font-bold text-[#4EB352]" onClick={() => gerarPDFCarrinho()}>

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

       {isCardCredit &&(<div id="formsCard">
        <p className="border-b-2 border-gray-300 mt-10"></p>
        <button className="w-6 h-6 mt-4 bg-[url('./assets/icons/arrow.png')] bg-no-repeat bg-center bg-contain cursor-pointer" onClick={toggleImage}>
        </button>
        <div className="w-72 h-45 bg-[#4EB352] rounded-3xl mt-3 justify-center items-center flex relative flex-col">
          <div className="self-start mt-4 ">
            <p className="absolute top-4 left-43 font-bold text-white text-[20px]">ZÉBANK</p>
          </div>
          
          <div className="flex gap-40 mt-2">
            <img src="./assets/icons/creditCard/chip.png" className="w-8 h-8"></img>
            <img src="./assets/icons/creditCard/nfc.png" className="w-6 h-6"></img>
          </div>

          <div className="justify-center items-center text-center flex mt-2">
            <h1 id="numberCard" className="text-white text-[20px] tracking-wide">123 5678 9012 3456</h1>
          </div>

          <div className="flex justify-center items-center gap-15 text-center mt-2">
            <h1 id="cardholderName" className="text-white text-[12px] tracking-wide">CARDHOLDER NAME</h1>
            <h1 id="mmYY" className="text-white text-[12px] tracking-wide ">12/24</h1>
          </div>

        </div>

        <div className="justify-center items-center flex mt-4">
          <forms>
           <div className="mt-3 gap-2">
              <div className="w-72 h-10 relative bg-white border border-gray-300 rounded-lg flex items-center px-2">
                <input 
                  type="number" 
                  id="numberCard" 
                  className="w-full h-full text-[12px] placeholder-gray-400 border-none outline-none pr-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="CARD NUMBER"
                  required
                /> 
                <img
                  src="./assets/icons/creditCard/contactless.png"
                  alt="CVV icon"
                  className="absolute right-2 h-6"
                />
              </div>

              <div className="w-72 h-10 relative bg-white border border-gray-300 rounded-lg flex items-center px-2 mt-2">
                <input 
                  type="text" 
                  id="nameCard" 
                  className="w-full h-full text-[12px] placeholder-gray-400 border-none outline-none pr-8"
                  placeholder="CARDHOLDER NAME"
                  required
                />   
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <div className="w-23 h-10 relative bg-white border border-gray-300 rounded-lg flex items-center px-2">
                <input 
                  id="MM"
                  type="number"
                  className="w-23 h-10  text-[12px] placeholder-gray-400 border-none outline-none pr-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  placeholder="MM"
                  required
                />    
              </div>

              <div className="w-23 h-10 relative bg-white border border-gray-300 rounded-lg flex items-center px-2">
                <input 
                  id="YY" 
                  type="number"
                  className="w-23 h-10 text-[12px] placeholder-gray-400 border-none outline-none pr-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  placeholder="YY"
                  required
                />
              </div>

              <div className="w-23 h-10 relative bg-white border border-gray-300 rounded-lg flex items-center px-2">
                <input
                  id="CVV"
                  type="number"
                  className="w-full h-full text-[12px] placeholder-gray-400 border-none outline-none pr-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="CVV"
                  required
                />
                <img
                  src="./assets/icons/creditCard/cvv.png"
                  alt="CVV icon"
                  className="absolute right-2 h-6"
                />
                </div>
              </div>

              <div className="flex justify-end">
                <input 
                  type="submit" 
                  value="Pagar" 
                  className="h-10 w-30 bg-[#4EB352] mt-4 rounded-lg text-white font-bold cursor-pointer" 
                  id="submitCreditCard"/>
              </div>
          
             
          </forms>
        </div>
        
      </div>)}

    </aside>
  );
}

window.Carrinho = Carrinho;