function AdicionarProdutos({ listaProdutos, onAdded }) {
  const [preview, setPreview] = React.useState(null);
  const [nome, setNome] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [quant, setQuant] = React.useState("");
  const [imageBase64, setImageBase64] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addProductList = async (e) => {
    //  e.preventDefault(); impede o reaload da pagina
    if (e) e.preventDefault(); 
    try {
      const conteudo = JSON.stringify({
        nome: nome,
        valor: Number(valor),
        quant: Number(quant),
        img: imageBase64 ? imageBase64.split(",")[1] : null
      });

      console.log("Produto adicionado: pre post", conteudo);

      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: conteudo
      });

      if (!response.ok) throw new Error("Erro ao adicionar produto");

      const data = await response.json();
      console.log("Produto adicionado: pos post", data);

     // atualiza a lista no App
      if (listaProdutos) {
        listaProdutos((prev) => [...prev, data]); // <- usar data no lugar de novoProduto
      }
      // limpa formulário
      setNome(""); 
      setValor(""); 
      setQuant("");
      setPreview(null); 
      setImageBase64(null);

      // Notifica opcionalmente via prop (se alguém passou) e via evento global
      if (typeof onAdded === "function") onAdded(data);

      // dispatch de evento global — ProdutosDisponiveis vai ouvir isso e atualizar
      window.dispatchEvent(new CustomEvent("produtoAdicionado", { detail: data }));

    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  return (
     <form
      onSubmit={addProductList}
      // className="flex flex-col gap-4 p-4 border rounded-lg bg-white"
    > 
    <div className="w-80 h-150 bg-[#F9FAFB] rounded-lg shadow p-4 mx-auto">
      {preview ? (
        <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-md mx-auto mt-4" />
      ) : (
        <div className="w-40 h-40 bg-gray-200 rounded-md mx-auto flex items-center justify-center text-gray-500 mt-7">
          Nenhuma imagem
        </div>
      )}

      <div className="mt-6">
        <input 
          id="nameProduct" 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          className="cursor-pointer h-10 w-70 flex items-center justify-center border-1 border-[#4EB352] rounded-xl text-black pl-2 text-center focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none" 
          placeholder="Nome do produto" 
        />

        <input 
          id="valueProduct" 
          type="number" 
          value={valor} 
          onChange={(e) => setValor(e.target.value)} 
          className="cursor-pointer h-10 w-70 flex items-center justify-center border-1 border-[#4EB352] rounded-xl text-black text-center mt-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
          placeholder="Valor do produto" 
        />

        <input 
          id="quantProduct" 
          type="number" 
          value={quant} 
          onChange={(e) => setQuant(e.target.value)} 
          className="cursor-pointer h-10 w-70 flex items-center justify-center border-1 border-[#4EB352] rounded-xl text-black text-center mt-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
          placeholder="Quantidade do produto" 
        />

        <label 
          htmlFor="file-upload" 
          className="cursor-pointer h-10 w-70 flex items-center justify-center border-1 border-[#4EB352] rounded-xl text-black hover:bg-green-700 mt-3">
            Escolha a imagem
        </label>
        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
      </div>

      <p className="border-b-2 border-gray-300 mt-7"></p>

      <button 
        type="button"
        className="cursor-pointer h-15 w-70 text-[20px] mt-4 flex items-center justify-center bg-[#4EB352] rounded-xl text-white font-bold hover:bg-green-700" 
        onClick={(e) => addProductList(e)} //  chama a função com event
      >
  Adicionar
</button>

    </div>
    </form>
  );
}

window.AdicionarProdutos = AdicionarProdutos;
