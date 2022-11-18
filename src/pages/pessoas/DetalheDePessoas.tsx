import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';



export const DetalheDePessoas: React.FC =() => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const handleSave = () => {
        console.log('save');
    };

    const handleDelete = () => {
        console.log('delete');
    };


    return (
        <LayoutBaseDePagina
            titulo="Detalhe de Pessoa"
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvar={handleSave}
                    aoClicarEmSalvarEFechar={handleSave}
                    aoClicarEmApagar={handleDelete}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                />
            }
        >
            <p>Detalhes de pessoas {id}</p>
        </LayoutBaseDePagina>
    );
};