export class PostsStateModel {
    posts: Posts[];
    constructor(){
        this.posts=[]
    }
  }
  export interface Posts {
    id: string;
    dieta: string;
  }