module.exports = class Produto{

    constructor(codigo, nome, codigoCategoria, codigoFornecedor, 
        valor){
            
        if(codigo)
            this.codigo = codigo 
            this.nome = nome 
            this.codigoCategoria = codigoCategoria 
            this.codigoFornecedor = codigoFornecedor 
            this.valor = valor 
            this.ativo = 1  
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
    
    getCodigoCategoria(){
        return this.codigoCategoria;
    }

    setCodigoCategoria(codigoCategoria){
        this.codigoCategoria = codigoCategoria;
    }

    getCodigoFornecedor(){
        return this.codigoFornecedor;
    }

    setCodigoFornecedor(codigoFornecedor){
        this.codigoFornecedor = codigoFornecedor;
    }

    getValor(){
        return this.valor;
    }

    setValor(valor){
         this.valor = valor;
    }

    getAtivo(){
        return this.ativo;
    }

    setAtivo(ativo){
         this.ativo = ativo;
    }    
}