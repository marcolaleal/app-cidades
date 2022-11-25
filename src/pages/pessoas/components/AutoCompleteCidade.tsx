import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean;
}


export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({isExternalLoading = false}) => {
    const {fieldName, registerField, defaultValue, error, clearError} =useField('cidadeId');
    const { debounce } = useDebounce();

    const [opcoes,setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [isLoading,setIsLoading] = useState(false);
    const [busca,setBusca] = useState('');
    const [selectedId,setSelectedId] = useState<number | undefined>(defaultValue);

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        });
    },[registerField,fieldName,selectedId]);

    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            CidadesService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        //alert(result.message);
                    } else {
                        setOpcoes(result.data.map(cidade => ({id: cidade.id, label: cidade.nome})));
                    }
                });
        });
    },[busca] );

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (!selectedId) return null;

        return selectedOption;
    },[selectedId,opcoes]);

    return (
        <Autocomplete

            openText='Abrir'
            closeText='Fechar'
            noOptionsText='Sem Opções'
            loadingText= 'Carregando...'
            
            /* Faz o componente de opçoes ficar grudado na input de texto */
            disablePortal

            options={opcoes}
            loading={isLoading}
            disabled={isExternalLoading}
            value={autoCompleteSelectedOption}
            onChange={(_,newValue) => setSelectedId(newValue?.id)}
            popupIcon={isExternalLoading || isLoading ? <CircularProgress  size={28}/> : undefined}
            

            onInputChange={(_,newValue) => {setBusca(newValue); setBusca('');clearError();}}
            renderInput={(params) => (
                <TextField 
                    {...params}
                    error={!!error}
                    helperText={error}
                    label='cidade'
                />
            ) }
        
        />
    );
};