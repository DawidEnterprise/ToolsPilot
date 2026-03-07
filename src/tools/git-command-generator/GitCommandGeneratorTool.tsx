"use client";
import { useState } from "react";

const COMMANDS: [string,string,string][] = [
["git init","Initialize a new repository","Creates a new .git directory in the current folder."],
["git clone <url>","Clone a repository","Download a remote repository to your local machine."],
["git add .","Stage all changes","Add all modified and new files to staging area."],
["git commit -m \"message\"","Commit changes","Save staged changes with a descriptive message."],
["git push","Push to remote","Upload local commits to the remote repository."],
["git pull","Pull from remote","Fetch and merge changes from the remote repository."],
["git status","Check status","Show the working tree status and staged changes."],
["git log --oneline","View commit history","Show compact commit log with one line per commit."],
["git branch","List branches","Show all local branches. Add -a for remote branches."],
["git branch <name>","Create branch","Create a new branch from the current HEAD."],
["git checkout <branch>","Switch branch","Switch to an existing branch."],
["git checkout -b <branch>","Create & switch","Create a new branch and switch to it immediately."],
["git merge <branch>","Merge branch","Merge another branch into the current branch."],
["git stash","Stash changes","Temporarily store modified tracked files."],
["git stash pop","Apply stash","Re-apply the most recently stashed changes."],
["git reset --hard HEAD","Reset to last commit","Discard all changes since the last commit."],
["git revert <commit>","Revert a commit","Create a new commit that undoes a previous commit."],
["git diff","View changes","Show unstaged changes in your working directory."],
["git remote -v","View remotes","Show remote repository URLs."],
["git tag <name>","Create tag","Create a lightweight tag at the current commit."],
["git cherry-pick <commit>","Cherry-pick","Apply a specific commit to the current branch."],
["git rebase <branch>","Rebase","Reapply commits on top of another branch."],
];

export function GitCommandGeneratorTool() {
  const [search, setSearch] = useState("");
  const filtered = COMMANDS.filter(([cmd,title,desc]) => {
    const q = search.toLowerCase();
    return cmd.toLowerCase().includes(q) || title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Search git commands..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg dark:border-gray-700">
        {filtered.map(([cmd, title, desc]) => (
          <div key={cmd} className="px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
              <button onClick={() => navigator.clipboard.writeText(cmd)} className="text-xs text-brand-600 hover:underline">Copy</button>
            </div>
            <code className="text-sm font-mono text-brand-600 dark:text-brand-400">{cmd}</code>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
