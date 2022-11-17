import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard, ListagemDePessoas } from '../pages';


export const AppRoutes = () => {
    const { setDrawerOptions} = useDrawerContext();
    
    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                label: 'Página Inicial',
                path: '/pagina-inicial'
            },
            {
                icon: 'people',
                label: 'pessoas',
                path: '/pessoas'
            }
        ]);
    });



    return(
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />

            <Route path="/pessoas" element={<ListagemDePessoas />} />
            
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
};