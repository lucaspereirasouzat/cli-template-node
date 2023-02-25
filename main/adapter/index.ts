import routes from '../router'

interface Options {
  [key: string]: boolean
}

export default (name: string, options: Options, fullpath: string): void => {
  const { test, properties, onlyTest, ...rest } = options
  const allroutes = routes()
  const keys = Object.keys(rest)
  keys.forEach(element => {
    try {
     allroutes[element]?.handle(fullpath, name, test, properties, onlyTest);
    } catch (error) {
      console.log(error)
    }
  })
}
