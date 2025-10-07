function App() {
  
  const [tela, setTela] = React.useState("site");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [painel, setPainel] = React.useState("cart");
  const [removeMode, setRemoveMode] = React.useState(false);
  const [tablet, setTablet] = React.useState(false);
  const [productsList, setProductsList] = React.useState(true);
  

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      {tela === "login" && (
        <window.Forms
          onClose={() => setTela("site")}
          onCreateAccount={() => setTela("signup")}
          onforgotPassword={() => setTela("forgot")}
        />
      )}

      {tela === "signup" && (
        
        <window.CreateAccount onClose={() => setTela("login")} />
        
      )}

       {tela === "forgot" && (
        <window.forgotPassword onClose={() => setTela("login")} />
      )}
      
      {tela === "site" && (
    
      <>
      <div className="w-full">
        <Header
          onLoginClick={() => setTela("login")}
          onMenuClick={() => setMenuOpen(v => !v)}
        />
      </div>


        {/* menu aparece só quando menuOpen == true */} 
        {menuOpen && (
          <div 
            className="w-full flex justify-end px-4 relative">
            <window.Menu
            onUserClick={() => setTela("login")}
            onCartClick={() => { 
              setPainel("cart"); 
              setMenuOpen(false); 
              setRemoveMode(false);  
              setTablet(false);
              setProductsList(true);
            }}
            onAddClick={() => {
              setPainel("add");
              setMenuOpen(false);
              setRemoveMode(false);
              setTablet(true);
              setProductsList(false);
            }}
            onCloseClick={() => {
              setTablet(true);
              setProductsList(false);
              setMenuOpen(false);
            }}
            />
          </div>
        )}
        {tablet && (
        <window.Tablet/>
        )}

         {/* <window.Tablet/> */}
          
      {productsList && (<div className="flex-1 mt-6 grid grid-cols-[3fr_1fr] gap-12 items-start pb-30">
        <div>
          <window.ProdutosDisponiveis removivel={removeMode} />
        </div>
      
         

        <div className="flex flex-col gap-10 mb-10">
          {/* {painel === 'cart' ? <window.Carrinho /> : <window.AdicionarProdutos />} */}
          <window.Carrinho />
          </div>
        </div>
      )}
      </>
      
      )}

      <div className="w-full mt-50">
        <window.Footer />
      </div>

      {/* <window.UsuariosDisponiveis/> */}
    </main>    
  );
}

ReactDOM.createRoot(document.getElementById("mercado")).render(<App />);