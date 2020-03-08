import Verror from "verror"
import Assert from "assert"

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

// need to do it this way so typescript can work with default values in function
export let setVerror: (cause: Verror | undefined, message: string, propertyName?: string, propertyValue?: any, name?: string) => Verror

setVerror = (cause, message, propertyName = "n/a", propertyValue = "n/a", name = "ApplicationError") => {
  Assert.equal(typeof message, "string", "parameter [message] not a string")
  return new Verror({ cause, name, info: { propertyName, propertyValue } }, message)
}