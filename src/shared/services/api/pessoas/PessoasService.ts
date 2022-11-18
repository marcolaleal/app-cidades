import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListagemPessoa {
    id: number;
    nomeCompleto: string;
    cidadeId: number
    email: string;
}

export interface IDetalhePessoa {
    id: number;
    nomeCompleto: string;
    cidadeId: number;
    email: string;
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}


const getAll = async (page=1, filter =''): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

        const { data, headers } = await Api.get(urlRelativa);

        if ( data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            };
        }

        return new Error('Erro ao listar os gegistros');
    } catch (error) {
        console.error(error);

        return new Error((error as { message: string }).message ||'Erro ao listar os gegistros');

    }
};

const getById = async (id:number): Promise<IDetalhePessoa | Error> => {
    try {

        const { data } = await Api.get(`/pessoas/${id}`);

        if ( data) {
            return data;
        }

        return new Error('Erro ao consultar o gegistro');
    } catch (error) {
        console.error(error);

        return new Error((error as { message: string }).message ||'Erro ao consultar o gegistro');

    }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
    try {

        const { data } = await Api.post<IDetalhePessoa>('/pessoas',dados);

        if ( data) {
            return data.id;
        }

        return new Error('Erro ao criar o gegistro');
    } catch (error) {
        console.error(error);

        return new Error((error as { message: string }).message ||'Erro ao criar o gegistro');

    }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
    try {

        await Api.put(`/pessoas/${id}`,dados);

    } catch (error) {
        console.error(error);

        return new Error((error as { message: string }).message ||'Erro ao atualizar o gegistro');

    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {

        await Api.delete(`/pessoas/${id}`);

    } catch (error) {
        console.error(error);

        return new Error((error as { message: string }).message ||'Erro ao excluir o gegistro');

    }
};



export const PessoaService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};