
import { escapeCPF } from "@/utils/escapeCPF";
import { useState } from "react";

type Props = {
    onSearchButton: (cpf: string, chave: string) => void; 
    loading: boolean;
}

export const SearchForm = ({ onSearchButton, loading }: Props) => {
    
    const [cpfInput, setCpfInput] = useState('');
    const [chaveInput, setChaveInput] = useState('');

    const handleClick = () => {     
        onSearchButton(cpfInput, chaveInput);      
    };

        const handleCadastrar = () => {        
                window.location.href = '/cadastro';  
        }

    return (
       
        <div>
            <p className="mb-3 text-xl">Qual seu CPF?</p>
            <input
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CPF"
                className="w-full p-4 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-20"
                autoFocus
                value={cpfInput}
                onChange={e => setCpfInput(escapeCPF(e.target.value))}
                disabled={loading}
            />
            <p className="mb-1 p-2 text-xl">Qual a palavra secreta?</p>
            <input
                type="password"
                placeholder="Digite a sua senha"
                className="w-full p-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-20"
                value={chaveInput}
                onChange={e => setChaveInput(e.target.value)}
                disabled={loading}
            />
            
            <button
                className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-0 disabled:opacity-20"
                onClick={handleClick} 
                disabled={loading}
            >
                {loading ? 'Buscando...' : 'Entrar'}
            </button>
{/*             <button
                className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-0 disabled:opacity-20"
                onClick={handleCadastrar} 
                disabled={loading}
            >
                {loading ? 'Buscando...' : 'Cadastrar'}
            </button> */}
            
        </div>
   
    );
}
