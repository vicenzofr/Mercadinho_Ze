function Forms({ onClose, onCreateAccount = () => {} }){
    return(
        <div className="w-100 h-120 bg-[#F9FAFB] mt-45 rounded-lg border-1 border-[#898989]">
            <h1 
                className="text-3xl font-bold text-center text-[#4EB352] mt-7">
                    Sign In
            </h1>

            <div 
                className="flex flex-col mt-12 justify-center items-center" id="divEmail">
                <label className="flex flex-col font-bold text-[15px] text-black">
                 Email
                    <input 
                        id="email" 
                        type="email" 
                        className=" w-70 h-8 border-1 border-[#898989] rounded-md text-sm pl-2 mt-2 font-normal" 
                        placeholder="user@gmail.com">
                    </input>
                </label>
            </div>
            <div 
                className="flex flex-col mt-7 justify-center items-center" id="divPassword">
                <label className="flex flex-col font-bold text-[15px] text-black">
                 Password
                    <input 
                        id="password" 
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

            <div
                className="mt-5 text-center">
                    <button
                        type="button"
                        onClick={onCreateAccount}
                        className="text-blue-600 hover:underline text-[16px] cursor-pointer">
                            Create account
                    </button>

                    <a href="" className="text-blue-600 hover:underline text-[16px] ml-8">
                        Forgot password ?
                    </a>
            </div>

            <div
                className="text-center">
                <button
                    onClick={onClose}
                    className="h-10 w-10 hover:underline text-blue-600 cursor-pointer">
                        Back
                </button>
            </div>
        </div>
    )
}

window.Forms = Forms;