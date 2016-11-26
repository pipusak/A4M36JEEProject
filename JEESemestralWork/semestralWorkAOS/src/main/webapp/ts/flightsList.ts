module AosWebApp{
    export class FlightsList extends GeneralList{
        public static FLIGHT_INPUT_NAME_NEW = "flightInputName_new";
        public static FLIGHT_INPUT_DATE_NEW = "flightInputDate_new";

        public static FLIGHT_INPUT_DIST_NEW = "flightInputDist_new";
        public static FLIGHT_INPUT_PRICE_NEW = "flightInputPrice_new";
        public static FLIGHT_INPUT_SEATS_NEW = "flightInputSeats_new";

        public static FLIGHT_INPUT_FROM_NEW = "flightInputFrom_new";
        public static FLIGHT_INPUT_TO_NEW = "flightInputTo_new";

        public static FLIGHT_INPUT_NAME = "flightInputName_";
        public static FLIGHT_INPUT_DATE = "flightInputDate_";

        public static FLIGHT_INPUT_DIST = "flightInputDist_";
        public static FLIGHT_INPUT_PRICE = "flightInputPrice_";
        public static FLIGHT_INPUT_SEATS = "flightInputSeats_";

        public static FLIGHT_INPUT_FROM = "flightInputFrom_";
        public static FLIGHT_INPUT_TO = "flightInputTo_";

        private flights: Array<Flight> = null;
        private destinations: Array<Destination> = null;

        constructor(){
            super();
            this.tableContainer = document.getElementById(Config.AppGuiElements.FLIGHTS_TABLE_CONTAINER) as HTMLDivElement;
        }

        public loadFlights(): void{
            this.destinations = null;
            this.flights = null;
            let destinationRequest = new DestinationsRequest();
            destinationRequest.getDestinations(this.destinationsLoaded.bind(this));

            let flightsRequest = new FlightsRequest();
            flightsRequest.getFlights(this.flightsLoaded.bind(this));    
        }

        public destinationsLoaded(destinations: Array<Destination>): void{
            this.destinations = destinations;
            this.clearList();

            if(this.destinations && this.flights){
                this.showTable();
            }
        }

        public flightsLoaded(flights: Array<Flight>): void{
            this.flights = flights;
            this.clearList();

            if(this.destinations && this.flights){
                this.showTable();    
            }
        }

        protected showTable(){
            let tbl = this.createTable();

            let tbdy = document.createElement('tbody');

            let tr1 = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.appendChild(document.createTextNode("Name"));
            tr1.appendChild(td1);

            let td2 = document.createElement('td');
            td2.appendChild(document.createTextNode("Date of departure"));
            tr1.appendChild(td2);
            
            let td3 = document.createElement('td');
            td3.appendChild(document.createTextNode("Distance"));
            tr1.appendChild(td3);

            let td4 = document.createElement('td');
            td4.appendChild(document.createTextNode("Price"));
            tr1.appendChild(td4);

            let td5 = document.createElement('td');
            td5.appendChild(document.createTextNode("Seats"));
            tr1.appendChild(td5);

            let td6 = document.createElement('td');
            td6.appendChild(document.createTextNode("From"));
            tr1.appendChild(td6);

            let td7 = document.createElement('td');
            td7.appendChild(document.createTextNode("To"));
            tr1.appendChild(td7);

            let td8 = document.createElement('td');
            td8.appendChild(document.createTextNode(""));
            tr1.appendChild(td8);

            tbdy.appendChild(tr1);

            for (let i = 0; i < this.flights.length; i++) {
                let trn = document.createElement('tr');

                let td1 = this.createInputCell(this.flights[i].name, FlightsList.FLIGHT_INPUT_NAME+this.flights[i].id);
                trn.appendChild(td1);

                let td2 = this.createInputCell(this.flights[i].dateOfDeparture, FlightsList.FLIGHT_INPUT_DATE+this.flights[i].id);
                trn.appendChild(td2);

                let td3 = this.createInputCell(String(this.flights[i].distance), FlightsList.FLIGHT_INPUT_DIST+this.flights[i].id);
                trn.appendChild(td3);

                let td4 = this.createInputCell(String(this.flights[i].price), FlightsList.FLIGHT_INPUT_PRICE+this.flights[i].id);
                trn.appendChild(td4);

                let td5 = this.createInputCell(String(this.flights[i].seats), FlightsList.FLIGHT_INPUT_SEATS+this.flights[i].id);
                trn.appendChild(td5);

                let td6 = this.createDestinationSelector(this.flights[i].from, FlightsList.FLIGHT_INPUT_FROM+this.flights[i].id);
                trn.appendChild(td6);

                let td7 = this.createDestinationSelector(this.flights[i].to, FlightsList.FLIGHT_INPUT_TO+this.flights[i].id);
                trn.appendChild(td7);

                let td8 = document.createElement('td');
                let saveBtn = this.createSaveButton("flightBtn_"+this.flights[i].id, this.saveBtnClicked.bind(this));
                let deleteBtn = this.createDeleteButton("flightDelBtn_"+this.flights[i].id, this.deleteBtnClicked.bind(this));
                td8.appendChild(saveBtn);
                td8.appendChild(deleteBtn);
                trn.appendChild(td8);

                tbdy.appendChild(trn);
            }//for

            let trNew = document.createElement('tr');


            td1 = this.createInputCell("",FlightsList.FLIGHT_INPUT_NAME_NEW);
            trNew.appendChild(td1);

            td2 = this.createInputCell("", FlightsList.FLIGHT_INPUT_DATE_NEW);
            trNew.appendChild(td2);


            td3 = this.createInputCell("", FlightsList.FLIGHT_INPUT_DIST_NEW);
            trNew.appendChild(td3);

            td4 = this.createInputCell("", FlightsList.FLIGHT_INPUT_PRICE_NEW);
            trNew.appendChild(td4);

            td5 = this.createInputCell("", FlightsList.FLIGHT_INPUT_SEATS_NEW);
            trNew.appendChild(td5);

            td6 = this.createDestinationSelector(this.flights[0].from, FlightsList.FLIGHT_INPUT_FROM_NEW);
            trNew.appendChild(td6);

            td7 = this.createDestinationSelector(this.flights[0].to, FlightsList.FLIGHT_INPUT_TO_NEW);
            trNew.appendChild(td7);

            td8 =document.createElement('td');
            let saveBtn = this.createSaveButton("flightBtn_new", this.saveBtnClicked.bind(this));
            td8.appendChild(saveBtn);
            trNew.appendChild(td8);

            tbdy.appendChild(trNew);

            tbl.appendChild(tbdy);

            this.tableContainer.appendChild(tbl);
        }

        protected createDestinationSelector(selectedId: number, id: string): HTMLTableCellElement{
            let options: Array<HTMLOptionElement> = new Array();
            let selectedIndex = -1;
            for(let i = 0; i < this.destinations.length; i++){
                let option = document.createElement('option');
                option.id = String(this.destinations[i].id);
                option.innerText = this.destinations[i].name;
                if(this.destinations[i].id == selectedId){
                    selectedIndex = i;
                }
                options.push(option);
            }
            let td = this.createSelectCell(options, selectedIndex, id);
            return td;
        }

        protected postRequestReady(httpRequest :XMLHttpRequest): void{
            this.clearList();
            this.loadFlights();
        }

        protected saveBtnClicked(evt: Event){
            let source = evt.srcElement;
            let sourceId = source.id;
            let splited = sourceId.split("_");
            if(splited[1] == "new"){
                let new_flight: Flight = new Flight();
                new_flight.id = 0;
                let nameField = document.getElementById(FlightsList.FLIGHT_INPUT_NAME_NEW) as HTMLInputElement;
                new_flight.name = nameField.value;
                
                let dateField = document.getElementById(FlightsList.FLIGHT_INPUT_DATE_NEW) as HTMLInputElement;
                new_flight.dateOfDeparture = dateField.value;

                let distField = document.getElementById(FlightsList.FLIGHT_INPUT_DIST_NEW) as HTMLInputElement;
                new_flight.distance = Number(distField.value);

                let priceField = document.getElementById(FlightsList.FLIGHT_INPUT_PRICE_NEW) as HTMLInputElement;
                new_flight.price = Number(priceField.value);

                let seatsField = document.getElementById(FlightsList.FLIGHT_INPUT_SEATS_NEW) as HTMLInputElement;
                new_flight.seats = Number(seatsField.value);

                let fromField = document.getElementById(FlightsList.FLIGHT_INPUT_FROM_NEW) as HTMLSelectElement;
                let optionsFrom = fromField.options;
                new_flight.from = Number(optionsFrom[optionsFrom.selectedIndex].id);

                let toField = document.getElementById(FlightsList.FLIGHT_INPUT_TO_NEW) as HTMLSelectElement;
                let optionsTo = toField.options;
                new_flight.to = Number(optionsTo[optionsTo.selectedIndex].id);

                let flightRequest = new FlightsRequest();
                flightRequest.postFlight(this.refreshRequestReady.bind(this), new_flight);
            }else{
                let id: number = Number(splited[1]);
                for (let i=0;i<this.flights.length; i++) {
                   if(this.flights[i].id == id){
                        let nameField = document.getElementById(FlightsList.FLIGHT_INPUT_NAME+this.flights[i].id) as HTMLInputElement;
                        this.flights[i].name = nameField.value;
                        
                        let dateField = document.getElementById(FlightsList.FLIGHT_INPUT_DATE+this.flights[i].id) as HTMLInputElement;
                        this.flights[i].dateOfDeparture = dateField.value;

                        let distField = document.getElementById(FlightsList.FLIGHT_INPUT_DIST+this.flights[i].id) as HTMLInputElement;
                        this.flights[i].distance = Number(distField.value);

                        let priceField = document.getElementById(FlightsList.FLIGHT_INPUT_PRICE+this.flights[i].id) as HTMLInputElement;
                        this.flights[i].price = Number(priceField.value);

                        let seatsField = document.getElementById(FlightsList.FLIGHT_INPUT_SEATS+this.flights[i].id) as HTMLInputElement;
                        this.flights[i].seats = Number(seatsField.value);

                        let fromField = document.getElementById(FlightsList.FLIGHT_INPUT_FROM+this.flights[i].id) as HTMLSelectElement;
                        let optionsFrom = fromField.options;
                        this.flights[i].from = Number(optionsFrom[optionsFrom.selectedIndex].id);

                        let toField = document.getElementById(FlightsList.FLIGHT_INPUT_TO+this.flights[i].id) as HTMLSelectElement;
                        let optionsTo = toField.options;
                        this.flights[i].to = Number(optionsTo[optionsTo.selectedIndex].id);

                        let flightRequest = new FlightsRequest();
                        flightRequest.putFlight(this.refreshRequestReady.bind(this), this.flights[i]);
                        return;
                   }
                }//for    
            }
        }

        protected deleteBtnClicked(evt: Event){
            let source = evt.srcElement;
            let sourceId = source.id;
            let splited = sourceId.split("_");
            let id: number = Number(splited[1]);

            let flightsRequest = new FlightsRequest();
            flightsRequest.deleteFlight(this.refreshRequestReady.bind(this), id);
        }

        protected refreshRequestReady(httpRequest :XMLHttpRequest): void{
            this.clearList();
            this.loadFlights();
        }    
    }
}