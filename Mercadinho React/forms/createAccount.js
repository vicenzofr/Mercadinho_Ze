function CreateAccount({onClose}){
   return(
       <div  className="w-100 h-120 bg-[#F9FAFB] mt-45 rounded-lg border-1 border-[#898989]">
            <div className=" relative flex justify-center items-center mt-7">
                <button
                    onClick={onClose}
                    className="absolute left-10 w-6 h-6 bg-cover bg-[url('./assets/icons/arrow.png')] cursor-pointer ">
                </button>
                <h1 
                    className="text-3xl font-bold  text-[#4EB352] ">
                        Create Account
                </h1>
            </div>

            <div 
                className="flex flex-col mt-12 justify-center items-center" id="createEmail">
                <label className="flex flex-col font-bold text-[15px] text-black">
                 Email
                    <input 
                        id="emailcreate" 
                        type="email" 
                        className=" w-70 h-8 border-1 border-[#898989] rounded-md text-sm pl-2 mt-2 font-normal" 
                        placeholder="user@gmail.com">
                    </input>
                </label>
            </div>
            <div 
                className="flex flex-col mt-7 justify-center items-center" id="createPassword">
                <label className="flex flex-col font-bold text-[15px] text-black">
                 Password
                    <input 
                        id="passwordcreate" 
                        type="password" 
                        className="w-70 h-8 border-1 border-[#898989] rounded-md text-sm pl-2 mt-2 font-normal" 
                        placeholder="••••••••••">
                    </input>
                </label>
            </div>

             <div 
                className="justify-center items-center flex mt-14"
                id="submit">
                    <button 
                        type="submit" 
                        className="w-50 h-10 bg-[#4EB352]  rounded-lg cursor-pointer font-bold text-white">
                            Submit
                    </button>
            </div>     
       </div>   
    )
}

window.CreateAccount = CreateAccount;