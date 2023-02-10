import routes from '../router'

interface Options {
  [key: string]: boolean
}

export default (name: string, options: Options, fullpath: string) => {
  const { test, properties, onlyTest, ...rest } = options
  const keys = Object.keys(rest)
  keys.forEach(element => {
    console.log(name, element, fullpath)
    try {
      console.log(routes(element))
      routes(element)?.handle(fullpath, name, test, properties, onlyTest)
    } catch (error) {
      console.log(error)
    }
  })
}
