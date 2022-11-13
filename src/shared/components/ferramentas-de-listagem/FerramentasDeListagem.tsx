import React from 'react';
import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from '@mui/material';

interface IFerramentasDeListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDeListagem: React.FC<IFerramentasDeListagemProps> = ({
    textoDaBusca = '', 
    mostrarInputBusca = false, 
    aoMudarTextoDeBusca,
    aoClicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
}) => {

    const theme = useTheme(); 

    return(
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
            {mostrarInputBusca && (
                <TextField 
                    size='small'
                    placeholder='Pesquisar...'
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon>search</Icon>
                            </InputAdornment>
                        ),
                    }}
                />
            )}


            <Box flex={1} display="flex" justifyContent="end">
                
                {mostrarBotaoNovo && (
                    <Button
                        color='primary'
                        variant='contained'
                        disableElevation
                        onClick={aoClicarEmNovo}
                        endIcon={<Icon>add</Icon>}
                    >{textoBotaoNovo}</Button>
                )}
            </Box>
        </Box>
    );
};