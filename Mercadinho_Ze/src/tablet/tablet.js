function Tablet() {
    const [productsListTable, setProductsListTable] = React.useState(false);
    const [userListTable, setUserListTable] = React.useState(false);
    const [saleListTable, setSalesListTable] = React.useState(false);
    const [startListTable, setStartListTable] = React.useState(true);
    
    return (
        <div className="w-[1200px] h-[720px] bg-[#a6adb442] relative rounded-3xl justify-center items-center mt-10 ">
            <div className="absolute top-0 left-0 w-50 h-full bg-[#3e8840] rounded-l-3xl flex items-center justify-center">
                <div id="buttonTable" className="pt-4 space-y-3">
                    <button id="startTable" className="w-full h-10 text-white text-[17px] cursor-pointer rounded-md hover:bg-white hover:text-black"  
                    onClick={() => {
                        setProductsListTable(false);
                        setStartListTable(true);
                        setUserListTable(false);
                        setSalesListTable(false);
                    }}>
                        Início
                    </button>
                    
                    <button id="productTable" className="w-full h-10 text-white text-[17px] cursor-pointer rounded-md hover:bg-white hover:text-black"  
                    onClick={() => {
                        setProductsListTable(true);
                        setStartListTable(false);
                        setUserListTable(false);
                        setSalesListTable(false);
                    }}>
                        Produtos
                    </button>
                    
                    <button id="userTable" className="w-full h-10 text-white text-[17px] cursor-pointer rounded-md  hover:bg-white hover:text-black"
                    onClick={() => {
                        setProductsListTable(false);
                        setStartListTable(false);
                        setUserListTable(true);
                        setSalesListTable(false);
                    }}>
                        Usuários
                    </button>
                    <button id="salesTable" className="w-full h-10 text-white text-[17px] cursor-pointer rounded-md  hover:bg-white hover:text-black"
                    onClick={() => {
                        setProductsListTable(false);
                        setStartListTable(false);
                        setUserListTable(false);
                        setSalesListTable(true);
                    }}>
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
                <div id="productsTableList" className="w-100 h-30 bg-green-700"> </div>
            )}

            {userListTable && (
                <div id="userTableList" className="w-100 h-30 bg-blue-700"> </div>
            )}

            {saleListTable && (
                <div id="salesTableList" className="w-100 h-30 bg-pink-700"> </div>
            )}
        </div>
    );
}

window.Tablet = Tablet;
