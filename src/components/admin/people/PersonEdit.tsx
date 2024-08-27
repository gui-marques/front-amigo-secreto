import { PersonComplete } from "@/types/PersonComplete";
import * as api from '@/api/admin';
import { useEffect, useState } from "react";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { z } from "zod";
import { InputField } from "../InputField";
import { escapeCPF } from "@/utils/escapeCPF";
import { Button } from "../Button";

type Props = {
    person: PersonComplete;
    refreshAction: () => void;
}
export const PersonEdit = ({ person, refreshAction }: Props) => {
    const [nameField, setNameField] = useState(person.name);
    const [setorField, setSetorField] = useState(person.setor);
    const [chaveField, setChaveField] = useState(person.chave);
    const [cpfField, setCpfField] = useState(person.cpf);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        setorField: z.string().min(1, 'Preencha o setor'),
        chaveField: z.string().min(1, 'Preencha a chave'),
        cpfField: z.string().length(11, 'CPF inválido')
    });

    useEffect(() => {
        setErrors([]);
        const data = personSchema.safeParse({ nameField, cpfField, setorField, chaveField });
        if (!data.success) setErrors(getErrorFromZod(data.error));
    }, [nameField, cpfField, setorField, chaveField]);

    const handleSaveButton = async () => {
        if (errors.length > 0) return;

        setLoading(true);
        const updatedPerson = await api.updatePerson(
            person.id_event, person.id_group, person.id,
            { name: nameField, cpf: cpfField, setor: setorField, chave: chaveField }
        );
        setLoading(false);
        if (updatedPerson) {
            refreshAction();
        } else {
            alert('Ocorreu um erro');
        }

    }

    return (
        <div>
            <h4 className="text-xl">Editar Pessoa</h4>
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
                type="password"
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
            <div className="flex gap-3">
                <Button
                    value="Cancelar"
                    onClick={refreshAction}
                    disabled={loading}
                />
                <Button
                    value={loading ? 'Salvando...' : 'Salvar'}
                    onClick={handleSaveButton}
                    disabled={loading}
                />
            </div>
        </div>
    );
}