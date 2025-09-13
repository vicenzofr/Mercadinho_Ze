// import 'primeicons/primeicons.css';
// import { CiHome } from "react-icons/ci";


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

    const handleRemove = async (produto) => {
        // e.stopPropagation(); 
    try {
        const confirmar = window.confirm(`Certeza que deseja remover o produto ${produto.nome}?`);
        if (!confirmar) return;
        const response = await fetch(`http://localhost:3000/product/delete/${produto.id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error("Status:", response.status);
            throw new Error("Erro ao remover o produto");
        }

        const removeData = await response.json();
        console.log("Produto removido:", removeData);

        setListaProdutos((prevProdutos) =>
        prevProdutos.filter((p) => p.id !== produto.id)
    );

      // Atualiza lista
        const productsResponse = await fetch("http://localhost:3000/products");
        const products = await productsResponse.json();
        setListaProdutos(products);

    } catch (error) {
      console.error("Erro ao deletar o produto:", error.message);
    }
  }

  return (
    <div
      id="tableMenu"
      className="w-[1200px] h-[720px] bg-[#a6adb442] grid grid-cols-3 grid-rows-3 gap-0 rounded-3xl mt-10 shadow-xl/20 shadow-[0_4px_10px_rgba(107,114,128,0.6)]"
    >
      <div
        id="greenMenu"
        className="w-[180px] row-span-3 bg-[#3e8840] rounded-l-3xl "
      >
        {/* DASHBOARD */}
        <div id="buttonTable" className="pt-4 space-y-3 w-full px-4 mt-10">
            <p className="text-[13px] text-gray-300">Dashboard</p>
            <div id="menuDashboard" className="text-center justify-center items-center"> 
            <button
              id="startTable"
              className="w-full h-10 text-white text-[15px] cursor-pointer rounded-md hover:bg-white hover:text-black flex items-center justify-start px-4"
              onClick={() => {
                setProductsListTable(false);
                setStartListTable(true);
                setUserListTable(false);
                setSalesListTable(false);
              }}
            >
            <span className="w-6 flex justify-center">
              <i class="pi pi-home text-1xl"></i>
            </span>
            <span className="ml-2">Dashboard</span>
            </button>
          </div>

          {/* PRODUTOS */}

          <p className="text-[13px] text-gray-300">Produtos</p>
          
          <div id="menuProducts" className="text-center justify-center items-center">
            <button
              className="w-full h-10 text-white text-[15px] cursor-pointer rounded-md hover:bg-white hover:text-black flex items-center justify-start px-4"
              onClick={() => {
                setProductsListTable(true);
                setStartListTable(false);
                setUserListTable(false);
                setSalesListTable(false);
              }}
            >
              {/* wrapper com largura fixa para alinhar */}
              <span className="w-6 flex justify-center">
                <i className="pi pi-box text-1xl"></i>
              </span>
              <span className="ml-2">Produtos</span>
            </button>

            <button
              className="w-full h-10 text-white text-[15px] cursor-pointer rounded-md hover:bg-white hover:text-black flex items-center justify-start px-4"
              onClick={() => {
                setProductsListTable(true);
                setStartListTable(false);
                setUserListTable(false);
                setSalesListTable(false);
              }}
            >
              <span className="w-6 flex justify-center">
                <i className="pi pi-box text-1xl"></i>
              </span>
              <span className="ml-2">Adicionar</span>
            </button>
          </div>

          {/* USUARIOS */}

          <p className="text-[13px] text-gray-300">Usuários</p>
          
          <div id="menuUsers"  className="text-center justify-center items-center"> 
            <button
              id="userTable"
              className="w-full h-10 text-white text-[15px] cursor-pointer rounded-md hover:bg-white hover:text-black flex items-center justify-start px-4"
              onClick={() => {
                setProductsListTable(false);
                setStartListTable(false);
                setUserListTable(true);
                setSalesListTable(false);
              }}
            >
               <span className="w-6 flex justify-center">
                <i className="pi pi-users text-1xl"></i>
              </span>
              <span className="ml-2">Usuários</span>
            
            </button>
          </div>
        </div>
      </div>

     {startListTable && (
      <div className="col-span-2 row-span-3 flex flex-col items-center text-center justify-center " id="start">
        <div className="flex gap-10 mb-10 justify-center">
          {/* TOTAL DE PRODUTOS */}
          <div className="w-64 bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-md">
                <i className="pi pi-box text-[#4EB352] text-xl"></i>
              </div>
              <span className="text-gray-600 font-medium">Total Produtos</span>
            </div>
            <div className="bg-gray-100 rounded-md px-4 py-3">
              <h1 className="text-3xl font-bold text-gray-900">25,154</h1>
            </div>
          </div>

          {/* TOTAL NO CAIXA */}
          <div className="w-64 bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-md">
                <i className="pi pi-dollar text-[#4EB352] text-xl"></i>
              </div>
              <span className="text-gray-600 font-medium">Total Caixa</span>
            </div>
            <div className="bg-gray-100 rounded-md px-4 py-3">
              <h1 className="text-3xl font-bold text-gray-900">R$10,154</h1>
            </div>
          </div>

          {/* TOTAL DE USUÁRIOS */}
          <div className="w-64 bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-md">
                <i className="pi pi-users text-[#4EB352] text-xl"></i>
              </div>
              <span className="text-gray-600 font-medium">Total Usuários</span>
            </div>
            <div className="bg-gray-100 rounded-md px-4 py-3">
              <h1 className="text-3xl font-bold text-gray-900">3</h1>
            </div>
          </div>
        </div>

        {/* GRÁFICO */}
        <div className="flex items-center justify-center mt-10">
          <div className="w-150 h-90 bg-blue-400"></div>
        </div>
      </div>
    )}



      {productsListTable && (
        <div
          id="productsTableList"
          className="col-span-2 row-span-3 flex items-center text-center"
        >
          <div className="p-6 rounded-xl">
            <div className="p-6 rounded-xl border-1 border-gray-300 bg-white">
              <table>
                <thead>
                  <tr className="bg-gray-300 text-[14px]">
                    <th className="px-10 py-1">ID </th>
                    <th className="px-10 py-1">Produtos</th>
                    <th className="px-10 py-1">Quantidade</th>
                    <th className="px-10 py-1">Preço</th>
                    <th className="px-2 py-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {listaProdutos.map((produto) => (
                    <tr key={produto.id}>
                    <td className="px-10 py-1 border-b border-gray-300">{produto.id}</td>
                    <td className="px-10 py-1 border-b  border-gray-300">{produto.nome}</td>
                    <td className="px-10 py-1 border-b  border-gray-300">{produto.quant}</td>
                    <td className="px-10 py-1 border-b  border-gray-300">R$ {produto.preco.toFixed(2)}</td>
                    <td className="px-4 py-1 border-b  border-gray-300">
                        <button 
                            type="button" 
                            className="bg-[url('./assets/icons/delete.png')] w-4 h-4 bg-no-repeat bg-center bg-contain cursor-pointer"  
                            onClick={() => handleRemove(produto)}>
                        </button>
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
          id="productsTableList"
          className="col-span-2 row-span-3 flex items-center text-center"
        >
          <div className="p-6 rounded-xl">
            <div className="p-6 rounded-xl shadow-[0_4px_10px] ">
              <table>
                <thead>
                  <tr>
                    <th className="px-5 py-1 border-b">ID </th>
                    <th className="px-10 py-1 border-b">Usuario</th>
                    <th className="px-5 py-1 border-b">Tipo</th>
                    {/* <th className="px-5 py-1 border-b">Preço</th> */}
                    <th className="px-2 py-1 border-b"></th>
                  </tr>
                </thead>
                <tbody>

                  {/* quando tiver o banco de dados do usuario vai ser chamado aqui  */}
                  {listaProdutos.map((produto) => (
                    <tr key={produto.id}>
                    <td className="px-15 py-1 border-b ">{produto.id}</td>
                    <td className="px-15 py-1 border-b">Vicenzofr@gmail.com</td>
                    <td className="px-10 py-1 border-b">ADMIN</td>
                    {/* <td className="px-2 py-1 border-b">R$ {produto.preco.toFixed(2)}</td> */}
                    <td className="px-2 py-1 border-b">
                        <button 
                            type="button" 
                            className="bg-[url('./assets/icons/close.png')] w-3 h-3 bg-no-repeat bg-center bg-contain cursor-pointer"  
                            onClick={() => handleRemove(produto)}>
                        </button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    
      {/* {saleListTable && (
        <div id="salesTableList" className="col-span-2 row-span-3 flex justify-center items-center">
          <div className="w-[900px] h-[300px] bg-pink-700 flex items-center justify-center rounded-xl shadow-[0_4px_10px_rgba(107,114,128,0.6)]">
            <p className="text-2xl font-bold text-white">Tabela de Vendas</p>
          </div>
        </div>
      )} */}
    </div>
  );
}

window.Tablet = Tablet;
