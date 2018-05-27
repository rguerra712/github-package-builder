# Github Package Builder
Build an NPM package.json from details based on the github repo.

To install, run:
```
npm install -g github-package-builder
```

Next, create a github repository (with license, description, etc). Next, clone your repository, and initialize your package using `npm init`.

Once you have a local `package.config` and local `.git` folder, run:
```
github-package-builder
```
and your `package.config` will now get populated with all the details found from your github repository.

**NOTE**:
* This is intended for public repositories **only**
* You must clone your repository from a url and not ssh