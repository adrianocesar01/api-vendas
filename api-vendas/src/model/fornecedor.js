module.exports = class Fornecedor{

    constructor(codigo, nome, email, telefone){

        if(codigo)
            this.codigo = codigo 
            this.nome = nome 
            this.email = email 
            this.telefone = telefone 
    }

    getCodigo(){
        return this.codigo;
    }

    setCodigo(codigo){
         this.codigo = codigo;
    }

    getNome(){
        return this.nome;
    }

    setNome(nome){
        this.nome = nome;
    }

    getEmail(){
        return this.email;
    }

    setEmail(email){
        this.email = email;
    }

    getTelefone(){
        return this.telefone;
    }

    setTelefone(telefone){
        this.telefone = telefone;
    }   
}