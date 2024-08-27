'use client'; // Adicionado para permitir interatividade no componente

import { ReactNode } from "react";
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';



type Props = { children: ReactNode }

const Layout = ({ children }: Props) => {
    const router = useRouter();

    const handleLogout = () => {
        deleteCookie('token');  // Substitua 'token' pelo nome do cookie que você deseja remover
        router.push('/admin/login');  // Redireciona para a página de login após o logout
    }

    return (
        <div>          
            <header className="bg-gray-800 text-center py-5 flex justify-between items-center px-10">
                <div className="justify-center mx-auto">
                    <h3 className="text-3xl ">ATIBrasil</h3>
                    <h4 className="text-base">Painel de Controle</h4>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </header>
            <main className="mx-auto w-full max-w-3xl p-3">{children}</main>
        </div>
    );
}

export default Layout;
