import { IMandato } from './mandato';
import { IUsuario } from '../users/usuario';

export interface IVoto {
    id_voto: number;
    mandato: IMandato;
    usuario: IUsuario;
}
