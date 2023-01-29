import routes from '../router'

interface Options {
  [key: string]: boolean;
}

export default (name: string, options: Options, fullpath: string) => {
  const { test, properties, ...rest } = options;
  const keys = Object.keys(rest)
  console.log('adapter', keys, options);

  keys.forEach(element => {
    console.log(element);

    const result = routes(name, element, fullpath)

    console.log(result);

  });
}
