function Menu({ onUserClick, onCartClick, onAddClick, onCloseClick, onLogoutClick }){
    return(
        <div className="w-17 h-110 bg-[#F9FAFB] absolute right-0 grid gap-2 justify-center items-center animate__animated animate__slideInRight">
            <button 
                className="w-7 h-10 bg-[url('./assets/icons/menu/user.png')] bg-no-repeat bg-center bg-contain cursor-pointer transition-transform duration-300 hover:scale-120" 
                onClick={onUserClick}
                aria-label="Login">
            </button>
            
            <button 
                className="w-7 h-10 bg-[url('./assets/icons/menu/grocery-store.png')] bg-no-repeat bg-center bg-contain cursor-pointer transition-transform duration-300 hover:scale-120"
                onClick={onCartClick} 
                aria-label="Carrinho">

            </button>

            <button 
                className="w-7 h-10 bg-[url('./assets/icons/menu/plus.png')] bg-no-repeat bg-center bg-contain cursor-pointer transition-transform duration-300 hover:scale-120" 
                onClick={onAddClick}
                aria-label="Adicionar produto">

            </button>
            
            <button 
                className="w-7 h-10 bg-[url('./assets/icons/menu/tablet.png')] bg-no-repeat bg-center bg-contain cursor-pointer transition-transform duration-300 hover:scale-120" 
                onClick={onCloseClick} 
                >

            </button>
            
            <button 
                className="w-7 h-10 bg-[url('./assets/icons/menu/exit.png')] bg-no-repeat bg-center bg-contain cursor-pointer transition-transform duration-300 hover:scale-120" 
                onClick={onLogoutClick}  
                aria-label="Sair">

            </button>
        </div>
    )
}

window.Menu = Menu;