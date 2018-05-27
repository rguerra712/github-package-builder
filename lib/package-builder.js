(() => {
    'use strict';

    module.exports.buildPackage = (packageJson, githubDetails) => {
        if (!packageJson) {
            throw new Error('package json should be provided');
        }
        let objectPackage;
        try {
            objectPackage = JSON.parse(packageJson);    
        } catch (error) {
            throw new Error('package json should be valid ' + JSON.stringify(error));
        }
        objectPackage.name = githubDetails.projectName;
        objectPackage.description = githubDetails.description;
        objectPackage.author = githubDetails.ownerName;
        objectPackage.license = githubDetails.license;
        objectPackage.repository = objectPackage.repository || {};
        objectPackage.repository.type = 'git';
        objectPackage.repository.url = `git+${githubDetails.url}.git`;
        objectPackage.bugs = githubDetails.bugs || {};
        objectPackage.bugs.url = `${githubDetails.url}/issues`;
        objectPackage.homepage = `${githubDetails.url}#readme`;
        
        return JSON.stringify(objectPackage, null, 2);
    };
})();