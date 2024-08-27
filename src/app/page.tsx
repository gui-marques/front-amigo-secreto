'use client'; // Adicione esta linha

import { Button } from "@/components/admin/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";


const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleLoginAdminButton = async () => {
    setLoading(true);
    router.push('/admin/login');
    setLoading(false);
  }
  const handlecadastroButton = async () => {
    setLoading(true);
    router.push('/cadastro');
    setLoading(false);
  }
  return (
    <div className="text-center text-4xl">
      <h1 className="text-center text-4xl my-3">ATIBrasil - Amigo Secreto</h1>
   
      <Button
                    value={loading ? 'Carregando...' : 'Painel do administrador'}
                    onClick={handleLoginAdminButton}
                    disabled={loading}                    
                />    
      
    </div>
  );
}

export default Page;