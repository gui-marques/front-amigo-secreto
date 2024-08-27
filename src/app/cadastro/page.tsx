'use client'; // Adicione esta linha

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as api from '@/api/admin';
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { z } from "zod";

const Cadastro = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nameField, setNameField] = useState('');
  const [cpfField, setCpfField] = useState('');
  const [setorField, setSetorField] = useState('');
  const [chaveField, setChaveField] = useState('');
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const personSchema = z.object({
    nameField: z.string().min(1, 'Preencha o nome'),
    setorField: z.string().min(1, 'Preencha o setor'),
    chaveField: z.string().min(1, 'Preencha a chave secreta'),
    cpfField: z.string().length(11, 'CPF inválido')
  });
  const handleVoltarButton = async () => {
    setLoading(true);
    router.push('/event/1');
    setLoading(false);
  }
  const handleSaveButton = async () => {
    setErrors([]);
    const data = personSchema.safeParse({ nameField, cpfField, setorField, chaveField });
    if (!data.success) return setErrors(getErrorFromZod(data.error));

    setLoading(true);

    try {
      const eventId = 1; // Substitua pelo valor real
      const groupId = 1; // Substitua pelo valor real

      const newPerson = await api.addPerson(eventId, groupId, {
        name: nameField,
        cpf: cpfField,
        setor: setorField,
        chave: chaveField
      });

      setLoading(false);
      if (newPerson) {
        setNameField('');
        setSetorField('');
        setCpfField('');
        setChaveField('');
        alert('Cadastrado com sucesso!');
      } else {
        alert('Dados inválidos');
      }
    } catch (error) {
      setLoading(false);
      console.error('Erro ao adicionar pessoa:', error);
      alert('Erro ao cadastrar.');
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <div className="w-full max-w-md p-6 bg-gray-800 text-gray-100 rounded-lg shadow-lg">
        <div className="text-center text-2xl mb-4">Amigo Secreto <br/> ATI BRASIL</div>
        <p className="mb-3 text-xl text-center">Qual seu nome?</p>
        <input
          type="text"
          placeholder="Digite seu nome"
          className="w-full p-4 bg-white text-black text-center text-2xl outline-none rounded-lg disabled:opacity-20"
          autoFocus
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
          disabled={loading}
        />
        <p className="mb-3 pt-2 text-xl text-center">Qual seu CPF?</p>
        <input
          type="text"
          placeholder="Digite seu CPF"
          className="w-full p-4 bg-white text-black text-center text-2xl outline-none rounded-lg disabled:opacity-20"
          value={cpfField}
          onChange={(e) => setCpfField(e.target.value)}
          disabled={loading}
        />
        <p className="mb-3 pt-2 text-xl text-center">Qual seu setor?</p>
        <input
          type="text"
          placeholder="Digite seu setor"
          className="w-full p-4 bg-white text-black text-center text-2xl outline-none rounded-lg disabled:opacity-20"
          value={setorField}
          onChange={(e) => setSetorField(e.target.value)}
          disabled={loading}
        />
        <p className="mb-3 pt-2 text-xl text-center">Qual a chave secreta?</p>
        <input
          type="password"
          placeholder="Digite a chave secreta"
          className="w-full p-4 bg-white text-black text-center text-2xl outline-none rounded-lg disabled:opacity-20"
          value={chaveField}
          onChange={(e) => setChaveField(e.target.value)}
          disabled={loading}
        />
        <button
          className="w-full p-3 mt-6 rounded-lg bg-blue-800 text-white text-2xl border-b-4 border-blue-600 active:border-0 disabled:opacity-20"
          onClick={handleSaveButton}
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        <button
          className="w-full p-3 mt-6 rounded-lg bg-blue-800 text-white text-2xl border-b-4 border-blue-600 active:border-0 disabled:opacity-20"
          onClick={handleVoltarButton}
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Sair"}
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
