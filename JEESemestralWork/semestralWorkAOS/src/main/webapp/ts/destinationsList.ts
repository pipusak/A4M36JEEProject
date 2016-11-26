module AosWebApp{
    export class DestinationsList extends GeneralList{
        public static DEST_INPUT_NAME_NEW = "destInputName_new";
        public static DEST_INPUT_LAT_NEW = "destInputLat_new";
        public static DEST_INPUT_LOT_NEW = "destInputLon_new";

        public static DEST_INPUT_NAME = "destInputName_";
        public static DEST_INPUT_LAT = "destInputLat_";
        public static DEST_INPUT_LON = "destInputLon_";

        private destinations: Array<Destination> = null;

        constructor(){
            super();
            this.tableContainer = document.getElementById(Config.AppGuiElements.DESTINATIONS_TABLE_CONTAINER) as HTMLDivElement;
        }
        public loadDestinations(): void{
            let destinationRequest = new DestinationsRequest();
            destinationRequest.getDestinations(this.destinationsLoaded.bind(this));    
        }

        public destinationsLoaded(destinations: Array<Destination>): void{
            this.destinations = destinations;
            this.clearList();

            let tbl = this.createTable();

            let tbdy = document.createElement('tbody');

            let tr1 = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.appendChild(document.createTextNode("Name"));
            tr1.appendChild(td1);

            let td2 = document.createElement('td');
            td2.appendChild(document.createTextNode("Latitude"));
            tr1.appendChild(td2);
            
            let td3 = document.createElement('td');
            td3.appendChild(document.createTextNode("Longitude"));
            tr1.appendChild(td3);

            let td4 = document.createElement('td');
            td4.appendChild(document.createTextNode(""));
            tr1.appendChild(td4);

            tbdy.appendChild(tr1);

            for (let i = 0; i < destinations.length; i++) {
                let trn = document.createElement('tr');

                let td1 = this.createInputCell(destinations[i].name, DestinationsList.DEST_INPUT_NAME+destinations[i].id);
                trn.appendChild(td1);

                let td2 = this.createInputCell(String(destinations[i].lat), DestinationsList.DEST_INPUT_LAT+destinations[i].id);
                trn.appendChild(td2);


                let td3 = this.createInputCell(String(destinations[i].lon), DestinationsList.DEST_INPUT_LON+destinations[i].id);
                trn.appendChild(td3);

                let td4 = document.createElement('td');
                let saveBtn = this.createSaveButton("destBtn_"+destinations[i].id, this.saveBtnClicked.bind(this))
                let deleteBtn = this.createDeleteButton("destDelBtn_"+destinations[i].id, this.deleteBtnClicked.bind(this))
                td4.appendChild(saveBtn);
                td4.appendChild(deleteBtn);

                trn.appendChild(td4);

                tbdy.appendChild(trn);
            }//for

            let trNew = document.createElement('tr');

            td1 = this.createInputCell("",DestinationsList.DEST_INPUT_NAME_NEW);
            trNew.appendChild(td1);

            td2 = this.createInputCell("", DestinationsList.DEST_INPUT_LAT_NEW);
            trNew.appendChild(td2);


            td3 = this.createInputCell("", DestinationsList.DEST_INPUT_LOT_NEW);
            trNew.appendChild(td3);

            td4 = document.createElement('td');
            let saveBtn = this.createSaveButton("destBtn_new", this.saveBtnClicked.bind(this));
            td4.appendChild(saveBtn);

            trNew.appendChild(td4);

            tbdy.appendChild(trNew);

            tbl.appendChild(tbdy);

            this.tableContainer.appendChild(tbl);
        }

        protected deleteBtnClicked(evt: Event){
            let source = evt.srcElement;
            let sourceId = source.id;
            let splited = sourceId.split("_");
            let id: number = Number(splited[1]);

            let destinationRequest = new DestinationsRequest();
            destinationRequest.deleteDestination(this.refreshRequestReady.bind(this), id);
        }

        protected saveBtnClicked(evt: Event){
            let source = evt.srcElement;
            let sourceId = source.id;
            let splited = sourceId.split("_");
            if(splited[1] == "new"){
                let new_dest: Destination = new Destination();
                new_dest.id = 0;
                let nameField = document.getElementById(DestinationsList.DEST_INPUT_NAME_NEW) as HTMLInputElement;
                new_dest.name = nameField.value;

                let latField = document.getElementById(DestinationsList.DEST_INPUT_LAT_NEW) as HTMLInputElement;
                new_dest.lat = Number(latField.value);

                let lonField = document.getElementById(DestinationsList.DEST_INPUT_LOT_NEW) as HTMLInputElement;
                new_dest.lon = Number(lonField.value);

                let destinationRequest = new DestinationsRequest();
                destinationRequest.postDestination(this.refreshRequestReady.bind(this), new_dest);
            }else{
                let id: number = Number(splited[1]);
                for (let i=0;i<this.destinations.length; i++) {
                   if(this.destinations[i].id == id){
                       let nameField = document.getElementById(DestinationsList.DEST_INPUT_NAME+this.destinations[i].id) as HTMLInputElement;
                       this.destinations[i].name = nameField.value;

                       let latField = document.getElementById(DestinationsList.DEST_INPUT_LAT+this.destinations[i].id) as HTMLInputElement;
                       this.destinations[i].lat = Number(latField.value);

                       let lonField = document.getElementById(DestinationsList.DEST_INPUT_LON+this.destinations[i].id) as HTMLInputElement;
                       this.destinations[i].lon = Number(lonField.value);

                       let putRequest = new DestinationsRequest();
                       putRequest.putDestination(this.refreshRequestReady.bind(this), this.destinations[i]);
                       return;
                   }
                }//for    
            }
            //alert(source.id);
        }

        protected refreshRequestReady(httpRequest :XMLHttpRequest): void{
            this.clearList();
            this.loadDestinations();
        }

        /*protected createInputCell(value: string): HTMLTableDataCellElement{
            let td = document.createElement('td');
            let input = document.createElement("input");
            input.value = value;
            td.appendChild(input);
            return td;
        }*/

        

        public showTable(){

        }
    }
}