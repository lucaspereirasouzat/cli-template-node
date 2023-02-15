#!/usr/bin/env node
import version  from 'changelog'

version.generate('clean_code_template_cli',showChanges)

function showChanges(data) {

    //With npm each "version" corresponds to all changes for that build pushed on npm
    //With github each "version" is one GMT day of changes
    data.versions.forEach(function(version) {
        console.log(version.version); //currently npm projects only
        console.log(version.date);    //JS Date

        //version.changes is an array of commit messages for that version
        version.changes.forEach(function(change) {
            console.log(' * ' + change);
        });
    });

    //Information about the project
    console.log(data.project);
}
