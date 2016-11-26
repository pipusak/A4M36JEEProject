module AosWebApp{
    export abstract class GeneralRequest{
        protected xhttpReq: XMLHttpRequest;

        protected postCallback: (httpRequest :XMLHttpRequest) => void;
        protected putCallback: (httpRequest :XMLHttpRequest) => void;
        protected deleteCallback: (httpRequest :XMLHttpRequest) => void;
        
        constructor(){
            this.xhttpReq = new XMLHttpRequest();    
        }

        protected sendJsonPostRequest(address: string, requestJson: string){
            this.xhttpReq.onreadystatechange = this.onPostResponse.bind(this);
            this.xhttpReq.open("POST", address, true);
            this.xhttpReq.setRequestHeader("Content-type", "application/json");
            this.xhttpReq.send(requestJson);
        }

        protected sendJsonPutRequest(address: string, requestJson: string){
            this.xhttpReq.onreadystatechange = this.onPutResponse.bind(this);
            this.xhttpReq.open("PUT", address, true);
            this.xhttpReq.setRequestHeader("Content-type", "application/json");
            this.xhttpReq.send(requestJson);
        }

        protected sendGetRequest(address: string){
            this.xhttpReq.onreadystatechange = this.onGetResponse.bind(this);
            this.xhttpReq.open("GET", address, true);
            this.xhttpReq.setRequestHeader("Content-type", "application/json");
            this.xhttpReq.send();
        }

        protected sendDeleteRequest(address: string){
            this.xhttpReq.onreadystatechange = this.onDeleteResponse.bind(this);
            this.xhttpReq.open("DELETE", address, true);
            this.xhttpReq.setRequestHeader("Content-type", "application/json");
            this.xhttpReq.send();
        }

        protected abstract onGetResponse();

        protected onPostResponse(){
            if(this.isResponseReady()){
                this.postCallback(this.xhttpReq);
            }
        }

        protected onPutResponse(){
            if(this.isResponseReady()){
                this.putCallback(this.xhttpReq);
            }
        }

        protected onDeleteResponse(){
            if(this.isResponseReady()){
                this.deleteCallback(this.xhttpReq);
            }
        }

        protected isResponseReady():boolean{
            return (this.xhttpReq.readyState == 4);    
        }

        protected isResponseOk(): boolean{
            return (this.xhttpReq.status == 200);    
        }
    }
}