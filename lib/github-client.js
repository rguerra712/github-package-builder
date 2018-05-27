(() => {
    'use strict';

    module.exports.getGithubDetails = url => {
        return new Promise((resolve, reject) => {
            const parse = require('parse-github-url');
            const GitHub = require('github-api');
            const gh = new GitHub();

            let parsed = parse(url);
            let repository = gh.getRepo(parsed.owner, parsed.name);
            let user = gh.getUser(parsed.owner);
            let onError = error => reject(error);
            repository.getDetails()
                .then(response => {
                    let repoData = response.data;
                    user.getProfile()
                        .then(response => {
                            let profileData = response.data;
                            resolve({
                                url: url,
                                projectName: repoData.name,
                                description: repoData.description,
                                ownerName: profileData.name,
                                license: repoData.license ? repoData.license.spdx_id : ''
                            });
                        })
                        .catch(onError);
                })
                .catch(onError);
        });
    };
})();