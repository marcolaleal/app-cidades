import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField, VForm, useVForm } from '../../shared/forms';
import { AutoCompleteCidade } from './components/AutoCompleteCidade';
import { PessoaService } from '../../shared/services/api/pessoas/PessoasService';

interface IFormData {
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    cidadeId: yup.number().required().integer(),
    email:yup.string().required().email(),
    nomeCompleto: yup.string().required().min(3),
}); 



export const DetalheDePessoas: React.FC =() => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
        } else {
            formRef.current?.setData({
                email: '',
                cidadeId: undefined,
                nomeCompleto: '',
            });
        }
    },[id]);

    const handleSave = (dados: IFormData) => {
        formValidationSchema.validate(dados, {abortEarly: false})
            .then((dadosValidados) => {
                setIsLoading(true);
                
                if (id == 'nova') {
                    PessoaService.create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
        
                            if ( result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/pessoas');    
                                } else {
                                    navigate(`/pessoas/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    PessoaService.updateById(Number(id), {id: Number(id), ...dadosValidados})
                        .then((result) => {
                            setIsLoading(false);
        
                            if ( result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/pessoas');    
                                }
                            }
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: {[Key: string]: string} = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message;
                });
                formRef.current?.setErrors(validationErrors);
            }); 

        

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

                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                />
            }
        >


            <VForm ref={formRef} onSubmit={handleSave}>
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
                                <AutoCompleteCidade isExternalLoading={isLoading}/>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </VForm>
        </LayoutBaseDePagina>
    );
};