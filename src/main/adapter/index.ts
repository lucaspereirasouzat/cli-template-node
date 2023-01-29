import routes from '../router'

interface Options {
  [key: string]: boolean;
}

export default (name: string, options: Options, fullpath: string) => {
  const keys = Object.keys({controller: true})
  console.log('adapter', keys);

  keys.forEach(element => {
    console.log(element);

    const result = routes(name, element, fullpath)

    console.log(result);

  });
}
