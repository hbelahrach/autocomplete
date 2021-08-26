import dotenv from "dotenv";
import express from "express";
import path from "path";
import { find } from "./services/speciesService";

const app = express();
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );
app.use(express.static(__dirname + '/dist'));

dotenv.config();

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.render( "index" );
} );

app.get( "/find", (req, res) => {
    const name : string = req.query.name as string;
    find(name).then((value) => {
        res.send(value);
    })

});

// start the Express server
app.listen(process.env.SERVER_PORT, () => {
    console.log( `server started at http://localhost:${ process.env.SERVER_PORT }` );
});