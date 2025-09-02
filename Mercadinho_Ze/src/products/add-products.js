function AdicionarProdutos({ listaProdutos }) {
  const [preview, setPreview] = React.useState(null);
  const [nome, setNome] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [quant, setQuant] = React.useState("")

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const addProductList = () => {
    console.log({
      "Produto": nome,
      "Valor": valor,
      "Quantidade": quant,
    });
  };

  return (
    <div className="w-80 h-150 bg-[#F9FAFB] rounded-lg shadow p-4 sticky top-6 mt-25">
      <h2 className="text-black text-[30px] font-bold">Adicionar Produto</h2>

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
          className="cursor-pointer h-10 w-70 flex items-center justify-center border-1 border-[#4EB352] rounded-xl text-black hover:bg-green-700 mt-3"
        >
          Escolha a imagem
        </label>
        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
      </div>

      <p className="border-b-2 border-gray-300 mt-7"></p>

      <button
        className="cursor-pointer h-15 w-70 text-[20px] mt-4 flex items-center justify-center bg-[#4EB352] rounded-xl text-white font-bold hover:bg-green-700"
        onClick={addProductList}
      >
        Adicionar
      </button>
    </div>
  );
}

window.AdicionarProdutos = AdicionarProdutos;
