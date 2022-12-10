//from ./bignumber/bignumber.js;

const gerar = document.querySelector("#gerar");
const cifrar = document.querySelector("#cifrar");
const decifrar = document.querySelector("#decifrar");

gerar.addEventListener("click", function(e){
    e.preventDefault();
    const var_p = document.querySelector("#value_p");
    const p = var_p.value;


    insertMensagemCriptografada("");
    insertMensagemDeCriptografada("");
    insertMensagemCifrada("");
    insertMensagemDecifrada("");
    generateKey(p);
})
cifrar.addEventListener("click", function(e){
    e.preventDefault();
    criptografar()
})
decifrar.addEventListener("click", function(e){
    e.preventDefault();
    decriptografar()
})




function insertWarning(texto){
    document.getElementById("warning").innerHTML = texto;
}

function insertQ(texto){
    document.getElementById("value_q").innerHTML= texto;
}

function insertN(texto){
    document.getElementById("value_n").innerHTML= texto;
}

function insertPhi(texto){
    document.getElementById("value_phi").innerHTML= texto;
}

function insertE(texto){
    document.getElementById("value_e").innerHTML= texto;
}
function insertD(texto){
    document.getElementById("value_d").innerHTML= texto;
}
function insertChavePrivada(texto){
    document.getElementById("value_chave_privada").innerHTML= texto;
}

function insertChavePublica(texto){
    document.getElementById("value_chave_publica").innerHTML= texto;
}

function insertMensagemCriptografada(texto){
    document.getElementById("value_resultado_cifrar").innerHTML= texto;
}

function insertMensagemDeCriptografada(texto){
    document.getElementById("value_resultado_decifrar").innerHTML= texto;
}

function insertMensagemCifrada(texto){
    const input = document.getElementById("value_cifrar");
    input.value = texto;
}

function insertMensagemDecifrada(texto){
    const input = document.getElementById("value_decifrar");
    input.value = texto;
}

function criptografarMensagem(e,n){
    const value_mensagem = document.querySelector("#value_cifrar");
    const mensagem = value_mensagem.value;
    var mensagemAsc = [];
    var mensagemBit =[];
    var mensagemCifrada = [];
    var aux1=0;
    var aux2=0;
    if(mensagem != ""){
        
        for(var cont=0; cont < mensagem.length; cont++){
            aux1 = mensagem[cont].charCodeAt(0);
            mensagemAsc.push(aux1);
            
            aux2 = ((aux1-(aux1%10))/10)%10;        // extrai a centena do ASCII
            aux2 = ((aux1-(aux1%10))/10 - aux2)/10;
            mensagemBit.push(aux2);

            mensagemBit.push(((aux1-(aux1%10))/10)%10); //extrai a dezena do ASCII

            mensagemBit.push(aux1%10);              // extrai a unidade do ASCII
        }

        for(var cont=0; cont < mensagem.length*3; cont++){
            aux1=0;
            aux2=0;

            aux1 = BigInt(mensagemBit[cont])**BigInt(e);
            aux2 = parseInt(aux1 % BigInt(n));

            mensagemCifrada.push(aux2);
        }
       
        var code = btoa(mensagemCifrada.toString())
        insertMensagemCriptografada(code);
        
    }
    
}

function decriptografarMensagem(d,n){
    const value_mensagem = document.querySelector("#value_decifrar");
    const mensagem = value_mensagem.value;
    var mensagemAsc = [];
    var mensagemBit =[];
    var mensagemDecifrada = [];
    var aux1=0;
    var aux2=0;

    if(mensagem != ""){

        var decode= atob(mensagem);

        try{
            mensagemBit = decode.split(",");
        
            for(var cont=0; cont < mensagemBit.length; cont++){
                aux1=0;
                aux2=0;
    
                aux1 = BigInt(mensagemBit[cont])**BigInt(d);
                aux2 = parseInt(aux1 % BigInt(n));
    
                mensagemAsc.push(aux2);
            }
    
            aux1=0;
            aux2=0;
    
            for(var cont=0; cont < mensagemAsc.length; cont= cont + 3){
                
                aux1 = (String(mensagemAsc[cont]) + String(mensagemAsc[cont+1]) + String(mensagemAsc[cont+2]));
                mensagemDecifrada.push(String.fromCharCode(aux1));            
            }
    
            aux1 = mensagemDecifrada.toString();
            aux2 =  mensagemDecifrada.join('');
            
            insertMensagemDeCriptografada(aux2);
        }catch{
            insertMensagemDeCriptografada("Não foi possível descriptografar sua mensagem. Tente novamente");
        }
        
    }
}

function decriptografar(){
    const n = document.querySelector("#value_n").innerHTML;
    const d = document.querySelector("#value_d").innerHTML;

    if(n != "-" && d != "-"){
        decriptografarMensagem(d,n);
    }
    
}
function criptografar(){
    const n = document.querySelector("#value_n").innerHTML;
    const e = document.querySelector("#value_e").innerHTML;

    if(n != "-" && e != "-"){
        criptografarMensagem(e,n);
    }
    
}

function generateKey(p){

    if(isPrime(p)){
        var q = generatePrime(p, 100,2);
        insertQ(q);

        var n = calculaN(p, q);
        var phi_n= calculaEuller(p,q);
        var e = calculaE(1, phi_n);
        var d = calculaD(e, phi_n);
        var chave_privada = "(E: " + e + ", N: " + n + ")";
        var chave_publica = "(D: " + d + ", N: " + n + ")";

        insertN(n);
        insertPhi(phi_n);
        insertE(e);
        insertD(d);
        insertChavePrivada(chave_privada);
        insertChavePublica(chave_publica);

        //criptografarMensagem(d,n,e);
    }
}

function calculaD(e, phi_n){
    var d=1;
    while(true){
        var aux = d * e;
        if(aux%phi_n == 1){
            return d;
        }
        d = d+1;
    }
}

function calculaE(p, phi_n){
    
    while(true){
        var e = generatePrime(p,phi_n,2);

        if(mdc(phi_n,e) == 1){
            return e;
        }
    }

}

function calculaEuller(p,q){
    return ((p-1)*(q-1));
}

function calculaN(p,q){
    return p * q;
}
function isPrime(p){
    if(p > 1 && p < 100){
        if(test_fermat(p)){
            insertWarning("");
            return true;
        }
        else{
            insertWarning("O número digitado não é primo.");
            insertQ("");
            insertN("");
            insertD("");
            insertPhi("");
            insertChavePrivada("");
            insertChavePublica("");
            insertMensagemCriptografada("");
            insertMensagemDeCriptografada("");
            insertMensagemCifrada("");
            insertMensagemDecifrada("");
        }
    }
    else{
        insertWarning("Digite um número entre 2 a 99");
        insertQ("");
    }
}

function generatePrime(p, max, min){ 
    var n = 0;
    while(true){
        n = nBitRandom(max,min);

        if(p != n){
            if(test_fermat(n)){
                break;
            }
        }   
    }
    return n;
}

function nBitRandom(max, min){
    return Math.trunc(Math.random() * (max - min) + min);
}

function mdc(x,y){
    var resto=1;
    while(resto != 0 ){
        resto = x % y;
        x = y;
        y = resto;
    }
    return x;
}

function test_fermat(n){

    if(n > 3){
        var d = 2*Math.log(n)+1;

        for(var b=2; b <= d; b++){
            if(mdc(n,b) != 1){
                return false;
            }
        }
    }
    return true;
}


