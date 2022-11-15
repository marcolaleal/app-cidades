import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../environment';


//cria instancia do axios configurando a url base da aplicação
const Api = axios.create({
    baseURL: Environment.URL_BASE,
});

//solicita que toda a comunicação da Api passe pelos interceptors a fim de serem tratados erros e possiveis respostas corretas 
Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { Api };


