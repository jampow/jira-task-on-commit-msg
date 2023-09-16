GIT HOOKS
Comando para instalar hooks no projeto de maneira fácil, basta digitar o comando git hook dentro de um repositório git

INSTALAÇÃO
Clone o projeto pro seu computador. $ git clone ssh://git@stash.uol.intranet:7999/~gsoares/git-hook.git

Altere o nome da equipe no arquivo hooks/commit-msg.js. Este nome tem que ser o prefixo da task do Jira, assim os commits do stash ficam vinculados com a task no jira.

	...
	// linha 11
	var teamName = 'DVIZ';
	...
Instale como um módulo npm global $ npm install -g

Agora é só acessar algum repositório GIT e rodar o comando $ git hook

DEPENDÊNCIAS
Node.js
ATUALIZAÇÃO
Acesse o repositório aonde o projeto foi clonado, atualize o projeto com $ git pull e reinstale o pacote com npm install -g.

Em ambiente Unix, todos os hooks que foram instalados com essa ferramenta já estarão atualizados. Pra quem usa windows precisa executar git hook dentro do repositório novamente.

TODO
Escrever mais testes
Testar em/Adaptar para plataforma windows
Adicionar opção para sobrescrever hooks já existentes
Adicionar opção para desinstalar os hooks
Pensar num meio fácil de alterar o nome da equipe para o hook de validação de mensagens de commit

