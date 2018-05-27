#!/usr/bin/env node

(() => {
    'use strict';

    const fs = require('fs');
    const path = require('path');
    const repoFinder = require('./lib/github-repo-finder');
    const githubClient = require('./lib/github-client');
    const packageBuilder = require('./lib/package-builder');

    let onError = error => {
        console.error(error);
        process.exit(1);
    };
    const packagePath = path.join('./', 'package.json');
    console.log(`creating package.config based on local .git folder and package folder found at ${packagePath}`);
    if (!fs.existsSync(packagePath)) {
        error(`could not find package.json at local path ${packagePath}`);
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
                        console.log('package.config created!');
                    })
                    .catch(onError);
            })
            .catch(onError);
    });

})();