#!/usr/bin/env node
const fs = require('fs');
const rl = require('readline');

const cmtMsgFl = process.argv[2];
const message = fs.readFileSync(cmtMsgFl);
const numberPattern = /([0-9]{1,6})/i;
const pattern = new RegExp("^\[[a-z]{2,8}-" + numberPattern.source + "\]", "i");

const jiraPrefix = 'PGDEV';

if (pattern.test(message)) {
  process.exit(0);
} 

console.log('It seems that you are trying to commit a message without a task number.');
console.log('Eg: "[DNA-42] the answer to life, the universe and everything"\n');

const resp = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

const saveNewCommitMessage = (message) => {
  fs.writeFile(cmtMsgFl, message, function(err){
    if ( err ) {
      console.log('Error saving commit message.');
      process.exit(3);
    }

    console.log('Commit message changed for:');
    console.log(message);
    
    process.exit(0);
  });
};

// Captura o sinal de interrupção do terminal (CTRL+C) para cancelar o script
resp.on('SIGINT', function() {
  process.exit(1);
});

resp.question(`Please, tell me what is your task number? ${jiraPrefix}-`, function(id){
  if (!numberPattern.test(id)) {
    console.log('Invalid task number. It needs to be a number of 6 digits or less.');
    process.exit(2);
  }

  const newMsg = `[${jiraPrefix}-${id}] ${message}`;

  saveNewCommitMessage(newMsg);
});

