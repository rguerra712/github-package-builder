(() => {
    'use strict';
    const gitConfigPath = require('git-config-path');
    const gitConfigLocal = require('gitconfiglocal');

    module.exports.findCurrentRepoUrl = () => {
        return new Promise((resolve, reject) => {
            let path = gitConfigPath();
            gitConfigLocal(path, (err, config) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!config || !config.remote || !config.remote.origin || !config.remote.origin.url) {
                    reject('config with remote origin url not found');
                    return;
                }
                let url = config.remote.origin.url;
                url = url.replace('.git', '');
                resolve(url);
            });
        });
    };
})();