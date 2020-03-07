//  watches files ending in graphql for changes and restarts server as needed. (0)
//  watchSchemaFiles sets up a chokidar.FSwatch on any files ending in *.graphql  (1)
//  if change detected, it writes a new dummy typescript file called 'forceServerRestart.ts' (2)
//  since ts-node-dev already restarts on ts changes properly, this 'dummy update' triggers
//  server restart on behalf of the graphql file itself.
import fs from "fs"
import path from 'path'
import chokidar from 'chokidar'
import { dummy } from './forceServerRestart'

const triggerServerRestart = () => {
  console.log(`Restarting server due to GraphQL schema change.  Last restarted @`, new Date(dummy))
  fs.writeFileSync(
    path.join(__dirname, 'forceServerRestart.ts'),  // (2)
    `export const dummy = ${Date.now()}`
  )
}

export const watchSchemaFiles = () => {
  const watchFiles = chokidar.watch(
    path.join(__dirname, '../**/*.graphql'),  // (1)
    { ignoreInitial: true }
  )
  watchFiles.on('add', triggerServerRestart)   // (0)
  watchFiles.on('change', triggerServerRestart)
  watchFiles.on('unlink', triggerServerRestart)
}
