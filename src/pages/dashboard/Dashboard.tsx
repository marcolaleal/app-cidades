import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard = () => {
    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramentas={(
                <FerramentasDeDetalhe mostrarBotaoSalvarEFechar />
            )}
        >
            <h1>Teste 1</h1>
            <h1>Teste 2</h1>
            <h1>Teste 3</h1>
            <h1>Teste 4</h1>
            <h1>Teste 5</h1>
            <h1>Teste 6</h1>
            <h1>Teste 7</h1>
            <h1>Teste 8</h1>
            <h1>Teste 9</h1>
            <h1>Teste 10</h1>
            <h1>Teste 11</h1>
            <h1>Teste 12</h1>
            <h1>Teste 13</h1>
            <h1>Teste 14</h1>
            <h1>Teste 15</h1>
            <h1>Teste 16</h1>
            <h1>Teste 17</h1>
        </LayoutBaseDePagina>
    );
};