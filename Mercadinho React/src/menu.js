function Menu({ onUserClick, onCartClick, onAddClick, onCloseClick, onLogoutClick }){
    return(
        <div className="w-17 h-110 bg-[#F9FAFB] absolute right-0 grid gap-2 justify-center items-center animate__animated animate__slideInRight">
            <button 
                className="w-7 h-10 bg-[url('./assets/icons/menu/user.png')] bg-no-repeat bg-center bg-contain cursor-pointer" 
                onClick={onUserClick}
                aria-label="Login">
            </button>
            
            <button 
                className="w-7 h-10 bg-[url('./assets/icons/menu/grocery-store.png')] bg-no-repeat bg-center bg-contain cursor-pointer"
                onClick={onCartClick} 
                aria-label="Carrinho">

            </button>

            <button 
                className="w-7 h-10 bg-[url('./assets/icons/menu/plus.png')] bg-no-repeat bg-center bg-contain cursor-pointer" 
                onClick={onAddClick}
                aria-label="Adicionar produto">

            </button>
            
            <button 
                className="w-6 h-10 bg-[url('./assets/icons/menu/close.png')] bg-no-repeat bg-center bg-contain cursor-pointer" 
                onClick={onCloseClick} 
                >

            </button>
            
            <button 
                className="w-7 h-10 bg-[url('./assets/icons/menu/exit.png')] bg-no-repeat bg-center bg-contain cursor-pointer" 
                onClick={onLogoutClick}  
                aria-label="Sair">

            </button>
        </div>
    )
}

window.Menu = Menu;