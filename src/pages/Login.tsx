import Input from "../components/Input";
import Lbutton from "../components/Lbutton";

function Login() {
  return (
    <div className="bg-[#FCF1DD] min-h-screen min-w-screen flex items-center justify-center font-mono">
      <div className="flex justify-center items-center flex-col gap-14">
        <h1 className="font-semibold text-4xl">Fazer Login</h1>
        <div className="flex justify-center items-center flex-col gap-3">
          <Input type="email" placeholder="E-mail"/>
          <Input type="password" placeholder="Senha" />
        </div>
        <Lbutton />
      </div>
    </div>
  );
}

export default Login;
