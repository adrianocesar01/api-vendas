module.exports = class Token{

    constructor(codigo, nome, email){
        this.setCodigo(codigo) 
        this.setNome(nome) 
        this.setEmail(email)
        
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

    toJson(){
        return{ 

        "codigo": this.getCodigo(), 
        "nome": this.getNome(), 
        "email": this.getEmail()
    }
  }
}