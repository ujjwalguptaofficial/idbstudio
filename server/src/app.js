import {
    Fort
} from 'fortjs';
import {
    routes
} from './routes';
import {
    FortViewEngine
} from 'eshtml';
import * as path from "path";


export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = FortViewEngine;
    }
}

const pathOfDist = path.join(__dirname, "../../dist");
new App().create({
    port: global.port,
    folders: [{
        alias: "/",
        path: pathOfDist
    }]
}).then(() => {
    console.log(`IDBStudio is runing on port ${global.port}!`)
});