import { BehaviorSubject } from "rxjs";
import { Directory } from "./directory";

export class Workspace {
    directory$ = new BehaviorSubject<Directory>(new Directory());
}
