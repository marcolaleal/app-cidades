import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages';
import { useDrawerContext } from '../shared/contexts';


export const AppRoutes = () => {
    const { setDrawerOptions} = useDrawerContext();
    
    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                label: 'Página Inicial',
                path: '/pagina-inicial'
            }
        ]);
    });



    return(
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />
            
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
};