import routes from '../router'

interface Options {
  [key: string]: boolean
}

export default (name: string, options: Options, fullpath: string): void => {
  const { test, properties, onlyTest, ...rest } = options
  const keys = Object.keys(rest)
  keys.forEach(element => {
    try {
      console.log(fullpath, name, test, properties, onlyTest, element)
      const response = routes(element)?.handle(fullpath, name, test, properties, onlyTest)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  })
}
