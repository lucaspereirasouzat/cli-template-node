const CAMEL_CASE_REGEX = /([a-z0-9])([A-Z])/g;

function GetCamelCaseArray(camel: string): string[] {
	return camel.replace(CAMEL_CASE_REGEX, "$1 $2").split(" ");
}

export { GetCamelCaseArray };
