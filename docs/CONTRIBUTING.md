# Contributing to the project

Here is a little bit you should know, before you send your contribution.

## Branches and deployment strategy

We have three main branches: `develop`, `staging` and `main`. Our strategy is inspired by [this article](https://nvie.com/posts/a-successful-git-branching-model/).

- **develop**: every feature or fix branch should be branch off from this branch
- **staging**: we use it to preview the next release before it hits production. Here we test the `Ready for QA` tickets. When all tickets passed QA, we deployed the version to production.
- **main**: every commit on this branch is a new release to production. Hotfixes branches should be branch off from this branch and applied to `develop` and `staging` as well.

Each branch is linked to GitLab CI/CD. We use our internal infrastructure to build and deploy the code.

## This is the way: Issue → Branch → MR

When we start working on a new task, such as fixing a bug or creating a new feature, we will do so by following these steps:

1. Write an `issue` on GitLab
2. Assign the task to anyone in the team (add the perfect label)
3. Use the `Create merge request` button to **automatically create a new branch and merge request** based on the issue
4. Make sure you are in the `develop` branch and fetch all remote branches `git checkout develop && git fetch`
5. Work on that branch (commit and push your progress) `git checkout 123-fix-this-bug`
6. Ask at least one teammate to review your code (everyone on the team should know what's being done)
7. Wait for QA approval (if applicable, otherwise ask for teammate approval)
8. Merge the **Merge request** to `develop` branch only if all pipeline stages pass

> 💡 Report all issues in the repository, avoid Notion, Dropbox Paper or similar alternatives. Make the repository the single source of truth

## Merge Requests

- Close the branch after PR merge (except when it has the `WIP` prefix). Otherwise this will keep a ton of unnecessary UAT environments
- Focus on one task at time
- Make atomic/little commits
- Push before leave office
- Be sure all of your tests passed

## File and Folders naming

The name of the `files` and `folders` must be written in English and with the same rules:

- Components, screens and layouts is written following the pattern
  `TitleCase` , ex: `MoodTracker.tsx.`
- The rest of the files are written following the pattern
  `camelCase` , Ex: `habitsService.js`
- The folders name has to be written following the pattern
  `TitleCase` , Ex: `DiaryComponents`

## Commits

We use [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/) specification. This will allow us to create automatized changelogs and semantic versioning. Because of this, **you won't be able to commit messages that do not follow this specification**.

### Commit examples

Use the following structure: `<type>(<scope>): <subject>` [See full examples here](https://www.conventionalcommits.org/en/v1.0.0/#examples)

> i.e: if you are integrating a new language to your project, the commit would be `feat(lang): add spanish language`

> i.e: if you are fixing some bug on a form, the commit would be `fix(contact): validate email input`

### Commit structure

```text
feat(lang): spanish language added
^--^^-----^^---------------------^
|   |      |
|   |      +--> Summary in past simple tense.
|   |
|   +---------> Optional scope about task, file, package, etc.
|
+-------------> Type: feat, fix, chore, build, ci, docs, style, refactor, perf, test
```

### Commit Types

- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `docs`: Documentation only changes
- `feat`: A new feature for the user, not a new feature for building scripts
- `fix`: A bug fix for the user, not a fix to a build script
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests; not production code
- `chore`: Updating packages or configurations; no production code change

## Linter

This project uses Next.js ESLint configuration. You won’t be able to commit files with linting errors, and if you do a `--force` you’ll break CI.
