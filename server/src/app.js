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


new App().create({
    port: global.port,
    folders: [{
        alias: "/",
        path: path.join(process.cwd(), "/dist")
    }]
}).then(() => {
    console.log(`IDBStudio is runing on port ${port}!`)
});