function Tablet() {
  const [productsListTable, setProductsListTable] = React.useState(false);
  const [userListTable, setUserListTable] = React.useState(false);
  const [saleListTable, setSalesListTable] = React.useState(false);
  const [startListTable, setStartListTable] = React.useState(true);
  const [listaProdutos, setListaProdutos] = React.useState([]);

  React.useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const produtos = await response.json();
        setListaProdutos(produtos);
        console.log("Produtos no banco:", produtos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error.message);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div
      id="tableMenu"
      className="w-[1200px] h-[720px] bg-[#a6adb442] grid grid-cols-3 grid-rows-3 gap-0 rounded-3xl mt-10 shadow-xl/20 shadow-[0_4px_10px_rgba(107,114,128,0.6)]"
    >
      <div
        id="greenMenu"
        className="w-[180px] row-span-3 bg-[#3e8840] rounded-l-3xl flex items-center justify-center"
      >
        <div id="buttonTable" className="pt-4 space-y-3 w-full px-4">
          <button
            id="startTable"
            className="w-full h-10 text-white text-[17px] cursor-pointer rounded-md hover:bg-white hover:text-black"
            onClick={() => {
              setProductsListTable(false);
              setStartListTable(true);
              setUserListTable(false);
              setSalesListTable(false);
            }}
          >
            Início
          </button>

          <button
            id="productTable"
            className="w-full h-10 text-white text-[17px] cursor-pointer rounded-md hover:bg-white hover:text-black"
            onClick={() => {
              setProductsListTable(true);
              setStartListTable(false);
              setUserListTable(false);
              setSalesListTable(false);
            }}
          >
            Produtos
          </button>

          <button
            id="userTable"
            className="w-full h-10 text-white text-[17px] cursor-pointer rounded-md hover:bg-white hover:text-black"
            onClick={() => {
              setProductsListTable(false);
              setStartListTable(false);
              setUserListTable(true);
              setSalesListTable(false);
            }}
          >
            Usuários
          </button>

          <button
            id="salesTable"
            className="w-full h-10 text-white text-[17px] cursor-pointer rounded-md hover:bg-white hover:text-black"
            onClick={() => {
              setProductsListTable(false);
              setStartListTable(false);
              setUserListTable(false);
              setSalesListTable(true);
            }}
          >
            Vendas
          </button>
        </div>
      </div>

      {startListTable && (
        <div className="flex flex-col h-140 ml-50 justify-between" id="start">
          <div className="flex-1 flex items-center justify-center gap-40">
            <div className="w-60 h-22 bg-orange-200"></div>
            <div className="w-60 h-22 bg-orange-200"></div>
          </div>

          <div className="h-40 flex items-center justify-center">
            <div className="w-160 h-100 bg-blue-400"></div>
          </div>
        </div>
      )}

      {productsListTable && (
        <div
          id="productsTableList"
          className="col-span-2 row-span-3 flex justify-center items-center text-center"
        >
          <div className="p-6 rounded-xl">
            <div className="p-6 rounded-xl shadow-[0_4px_10px]">
              <table>
                <thead>
                  <tr>
                    <th className="px-5 py-1 border bg-[#3e8840]">ID</th>
                    <th className="px-5 py-1 border bg-[#3e8840]">Produtos</th>
                    <th className="px-5 py-1 border bg-[#3e8840]">Quantidade</th>
                    <th className="px-5 py-1 border bg-[#3e8840]">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {listaProdutos.map((produto) => (
                    <tr key={produto.id}>
                      <td className="px-2 py-1 border">{produto.id}</td>
                      <td className="px-2 py-1 border">{produto.nome}</td>
                      <td className="px-2 py-1 border">{produto.quant}</td>
                      <td className="px-2 py-1 border">
                        R$ {produto.preco.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      
      {userListTable && (
        <div
          id="userTableList"
          className="col-span-2 row-span-3 flex justify-center items-center"
        >
          <div className="w-[900px] h-[300px] bg-black text-white flex items-center justify-center mx-70 rounded-xl shadow-[0_4px_10px_rgba(107,114,128,0.6)]">
            <p className="text-2xl font-bold">Tabela de Usuários</p>
          </div>
        </div>
      )}

    
      {saleListTable && (
        <div id="salesTableList" className="col-span-2 row-span-3 flex justify-center items-center">
          <div className="w-[900px] h-[300px] bg-pink-700 flex items-center justify-center rounded-xl shadow-[0_4px_10px_rgba(107,114,128,0.6)]">
            <p className="text-2xl font-bold text-white">Tabela de Vendas</p>
          </div>
        </div>
      )}
    </div>
  );
}

window.Tablet = Tablet;
