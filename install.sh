#!/usr/bin/env bash
 
hooksPath=$(git config core.hooksPath)
 
files=(commit-msg commit-msg.js)

for file in "${files[@]}"
do
  curl -fsSl https://raw.githubusercontent.com/jampow/jira-task-on-commit-msg/main/src/git-hook/${file} -o ${hooksPath}/${file}
  chmod +x ${hooksPath}/${file}
done
 
echo "Installed git hooks into ${hooksPath}"
ls ${hooksPath}
