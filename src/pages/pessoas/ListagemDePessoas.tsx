import React, { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IListagemPessoa, PessoaService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';



export const ListagemDePessoas: React.FC = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(700);
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    },[searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    },[searchParams]);

    useEffect(() => {
        //faz o set nos isLoading como true antes de iniciar a consulta no banco de daos
        setIsLoading(true);

        //usa um hook customizado (useDebounce) para dar um delay na consulta ao backend
        //a consulta so será feita apos o usuraio ficar um certo tempo sem digitar no campos pesquisar
        //para evitar que a cada letra seja feita uma nova consulta
        debounce(() => {
            PessoaService.getAll(pagina, busca)
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


    }, [busca, pagina]);

    const handleDelete =(id: number) => {
        if (confirm('Tem certeza que deseja excluir esse item?')) {
            PessoaService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(oldRows => {
                            return[
                                ...oldRows.filter(oldRow => oldRow.id !== id),
                            ];
                        });
                        alert('registro apagado com sucesso!');
                    }
                });
        }
    };


    return(
        <LayoutBaseDePagina
            titulo='Listagem de Pessoas'
            barraDeFerramentas={
                <FerramentasDeListagem
                    mostrarBotaoNovo
                    mostrarInputBusca
                    textoBotaoNovo='Nova'
                    textoDaBusca={busca}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' },{replace: true})}
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
                                <TableCell>
                                    <IconButton size='small' onClick={() => handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton size='small' onClick={() => navigate(`/pessoas/detalhe/${row.id}`)} >
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
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
                        {(totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination 
                                        page={pagina}
                                        count={Math.ceil(totalCount/Environment.LIMITE_DE_LINHAS)}
                                        onChange={(_, newPage) => setSearchParams({busca, pagina: newPage.toString()},{replace: true})}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    );
};
