import app from './app'
import * as express from 'express'

const port = 8080

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(0);
  });

app.listen(port, (err: Error) => {
    if (err) {
        console.log('Error: ', err)
    }
    return console.log(`Server is listening on ${port}`)
})