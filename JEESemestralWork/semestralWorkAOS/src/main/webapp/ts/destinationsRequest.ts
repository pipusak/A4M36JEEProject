module AosWebApp{
    export class DestinationsRequest extends GeneralRequest{
        getCallback: (destinations: Array<Destination>) => void;

        constructor(){
            super();
        }

        public getDestinations(callback: (destinations: Array<Destination>) => void){
            this.getCallback = callback;
            this.sendGetRequest(Config.ServicesUrls.DESTINATION_SERVICE);        
        }

        public postDestination(postCallback: (httpRequest :XMLHttpRequest) => void, dest: Destination){
            this.postCallback = postCallback;
            this.sendJsonPostRequest(Config.ServicesUrls.DESTINATION_SERVICE, JSON.stringify(dest));
        }

        public putDestination(putCallback: (httpRequest :XMLHttpRequest) => void, dest: Destination){
            this.putCallback = putCallback;
            this.sendJsonPutRequest(Config.ServicesUrls.DESTINATION_SERVICE+"/"+dest.id, JSON.stringify(dest));
        }

        public deleteDestination(delCallback: (httpRequest :XMLHttpRequest) => void, id: number){
            this.deleteCallback = delCallback;
            this.sendDeleteRequest(Config.ServicesUrls.DESTINATION_SERVICE+"/"+id);
        }

        protected onGetResponse(){
            if(this.isResponseReady()){
                if(this.isResponseOk()){
                    let destinations: Array<Destination> = JSON.parse(this.xhttpReq.responseText);
                    this.getCallback(destinations);
                }
            }
        }

    }
}