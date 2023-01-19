import { environment } from "src/environments/environment";

export abstract class ServiceBase {
    protected readonly _rootURL = environment.apiUrl + '/api';

    constructor() { }
}
