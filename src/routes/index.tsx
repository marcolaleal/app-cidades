import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard, ListagemDePessoas, DetalheDePessoas, ListagemDeCidades, DetalheDeCidades } from '../pages';
import { useDrawerContext } from '../shared/contexts';


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
            },
            {
                icon: 'location_city',
                label: 'Cidades',
                path: '/cidades'
            }
        ]);
    });



    return(
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />

            <Route path="/pessoas" element={<ListagemDePessoas />} />
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />

            <Route path="/cidades" element={<ListagemDeCidades />} />
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />
            
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
};