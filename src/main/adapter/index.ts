import routes from '../router'

interface Options {
  [key: string]: boolean;
}

export default (name: string, options: Options, fullpath: string) => {
  const keys = Object.keys(options)

  keys.forEach(element => {
    routes(name, element, fullpath)
  });
}
