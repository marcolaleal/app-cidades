import React, { useEffect, useMemo, useState } from 'react';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { IListagemPessoa, PessoaService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';



export const ListagemDePessoas: React.FC = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(700);

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    },[searchParams]);

    useEffect(() => {
        //faz o set nos isLoading como true antes de iniciar a consulta no banco de daos
        setIsLoading(true);

        //usa um hook customizado (useDebounce) para dar um delay na consulta ao backend
        //a consulta so será feita apos o usuraio ficar um certo tempo sem digitar no campos pesquisar
        //para evitar que a cada letra seja feita uma nova consulta
        debounce(() => {
            PessoaService.getAll(1, busca)
                .then((result) => {
                    // faz o set do isLoad como false no fim da consulta, mesmo sem saber se a consulta retorna erro ou os dados
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        console.log(result);

                        setTotalCount(result.totalCount);
                        setRows(result.data);
                    }
                });
        });


    }, [busca]);




    return(
        <LayoutBaseDePagina
            titulo='Listagem de Pessoas'
            barraDeFerramentas={
                <FerramentasDeListagem
                    mostrarBotaoNovo
                    mostrarInputBusca
                    textoBotaoNovo='Nova'
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto },{replace: true})}
                />

                
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>Ações</TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>

                    {totalCount === 0 && !isLoading &&(
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant='indeterminate' />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    );
};
