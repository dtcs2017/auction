import {EventEmitter, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/index";
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /*private products: Product[]=[
    new Product(1,"第一个商品",1.99,3.5,"这是第一个商品，是我在学习慕课网创建的",["电子产品","硬件设备"]),
    new Product(2,"第二个商品",2.99,2.5,"这是第二个商品，是我在学习慕课网创建的",["图书"]),
    new Product(3,"第三个商品",3.99,4.5,"这是第三个商品，是我在学习慕课网创建的",["电子产品","硬件设备"]),
    new Product(4,"第四个商品",4.99,1.5,"这是第四个商品，是我在学习慕课网创建的",["电子产品","硬件设备"]),
    new Product(5,"第五个商品",5.99,4.5,"这是第五个商品，是我在学习慕课网创建的",["电子产品"]),
    new Product(6,"第六个商品",6.99,2.5,"这是第六个商品，是我在学习慕课网创建的",["图书"])
  ];*/

  private comments:Comment[]=[
    new Comment(1,1,"2017-02-02 22:22:22","张三",3,"东西不错"),
    new Comment(2,1,"2017-03-03 23:22:22","李四",4,"东西不错"),
    new Comment(3,1,"2017-04-04 21:22:22","王五",5,"东西蛮不错"),
    new Comment(4,2,"2017-05-05 20:22:22","赵六",2,"东西不错"),

  ];

  serchEvent:EventEmitter<ProductSearchParams>=new EventEmitter();
  constructor(private http:Http) { }

  getAllCategories():string[]{
    return ["电子产品","硬件设备","图书"];
  }

  getProducts():Observable<Product[]>{
    return this.http.get("/api/products").map(res=>res.json());
  }

  getProduct(id:number):Observable<Product>{
    return this.http.get("/api/products"+id).map(res=>res.json());
  }

  getCommentsForProductId(id:number):Observable<Comment[]>{
    return this.http.get("/api/products"+id+"/comments").map(res=>res.json());
  }

  search(params:ProductSearchParams):Observable<Product[]>{
    return this.http.get("/api/products",{search:this.encodeParams(params)}).map(res=>res.json());
  }

  private encodeParams(params:ProductSearchParams){
    return Object.keys(params)
      .filter(key=>params[key])
      .reduce((sum:URLSearchParams,key:string)=>{
      sum.append(key,params[key]);
      return sum;
      },new URLSearchParams());
  }
}

export class ProductSearchParams{
  constructor(public title:string,
              public price:number,
              public category:string
  ){}
}

export class Product{
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ){

  }
}

export class Comment{
  constructor(public id:number,
              public productId:number,
              public timestamp:string,
              public user:string,
              public rating:number,
              public content:string){}
}
