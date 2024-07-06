import routes from '../router'

interface Options {
  [key: string]: boolean
}

export default (name: string, options: Options, fullpath: string): void => {
  const { test, properties, onlyTest,Mul, ...rest } = options
  const allroutes = routes()

  const keys = Object.keys(rest)
  keys.forEach(element => {
    try {
      if(allroutes[element]){
        name.split(',').forEach(item => {
          allroutes[element]?.handle(fullpath, item.trim(), test, properties, onlyTest);
        })
      }
    } catch (error) {
      console.log(error)
    }
  })
}
