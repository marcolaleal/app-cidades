import { BrowserRouter } from 'react-router-dom';

//aplica as traducoes do Yup (validador de formularios)
import './shared/forms/traducoesYup';

import { AppRoutes } from './routes';
import { Login, MenuLateral } from './shared/components';
import { AuthProvider, DrawerProvider } from './shared/contexts';
import { AppThemeProvider } from './shared/contexts/ThemeContext';

export const App = () => {
    return (
        <AuthProvider>
            <AppThemeProvider>
                <Login>

                    <DrawerProvider>
                        <BrowserRouter>

                            <MenuLateral>
                                <AppRoutes />
                            </MenuLateral>

                        </BrowserRouter>
                    </DrawerProvider>
                    
                </Login>
            </AppThemeProvider>
        </AuthProvider>
    );
};

