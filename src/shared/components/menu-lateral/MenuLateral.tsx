import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useDrawerContext } from '../../contexts';

interface IMenuLateralProps {
    children: React.ReactNode
}


export const MenuLateral:React.FC<IMenuLateralProps> = ( {children} ) => {
    const theme = useTheme( );
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext();


    
    //primeiro box é o avatar ou logo, Divider é a linha divisoria e abaixo esta as opções de menu
    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center" >
                        <Avatar
                            sx={{height : theme.spacing(12), width: theme.spacing(12) }} 
                            src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png" 
                        />
                    </Box>

                    <Divider />


                    <Box flex={1}>
                        <List component="nav">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>
                                        home
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary="Página Inicial" />
                            </ListItemButton>
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