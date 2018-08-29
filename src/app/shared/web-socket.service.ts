import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws:WebSocket;
  constructor() { }
  //返回一个可订阅的流
  createObservableSocket(url:string,id:number):Observable<any>{
    this.ws=new WebSocket(url);  //webSocket对象，这个对象可以根据传进的url连接到指定的websocket服务器。代码执行到此处会去连接服务器
    //定义流
    return new Observable<string>(
      observer=>{
        this.ws.onmessage=(event)=>observer.next(event.data);   //定义发射下一个元素的时机
        this.ws.onerror=(event)=>observer.error(event);         //定义抛出异常的时机
        this.ws.onclose=(event)=>observer.complete();            //定义发出流结束的信号
        this.ws.onopen=(event)=>this.sendMessage({productId:id});
        return ()=>this.ws.close();
      }
    ).map(message=>JSON.parse(message));
  }
  sendMessage(message:any){
    this.ws.send(JSON.stringify(message));
  }
}
