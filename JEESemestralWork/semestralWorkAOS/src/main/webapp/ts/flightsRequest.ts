module AosWebApp{
    export class FlightsRequest extends GeneralRequest{
        getCallback: (flights: Array<Flight>) => void;
        postCallback: (httpRequest :XMLHttpRequest) => void;
        deleteCallback:  (httpRequest :XMLHttpRequest) => void;

        constructor(){
            super();
        }

        public getFlights(getCallback: (flights: Array<Flight>) => void){
            this.getCallback = getCallback;
            this.sendGetRequest(Config.ServicesUrls.FLIGHT_SERVICE);        
        }

        public postFlight(postCallback: (httpRequest :XMLHttpRequest) => void, flight: Flight){
            this.postCallback = postCallback;
            this.sendJsonPostRequest(Config.ServicesUrls.FLIGHT_SERVICE, JSON.stringify(flight));
        }

        public putFlight(putCallback: (httpRequest :XMLHttpRequest) => void, flight: Flight){
            this.putCallback = putCallback;
            this.sendJsonPutRequest(Config.ServicesUrls.FLIGHT_SERVICE+"/"+flight.id, JSON.stringify(flight));
        }

        public deleteFlight(delCallback: (httpRequest :XMLHttpRequest) => void, id: number){
            this.deleteCallback = delCallback;
            this.sendDeleteRequest(Config.ServicesUrls.FLIGHT_SERVICE+"/"+id);
        }

        protected onGetResponse(){
            if(this.isResponseReady()){
                if(this.isResponseOk()){
                    let flights: Array<Flight> = JSON.parse(this.xhttpReq.responseText);
                    this.getCallback(flights);
                }
            }
        }
    }
}