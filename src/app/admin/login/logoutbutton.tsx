'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        deleteCookie('token');  // Substitua 'token' pelo nome do cookie que você deseja remover
        router.push('/login');  // Redireciona para a página de login após o logout
    }

    return (
        <button 
            onClick={handleLogout} 
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
            Logout
        </button>
    );
}

export default LogoutButton;
