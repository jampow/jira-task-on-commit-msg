#!/usr/bin/env node
const fs = require('fs');
const rl = require('readline');

const cmtMsgFl = process.argv[2];
const message = fs.readFileSync(cmtMsgFl);
const numberPattern = /([0-9]{1,5}|BUG|FEAT)/i;
const pattern = new RegExp("^\[[a-zA-Z]{2,8}-" + numberPattern.source + "\]", "i");

const teamName = 'PGDEV';

if (pattern.test(message)) {
    process.exit(0);
} 

console.log('Sua mensagem está sem o número da task.');
console.log('Ex: "[DNA-42] resposta para a vida, o universo e tudo mais"\n');

const resp = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Capturando o sinal de interrupção (CTRL+C) para cancelar o commit
resp.on('SIGINT', function() {
    process.exit(1);
});

resp.question('Qual o número da task? ', function(id){
    if ( numberPattern.test(id) ) {

  var msg = '[' + teamName + '-' + id.toUpperCase() + '] ' + message;

        fs.writeFile(cmtMsgFl, msg, function(err){
        
            if ( err ) {
                console.log('Erro ao gravar ao salvar a nova mensagem');
                process.exit(1);
            }

            console.log('Mensagem do commit alterada para:');
            console.log(msg);
            
            process.exit(0);
        });

    } else {
        console.log('Número inválido, precisa ter de 1 a 5 dígitos ou uma das palavras: BUG, FEAT.');
        process.exit(1);
    }
});

