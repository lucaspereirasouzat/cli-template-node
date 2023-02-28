#!/usr/bin/env node
import version from "changelog";

version.generate("clean_code_template_cli", showChanges);

function showChanges(data) {
	data.versions.forEach(function (version) {
		console.log(version.version);
		console.log(version.date);

		version.changes.forEach(function (change) {
			console.log(change);
		});
	});

	console.log(data.project);
}
