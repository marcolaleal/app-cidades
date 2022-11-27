import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoaService } from '../../shared/services/api/pessoas/PessoasService';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';


export const Dashboard = () => {
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(false);
    const [totalCountPesoas, setTotalCountPessoas] = useState(0);

    const [isLoadingCidades, setIsLoadingCidades] = useState(false);
    const [totalCountCidades, setTotalCountCidades] = useState(0);

    useEffect(() => {

        setIsLoadingPessoas(true);
        setIsLoadingCidades(true);


        PessoaService.getAll(1)
            .then((result) => {
                setIsLoadingPessoas(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTotalCountPessoas(result.totalCount);
                }
            });

        CidadesService.getAll(1)
            .then((result) => {
                setIsLoadingCidades(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTotalCountCidades(result.totalCount);
                }
            });

    }, []);
    


    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramentas={<FerramentasDeListagem mostrarBotaoNovo={false} />}
        >
            <Box width='%' display='flex'>
                <Grid container margin={1}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        Total de Pessoas
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        {!isLoadingPessoas &&(
                                            <Typography variant='h1'>
                                                {totalCountPesoas}
                                            </Typography>
                                        )}
                                        {isLoadingPessoas &&(
                                            <Typography variant='h6'>
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        Total de Cidades
                                    </Typography>
                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                                        {!isLoadingCidades &&(
                                            <Typography variant='h1'>
                                                {totalCountCidades}
                                            </Typography>
                                        )}
                                        {isLoadingCidades &&(
                                            <Typography variant='h6'>
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    );
};