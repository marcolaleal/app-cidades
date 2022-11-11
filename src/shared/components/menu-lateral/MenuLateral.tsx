import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';
import logo from '../menu-lateral/Mateus.png';

interface IMenuLateralProps {
    children: React.ReactNode
}

interface IListItemLink {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLink> = ({to, icon, label, onClick}) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    // nao usa o useCallback devido o contexto ser apenas o componente
    const handleClick = () => {
        navigate(to);
        //verificar se essa função é diferente de undefined
        onClick?.();
    };
    
    
    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};


export const MenuLateral:React.FC<IMenuLateralProps> = ( {children} ) => {
    const theme = useTheme( );
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();



    
    //primeiro box é o avatar ou logo, Divider é a linha divisoria e abaixo esta as opções de menu
    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center" >
                        <Avatar
                            sx={{height : theme.spacing(12), width: theme.spacing(12) }} 
                            src={logo} 
                        />
                    </Box>

                    <Divider />


                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOption => (
                                <ListItemLink
                                    key={drawerOption.path} 
                                    icon={drawerOption.icon} 
                                    label={drawerOption.label} 
                                    to={drawerOption.path} 
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                        </List>
                    </Box>
                    
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};