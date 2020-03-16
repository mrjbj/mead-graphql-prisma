import Verror from "verror"
import Assert from "assert"
import { APPLICATION_ERROR } from "./constants"

// extends Javascript Error object in a Typescript friendly way
export const extendError = (err: Error, newProperty: string, value: any): void => {
  Object.defineProperty(err, newProperty, { value: value, enumerable: true })
  //   error.name = "My new name"
  //   extendError(error, "propertyName", "postExists")
  //   extendError(error, "propertyValue", 12345)
  //   extendError(error, "superDuper", true)
  //   extendError(error, "majorDomo", { fun: "yes", goober: "patrol", active: true }
}
//  const msg = "First Level error info"
//     const error = new Error(msg)

//     const verror = new Verror({
//       info: {
//         isApplication: true,
//         propertyName: "postId",
//         propertyValue: postId
//       },
//       cause: error,
//       name: 'JasonCustom'
//     },
//       '2nd Level error info...')
//     throw verror

type SetVerrorOptions = {
  propertyName?: string,
  propertyValue?: any,
  name?: string,
  log?: boolean
}
// need to setup via 'let' do so typescript can work with default values in function
export let SetVerror: (cause: Verror | undefined, message: string, options?: SetVerrorOptions) => Verror

SetVerror = (cause, message, options = {}) => {
  Assert.equal(typeof message, "string", "parameter [message] not a string")

  // cool way to set default values for options parameter
  const {
    name = APPLICATION_ERROR,
    propertyName = "propertyName",
    propertyValue = "propertyValue",
  } = options

  const verror = new Verror({ cause, name, info: { propertyName, propertyValue } }, message)

  if (options.log) {
    console.log(verror)
  }
  return verror
}

export const jStringify = (object: any, pretty = true) => {
  Assert.equal(typeof pretty, "boolean", `Assert: parameter [pretty] is not boolean. [${pretty}]`)

  let msg = ""

  if (object instanceof Error) {
    msg = "JSON warning: not all properties on Error are enumerable."
  }
  msg = msg + (pretty ? JSON.stringify(object, null, 2) : JSON.stringify(object))
  return JSON.stringify(object, null, 2)
}