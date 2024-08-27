import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useState } from "react";
import { InputField } from "../InputField";
import { escapeCPF } from "@/utils/escapeCPF";
import { Button } from "../Button";
import { z } from "zod";
import * as api from '@/api/admin';

type Props = {
    eventId: number;
    groupId: number;
    refreshAction: () => void;
}

export const PersonAdd = ({ eventId, groupId, refreshAction }: Props) => {
    const [nameField, setNameField] = useState('');
    const [cpfField, setCpfField] = useState('');
    const [setorField, setSetorField] = useState('');
    const [chaveField, setChaveField] = useState('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        setorField: z.string().min(1, 'Preencha o setor'),
        chaveField: z.string().min(1, 'Preencha a chave secreta'),
        cpfField: z.string().length(11, 'CPF inválido')
    });



    const handleSaveButton = async () => {
        setErrors([]);
        const data = personSchema.safeParse({ nameField, cpfField, setorField, chaveField });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
    
        setLoading(true);
    
        try {
            
            // Adiciona a nova pessoa
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
                refreshAction();
                alert('Adicionado com sucesso!')
            } else {
                alert('Dados invalidos');
            }
        } catch (error) {
            setLoading(false);
            console.error('Erro ao adicionar pessoa:', error);
            alert('CPF já existente.');
        }
    }

    return (
        <div>
            <h4 className="text-xl">Nova Pessoa</h4>
            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome da pessoa"
                errorMessage={errors.find(item => item.field === 'nameField')?.message}
                disabled={loading}
            />
            <InputField
                value={setorField}
                onChange={e => setSetorField(e.target.value)}
                placeholder="Digite o setor da pessoa"
                errorMessage={errors.find(item => item.field === 'setorField')?.message}
                disabled={loading}
            />
            <InputField
                value={chaveField}
                onChange={e => setChaveField(e.target.value)}
                placeholder="Digite a chave da pessoa"
                errorMessage={errors.find(item => item.field === 'chaveField')?.message}
                disabled={loading}
            />
            <InputField
                value={cpfField}
                onChange={e => setCpfField(escapeCPF(e.target.value))}
                placeholder="Digite o CPF da pessoa"
                errorMessage={errors.find(item => item.field === 'cpfField')?.message}
                disabled={loading}
            />
            <div>
                <Button
                    value={loading ? 'Adicionando...' : 'Adicionar'}
                    onClick={handleSaveButton}
                />
            </div>
        </div>
    );
}
