import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField, VForm, useVForm } from '../../shared/forms';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3),
}); 



export const DetalheDeCidades: React.FC =() => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova'){
            setIsLoading(true);

            CidadesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error){
                        alert(result.message);
                        navigate('/cidades');
                    } else {
                        setNome(result.nome);
                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                nome: '',
            });
        }
    },[id]);

    const handleSave = (dados: IFormData) => {
        formValidationSchema.validate(dados, {abortEarly: false})
            .then((dadosValidados) => {
                setIsLoading(true);
                
                if (id == 'nova') {
                    CidadesService.create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
        
                            if ( result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades');    
                                } else {
                                    navigate(`/cidades/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    CidadesService.updateById(Number(id), {id: Number(id), ...dadosValidados})
                        .then((result) => {
                            setIsLoading(false);
        
                            if ( result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades');    
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

                console.log(errors.errors);
                formRef.current?.setErrors(validationErrors);
            }); 

        

    };

    const handleDelete = (id: number) => {
        
        if (confirm('Tem certeza que deseja excluir esse item?')) {
            CidadesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('registro apagado com sucesso!');
                        navigate('/cidades');
                    }
                });
        }
    };


    return (
        <LayoutBaseDePagina
            titulo={id === 'nova'? 'Nova Cidade' : `Editar ${nome}`}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmVoltar={() => navigate('/cidades')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
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
                                    label='Nome' 
                                    name ='nome' 
                                    fullWidth
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid> 
                    </Grid>   

                </Box>
            </VForm>
        </LayoutBaseDePagina>
    );
};