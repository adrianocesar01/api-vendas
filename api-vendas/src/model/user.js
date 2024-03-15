module.exports = class User{

    constructor(codigo, nome, email, senha){ 

        if(codigo) 
            this.codigo = codigo, 
            this.nome = nome, 
            this.email = email, 
            this.senha = senha   
            this.ativo = 1    
    }

    getCodigo(){
        return this.codigo
    }

    setCodigo(codigo){
        this.codigo = codigo
    }

    getNome(){
        return this.nome
    }

    setNome(nome){
        this.nome = nome
    }

    getEmail(){
        return this.email
    }
    
    setEmail(email){
        this.email = email
    }

    getSenha(){
        return this.senha
    }

    setSenha(senha){
        this.senha = senha
    }

    getAtivo(){
        return this.ativo
    }

    setAtivo(ativo){
        this.ativo = ativo
    }
}