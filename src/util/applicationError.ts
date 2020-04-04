import Verror from 'verror'
import Assert from 'assert'
import { APPLICATION_ERROR } from './constants'

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
    propertyName?: string
    propertyValue?: any
    name?: string
    logToConsole?: boolean
}
// need to setup via 'let' do so typescript can work with default values in function
export let SetVerror: (
    cause: Verror | undefined,
    message: string,
    options?: SetVerrorOptions,
) => Verror

// eslint-disable-next-line prefer-const
SetVerror = (cause, message, options = {}): Verror => {
    Assert.equal(typeof message, 'string', 'parameter [message] not a string')

    // cool way to set default values for options parameter during destructuring
    const {
        name = APPLICATION_ERROR,
        propertyName = 'propertyName',
        propertyValue = 'propertyValue',
        logToConsole = false,
    } = options

    const verror = new Verror({ cause, name, info: { propertyName, propertyValue } }, message)

    if (logToConsole) {
        console.log(verror)
    }
    return verror
}

export const jStringify = (object: any, pretty = true): string => {
    Assert.equal(typeof pretty, 'boolean', `Assert: parameter [pretty] is not boolean. [${pretty}]`)

    let msg = ''
    const PADDING = 4

    if (object instanceof Error) {
        msg = 'JSON warning: not all properties on Error are enumerable.'
    }
    msg = msg + (pretty ? JSON.stringify(object, null, PADDING) : JSON.stringify(object))
    return msg
}
