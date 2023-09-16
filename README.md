# JIRA TASK IN COMMIT MESSAGE (Git Hook)

This hook validates your commit message to check it a jira task was added. If not, it'll prompt you. Just to make things easier!

## Installation

Run the installation command to install the hook in your local repository:

`sh -c $(curl -fsSl https://raw.githubusercontent.com/jampow/jira-task-on-commit-msg/main/install.sh)`

## TODO

- [x] write the installation script
  - [ ] validate if there is another `commit-msg` previously installed and rename it before coping the files
  - [ ] ask if the user wants to configure the hooks as a versionated folder
- [ ] make initial configuration prompts
  - [ ] prompt for the jira username and token (to use the jira's API)
  - [ ] prompt for JIRA board prefix
- [ ] use jira API to find the `in progress` task number
- [ ] use Inquirer to prompt
- [ ] write more tests

