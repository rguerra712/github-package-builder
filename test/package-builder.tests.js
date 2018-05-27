(() => {
    'use strict';
    const chai = require('chai');
    const expect = chai.expect;
    const packageBuilder = require('../lib/package-builder');

    describe('buildPackage() validation', () => {
        it('should error if no json provided', () => {
            expect(() => packageBuilder.buildPackage()).to.throw("package json should be provided");
        });

        it('should error if empty json provided', () => {
            expect(() => packageBuilder.buildPackage('')).to.throw("package json should be provided");
        });

        it('should error if invalid json provided', () => {
            expect(() => packageBuilder.buildPackage('{')).to.throw("package json should be valid");
        });
    });

    let basicPackageJson = `{
        "name": "wrong name",
        "version": "1.0.0",
        "description": "Something else",
        "main": "index.js",
        "scripts": {
          "test": "echo '' && exit 1"
        },
        "author": "Someone",
        "license": "Something",
        "dependencies": {
          "chai": "^4.1.2"
        }
      }`;
      let githubDetails = {
          url: 'http://www.git.com/someurl-words',
          projectName: 'projectName',
          description: 'Description',
          ownerName: 'Owner',
          license: 'MIT'
      };
      let expectedPackageJson = `{
        "name": "projectName",
        "version": "1.0.0",
        "description": "Description",
        "main": "index.js",
        "scripts": {
          "test": "echo '' && exit 1"
        },
        "author": "Owner",
        "license": "MIT",
        "dependencies": {
            "chai": "^4.1.2"
        },
        "repository": {
            "type": "git",
            "url": "git+http://www.git.com/someurl-words.git"
        },
        "bugs": {
            "url": "http://www.git.com/someurl-words/issues"
        },
        "homepage": "http://www.git.com/someurl-words#readme"
        }`;

    describe('buildPackage() should build json as expected', () => {
        it('should give transformed json from options provided', () => {
            const expectedPackageObject = JSON.parse(expectedPackageJson);
            const expectedPackageObjectString = JSON.stringify(expectedPackageObject, null, 2);
            expect(packageBuilder.buildPackage(basicPackageJson, githubDetails)).to.equal(expectedPackageObjectString);
        });
    });

})();