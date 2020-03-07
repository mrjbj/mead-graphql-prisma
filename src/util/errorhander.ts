export const setupGlobalErrorHandler = () => {
  process.on('unhandledRejection', (reason) => {
    console.log("Unhandled Rejection from Promise")
    console.log(reason)
    process.exit(200)
  })
  process.on('uncaughtException', (e: Error) => {
    if (e.name === 'ApplicationError') {
      console.log(`Application Error.  Message: [${e.message}]`)
      console.log('-----')
      console.log(e.stack)
    } else {
      console.log(`Uncaught exception.  Name: [${e.name}]  Message: [${e.message}]`)
      console.log(e.stack)
      process.exit(100)
    }
  })
}

