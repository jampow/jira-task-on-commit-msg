#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var mod = {

	fireCommand : function(id, command) {
		return new Promise(function(resolve, reject){
			exec(command, function(error, stdout, stderr){
				if (error != null) {
					reject(error);
				}
				resolve({'id': id, 'stdout': stdout.replace(/\n$/,'')});
			});
		});
	},

	prep_mainHook : function(pathName){
		if (process.platform.match(/win/)) {
			var local = 'node_modules\\git-hook\\hooks';

			var finalPath = path.resolve(pathName, local);
		} else {
			var local = '/bin/git-hook';

			var finalPath = path.resolve(
				path.dirname(pathName+local),
				fs.readlinkSync(pathName+local)
			).replace('index.js', 'hooks/');
		}

		return finalPath;

	},

	prep_gitHookDir : function(pathName){
		return [pathName, 'hooks', ''].join(path.sep);
	},

	prepareCopy : function(results) {
		var cpParams = {};

		while (results.length) {
			var result = results.shift();
			cpParams[result.id] = mod['prep_' + result.id](result.stdout);
		}

		return cpParams;
	},

	copyHook : function(params) {
		var files = fs.readdirSync(params.mainHook);

		while (files.length) {
			var file = files.shift();

			var from = path.resolve(params.mainHook, file);
			var to = path.resolve(params.gitHookDir, file);

			if (process.platform.match(/win/)) {
				// Windows não funciona com link simbólicos, é preciso copiar os arquivos
				fs.createReadStream(from).pipe(fs.createWriteStream(to));
			} else {
				fs.symlinkSync(from, to);
			}
		}
	},

	showErrorMessage : function(err){
		var messages = {
			'128': 'Você não está dentro de um repositório GIT',
			'EEXIST': 'Já existem hooks instalados neste repositório'
		};

		var message = messages[err.code.toString()];
		if (message === undefined) {
			console.error(err);
		} else {
			console.error("[ ERRO ] - ", message);
		}
	},

	init : function(){
		Promise.all([
			mod.fireCommand('mainHook', 'npm get prefix'),
			mod.fireCommand('gitHookDir', 'git rev-parse --git-dir')
		])
			.then(mod.prepareCopy)
			.then(mod.copyHook)
			.catch(mod.showErrorMessage);
	}
};

mod.init();

