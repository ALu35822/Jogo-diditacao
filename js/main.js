var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
    atualizaTamanhoFrase();
    iniciaContadores();
    iniciaCronometro();
    iniciaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {

    //numero de palavras
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function iniciaContadores() {
    campo.on("input",function(){
    var conteudo = campo.val();

    //"contador de palavras"
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    //"contador de caracteres"
    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
});
}

//cronometro começa a funcionar
function iniciaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus",function(){
    var cronometroID = setInterval(function(){
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if(tempoRestante < 1){
            clearInterval(cronometroID);
            finalizaJogo();
        }
    },1000);
});
}

function finalizaJogo(){
    campo.attr("disabled",true);
    campo.addClass("campo-desativado");
    inserePlacar();
}

//time down
var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus",function(){
    var cronometroID = setInterval(function(){
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if(tempoRestante < 1){
            campo.attr("disabled",true);
            clearInterval(cronometroID);
        }
    },1000);
});

//inicia cores borda
function iniciaMarcadores(){
     var frase = $(".frase").text();
campo.on("input", function(){
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);
    console.log("Digitado:" + digitado);
    console.log("Frase C.:" + comparavel);
    if(digitado == comparavel){
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    } else{
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
});
}


//botao reiniciar jogo
function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    iniciaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}