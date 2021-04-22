import { makeAutoObservable } from "mobx";

export default class CommonStore{
    error = undefined;

    constructor(){
        makeAutoObservable(this);
    }
    setServerError = (error) => {
        this.error = error;
    }
}