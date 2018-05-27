(function () {
    'use strict';
    const chai = require('chai');
    const expect = chai.expect;
    const githubClient = require('../lib/github-client');
    const thisRepoUrl = 'https://github.com/rguerra712/github-package-builder';

    describe('integration test for github-client', () => {
        it('should have known properties for this repo', () => {
            return githubClient.getGithubDetails(thisRepoUrl)
                .then(details => {
                    expect(details).to.not.equal(undefined, 'details undefined');
                    expect(details.url).to.not.equal(undefined, 'url undefined');
                    expect(details.url).to.equal(thisRepoUrl);
                    expect(details.projectName).to.not.equal(undefined, 'name undefined');
                    expect(details.projectName).to.equal('github-package-builder');
                    expect(details.description).to.not.equal(undefined, 'description undefined');
                    expect(details.description).to.not.equal(''); // this can change anytime via ui
                    expect(details.ownerName).to.not.equal(undefined, 'owner name undefined');
                    expect(details.ownerName).to.equal('R. Stephen Guerra');
                    expect(details.license).to.not.equal(undefined, 'license undefined');
                    expect(details.license).to.equal('MIT');
                });
        });
    });

})();