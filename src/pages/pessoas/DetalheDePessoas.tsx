import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { PessoaService } from '../../shared/services/api/pessoas/PessoasService';

interface IFormData {
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}



export const DetalheDePessoas: React.FC =() => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova'){
            setIsLoading(true);

            PessoaService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error){
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        setNome(result.nomeCompleto);
                        formRef.current?.setData(result);
                    }
                });
        }
    },[id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);

        if (id == 'nova') {
            PessoaService.create(dados)
                .then((result) => {
                    setIsLoading(false);

                    if ( result instanceof Error) {
                        alert(result.message);
                    } else {
                        navigate(`/pessoas/detalhe/${result}`);
                    }
                });
        } else {
            PessoaService.updateById(Number(id), {id: Number(id), ...dados})
                .then((result) => {
                    setIsLoading(false);

                    if ( result instanceof Error) {
                        alert(result.message);
                    }
                });
        }
    };

    const handleDelete = (id: number) => {
        
        if (confirm('Tem certeza que deseja excluir esse item?')) {
            PessoaService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('registro apagado com sucesso!');
                        navigate('/pessoas');
                    }
                });
        }
    };


    return (
        <LayoutBaseDePagina
            titulo={id === 'nova'? 'Nova Pessoa' : `Editar ${nome}`}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
                />
            }
        >


            <Form ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display='flex' flexDirection={'column'} component={Paper} variant='outlined'>
                    <Grid container direction='column' padding={2} spacing={2}>

                        {isLoading &&(
                            <Grid item>
                                <LinearProgress variant='indeterminate'/>
                            </Grid>
                        )}
                        
                        
                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>


                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
                                <VTextField 
                                    label='Nome Completo' 
                                    name ='nomeCompleto' 
                                    fullWidth
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
                                <VTextField 
                                    label='Email'
                                    name ='email'
                                    fullWidth
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
                                <VTextField 
                                    label='Cidade'
                                    name ='cidadeId'
                                    fullWidth
                                    disabled={isLoading}    
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Form>
        </LayoutBaseDePagina>
    );
};