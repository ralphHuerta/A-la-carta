import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class FoodService{
    public url:string;
    public apiKey: string;

    constructor(
        private _http:HttpClient
    ){
        this.url= Global.url;
        this.apiKey= Global.apiKey;
    }

    getPlatos(dieta: string):  Observable<any>{
        let headers = new HttpHeaders().set('Content_type','application/json');
       return this._http.get(this.url+"recipes/complexSearch"+this.apiKey+dieta+'&addRecipeNutrition=true')
    }
    getInfotmation(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content_type','application/json');
        return this._http.get(this.url+"recipes/"+id+"/information"+ this.apiKey+"&includeNutrition=false")
    }
    getLoadin(tocken:any):Observable<any>{
        let params = JSON.stringify(tocken);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post('http://challenge-react.alkemy.org/', params, {headers: headers});
    }
}