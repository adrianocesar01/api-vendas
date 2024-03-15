module.exports = class Categoria{

    constructor(codigo, nome){

        if(codigo)
            this.codigo = codigo 
            this.nome = nome  
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
}