import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
}


export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar,
}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    
    return (
        <Box
            gap={1}
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display='flex'
            alignItems='center'
            component={Paper}
        >
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                <Button
                    color='primary'
                    variant='contained'
                    disableElevation
                    onClick={aoClicarEmSalvar}
                    startIcon={<Icon>save</Icon>}
                >
                    <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                        Salvar
                    </Typography>
                </Button>               
            )}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={110} height={60} />
            )}
            
            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !mdDown) && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    onClick={aoClicarEmSalvarEFechar}
                    startIcon={<Icon>save</Icon>}
                >
                    <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                        Salvar e Fechar
                    </Typography>
                </Button>
            )}

            {(mostrarBotaoSalvarEFecharCarregando && !mdDown) && (
                <Skeleton width={180} height={60} />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    onClick={aoClicarEmApagar}
                    startIcon={<Icon>delete</Icon>}
                >
                    <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                        Apagar
                    </Typography>
                </Button>
            )}

            {mostrarBotaoApagarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    onClick={aoClicarEmNovo}
                    startIcon={<Icon>add</Icon>}
                >
                    <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                        {textoBotaoNovo}
                    </Typography>
                </Button>
            )}

            {(mostrarBotaoNovoCarregando && !smDown) && (
                <Skeleton width={110} height={60} />
            )} 

            {
                (
                    mostrarBotaoVoltar &&
                    (mostrarBotaoNovo || mostrarBotaoSalvar || mostrarBotaoApagar || mostrarBotaoSalvarEFechar)
                ) && (
                    <Divider variant='middle' orientation='vertical' />
                )
            }
            
            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    onClick={aoClicarEmVoltar}
                    startIcon={<Icon>arrow_back</Icon>}
                >
                    <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                        Voltar
                    </Typography>
                </Button>
            )}

            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={110} height={60} />
            )}
            
        </Box>
    );
};