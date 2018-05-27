(() => {
    'use strict';

    const fs = require('fs');
    const path = require('path');
    const repoFinder = require('./lib/github-repo-finder');
    const githubClient = require('./lib/github-client');
    const packageBuilder = require('./lib/package-builder');

    let onError = error => console.error(error);
    const packagePath = path.join(__dirname, 'package.json');
    if (!fs.existsSync(packagePath)) {
        throw new Error(`could not find package.json at local path ${packagePath}`);
    }
    fs.readFile(packagePath, {
        encoding: 'utf8'
    }, (err, packageJson) => {
        if (err) {
            throw new Error(`error reading package json ${JSON.stringify(err)}`);
        }
        repoFinder.findCurrentRepoUrl()
            .then(url => {
                githubClient.getGithubDetails(url)
                    .then(details => {
                        packageJson = packageBuilder.buildPackage(packageJson, details);
                        fs.writeFile(packagePath, packageJson, {
                            encoding: 'utf8'
                        });
                    })
                    .catch(onError);
            })
            .catch(onError);
    });

})();