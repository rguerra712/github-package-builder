(() => {
    'use strict';
    const chai = require('chai');
    const expect = chai.expect;
    const finder = require('../lib/github-repo-finder');
    const expectedCurrentUrl = 'https://github.com/rguerra712/github-package-builder';

    describe('integration test for finder.findCurrentRepoUrl()', () => {
        it('should give current repo config', () => {
            return finder.findCurrentRepoUrl()
                .then(url => {
                    expect(url).to.equal(expectedCurrentUrl);
                });
        });
    });
})();