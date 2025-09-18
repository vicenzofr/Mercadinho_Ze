function Tablet({ onAddClick }) {
  const [productsListTable, setProductsListTable] = React.useState(false);
  const [userListTable, setUserListTable] = React.useState(false);
  const [saleListTable, setSalesListTable] = React.useState(false);
  const [AddProducts, setAddProducts] = React.useState(false);
  const [startListTable, setStartListTable] = React.useState(true);
  const [listProducts, setListProducts] = React.useState([]);
  const [listUsers, setListUsers] = React.useState([]);

  const refreshAll = React.useCallback(async () => {
  try {
    const [respUser, respProdutos] = await Promise.all([
      fetch("http://localhost:3000/users"),
      fetch("http://localhost:3000/products"),
    ]);

    const [users, produtos] = await Promise.all([respUser.json(), respProdutos.json()]);

    setListUsers(users);
    setListProducts(produtos);

    console.log("Usuarios:", users);
    console.log("Produtos:", produtos);
  } catch (err) {
    console.error("Erro ao buscar dados:", err instanceof Error ? err.message : err);
  }
  }, []);
  React.useEffect(() => {
      refreshAll();
  }, [refreshAll]);


  // const refreshUsers = React.useCallback(async () => {
  //   try {
  //     const respUser = await fetch("http://localhost:3000/users");
  //     const user = await respUser.json();
  //     setListUsers(user);
  //     console.log("Usuarios no banco:", user);
  //   } catch (err) {
  //     console.error("Erro ao buscar Usuario:", err.message);
  //   }
  // }, []);

  //   const refreshProdutos = React.useCallback(async () => {
  //   try {
  //     const resp = await fetch("http://localhost:3000/products");
  //     const produtos = await resp.json();
  //     setListaProdutos(produtos);
  //     console.log("Produtos no banco:", produtos);
  //   } catch (err) {
  //     console.error("Erro ao buscar produtos:", err.message);
  //   }
  // }, []);

  //   React.useEffect(() => {
  //   refreshUsers();
  // }, [refreshUsers]);

    const handleRemoveUser = async (user) => {
        // e.stopPropagation(); 
    try {
        const confirmar = window.confirm(`Certeza que deseja remover o produto ${user.nome}?`);
        if (!confirmar) return;
        const response = await fetch(`http://localhost:3000/user/delete/${user.id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error("Status:", response.status);
            throw new Error("Erro ao remover o Usuario");
        }

        const removeData = await response.json();
        console.log("Usuario removido:", removeData);

        // listUsers((prevUser) =>
        // prevUser.filter((p) => p.id !== user.id)
        setListUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

      // Atualiza lista
        const userResponse = await fetch("http://localhost:3000/users");
        const Users = await userResponse.json();
        setListUsers(Users);
        await refreshProdutos();

    } catch (error) {
      console.error("Erro ao deletar o Usuario:", error.message);
    }
  }



    const handleRemoveProduct = async (produto) => {
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

        setListProducts((prevProdutos) =>
        prevProdutos.filter((p) => p.id !== produto.id)
    );

      // Atualiza lista
        const productsResponse = await fetch("http://localhost:3000/products");
        const products = await productsResponse.json();
        setListProducts(products);
        await refreshProdutos();

    } catch (error) {
      console.error("Erro ao deletar o produto:", error.message);
    }
    [setListProducts] 
  }
  



  
  return (
    <div
      id="tableMenu"
      className="w-[1200px] h-[720px] bg-[#a6adb442] flex rounded-3xl mt-10 shadow-xl/20 shadow-[0_4px_10px_rgba(107,114,128,0.6)]"
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
                setAddProducts(false);
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
                setAddProducts(false);

              }}
            >
              <span className="w-6 flex justify-center">
                <i className="pi pi-box text-1xl"></i>
              </span>
              <span className="ml-2">Produtos</span>
            </button>

            <button
              className="w-full h-10 text-white text-[15px] cursor-pointer rounded-md hover:bg-white hover:text-black flex items-center justify-start px-4"
              onClick={() => {
                setProductsListTable(false);
                setStartListTable(false);
                setUserListTable(false);
                setSalesListTable(false);
                setAddProducts(true);           // ← abre formulário
                if (onAddClick) onAddClick();   // opcional para o pai
              }}
            >
              <span className="w-6 flex justify-center">
                <i className="pi pi-plus text-1xl"></i>
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
                setAddProducts(false);   
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
        <div
          id="start"
          className="flex flex-col items-center justify-center flex-1 text-center"
        >
          {/* CARDS */}
          <div className="flex gap-10 mb-10">
            {/* TOTAL DE PRODUTOS */}
            <div className="w-64 bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-md">
                  <i className="pi pi-box text-[#4EB352] text-xl"></i>
                </div>
                <span className="text-gray-600 font-medium">Total Produtos</span>
              </div>
              <div className="bg-gray-100 rounded-md px-4 py-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {listProducts.length.toLocaleString()} {/*isso aqui vai pegar a quantidade de produtos do banco e colocara ai */}
                </h1>
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
                <h1 className="text-3xl font-bold text-gray-900">
                  {listUsers.length.toLocaleString()}
                </h1>
              </div>
            </div>
          </div>

          {/* GRÁFICO */}
          <div className="flex items-center justify-center">
            <div className="w-[500px] h-[300px] bg-blue-400 rounded-lg"></div>
          </div>
        </div>
      )}

      {productsListTable && (
        <div
          id="productsTableList"
          className="flex-1 flex items-center justify-center text-center"
        >
          <div className="p-6 rounded-xl">
            <div className="p-6 rounded-xl border border-gray-300 bg-white shadow-md">
              <div className="max-h-100 overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-300 text-[14px]">
                      <th className="px-10 py-1">ID</th>
                      <th className="px-10 py-1">Produtos</th>
                      <th className="px-10 py-1">Quantidade</th>
                      <th className="px-10 py-1">Preço</th>
                      <th className="px-2 py-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listProducts.map((produto) => (
                      <tr key={produto.id}>
                        <td className="px-10 py-1 border-b border-gray-300">
                          {produto.id}
                        </td>
                        <td className="px-10 py-1 border-b border-gray-300 flex items-center gap-2">
                          <img 
                            src={produto.img ? `data:image/png;base64,${produto.img}` : `./assets/food/${produto.nome}.png`} 
                            className="w-7 h-7 rounded-md object-cover" 
                          />
                          {produto.nome}
                        </td>
                        <td className="px-10 py-1 border-b border-gray-300">
                          {produto.quantidade}
                        </td>
                        <td className="px-10 py-1 border-b border-gray-300">
                          R$ {produto.preco.toFixed(2)}
                        </td>
                        <td className="px-4 py-1 border-b border-gray-300">
                          <button
                            type="button"
                            className="bg-[url('./assets/icons/delete.png')] w-4 h-4 bg-no-repeat bg-center bg-contain cursor-pointer"
                            onClick={() => handleRemoveProduct(produto)}
                          ></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {AddProducts && (
        <div className="flex-1 flex items-center justify-center p-6 ">
          <div className="w-full max-w-[520px]">
            <window.AdicionarProdutos
              onAdded={() => {
                refreshProdutos();
                setAddProducts(false);
                setProductsListTable(true);
              }}
            />
          </div>
        </div>
      )}

      {userListTable && (
         <div
          id="productsTableList"
          className="flex-1 flex items-center justify-center text-center"
        >
          <div className="p-6 rounded-xl">
            <div className="p-6 rounded-xl border border-gray-300 bg-white shadow-md">
              <div className="max-h-100 overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-300 text-[14px]">
                      <th className="px-10 py-1">ID</th>
                      <th className="px-10 py-1">Login</th>
                      <th className="px-10 py-1">Tipo</th>
                      <th className="px-2 py-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-10 py-1 border-b border-gray-300">
                          {user.id}
                        </td>
                        <td className="px-10 py-1 border-b border-gray-300 flex items-center gap-2">
                          {user.email}
                        </td>
                        <td className="px-10 py-1 border-b border-gray-300">
                          ADMIN
                        </td>
                        <td className="px-4 py-1 border-b border-gray-300">
                          <button
                            type="button"
                            className="bg-[url('./assets/icons/delete.png')] w-4 h-4 bg-no-repeat bg-center bg-contain cursor-pointer"
                            onClick={() => handleRemoveUser(user)}
                          ></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

window.Tablet = Tablet;
