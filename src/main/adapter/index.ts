import routes from '../router'

interface Options {
  [key: string]: boolean
}

export default (name: string, options: Options, fullpath: string) => {
  const { test, properties, ...rest } = options
  const keys = Object.keys(rest)
  keys.forEach(element => {
    console.log(name, element, fullpath)

    routes(name, element, fullpath)?.handle(fullpath, name, test, properties)
  })
}
