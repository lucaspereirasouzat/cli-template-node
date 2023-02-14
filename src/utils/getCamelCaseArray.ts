function GetCamelCaseArray(camel: string): string[] {
  let reg = /([a-z0-9])([A-Z])/g;
  return camel.replace(reg, '$1 $2').split(' ');
}

export { GetCamelCaseArray }
