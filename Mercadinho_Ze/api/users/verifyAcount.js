// // import "./PassowordCrypto.ts"
// // import { genSalt, hash, compare } from "bcryptjs";
// // import

// function UsuariosDisponiveis() {
//   const [listaUsuarios, setListaUsuarios] = useState([]);

//   // função reutilizável que busca a lista do backend
//   const fetchUsuarios = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/users");
//       const users = await response.json();
//       setListaUsuarios(users);
//       console.log("Usuarios no banco:", users); //REMOVER ISSO DEPOIS PELO AMOR DE DEUS 
//     } catch (error) {
//       console.error("Erro ao buscar Usuarios:", error.message);
//     }
//   };

//   const verifyPassword = async (password, hashedPassword) => {
//     return await compare(password, hashedPassword);
//   };

//   useEffect(() => {
//     fetchUsuarios();
//   }, []);

//   // precisa retornar algo
//   return (
//     <div>
//       <h1>Lista de Usuários</h1>
//       <ul>
//         {listaUsuarios.map((user) => (
//           <li key={user.id}>{user.nome}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// window.UsuariosDisponiveis = UsuariosDisponiveis;





// function CreateAccount() {
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");
    
//     const addUser = async (e) => {

//         if (e) e.preventDefault();
//         try {
//         const conteudo = JSON.stringify({ email, password });
//         console.log("Usuario adicionado: pre post", conteudo);

//         const response = await fetch("http://localhost:3000/users", {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//             body: conteudo,
//         });

//         if (!response.ok) throw new Error("Erro ao adicionar Usuario");

//         const data = await response.json();
//         console.log("Usuario adicionado: pos post", data);

//         setEmail("");
//         setPassword("");
//         window.dispatchEvent(new CustomEvent("UsuarioAdicionado", { detail: data }));
//         } catch (error) {
//         console.error("Erro:", error.message);
//         }
//     };

// }

// const verifyPassword = async (password: string, hashedPassword: string) => {
//   return await compare(password, hashedPassword);
// };

// const verifyEmail = async 