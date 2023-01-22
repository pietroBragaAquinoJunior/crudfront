import http from "../http-common";

class TutorialDataService {
    listarUsuario(): Promise<any> {
        return http.get("/listar-usuarios");
    }

    salvarUsuario( nome: string, email: string, telefone: string): Promise<any> {
        return http.post(`/salvar-usuario/nome/${nome}/email/${email}/telefone/${telefone}`);
    }

    // update(id: any, data: any): Promise<any> {
    //     return http.put(`/tutorials/${id}`, data);
    // }

    deletarUsuario(id: string): Promise<any> {
        return http.delete(`/deletar-usuario/id/${id}`);
    }

}

export default new TutorialDataService();