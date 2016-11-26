var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AosWebApp;
(function (AosWebApp) {
    var Config;
    (function (Config) {
        var ServicesUrls;
        (function (ServicesUrls) {
            var SERVICES_BASE_PATH = "webresources/";
            ServicesUrls.DESTINATION_SERVICE = SERVICES_BASE_PATH + "destination";
            ServicesUrls.FLIGHT_SERVICE = SERVICES_BASE_PATH + "flight";
            ServicesUrls.RESERVATION_SERVICE = SERVICES_BASE_PATH + "reservation";
        })(ServicesUrls = Config.ServicesUrls || (Config.ServicesUrls = {}));
        var AppGuiElements;
        (function (AppGuiElements) {
            AppGuiElements.LOADING_SCREEN = "loadingScreen";
            AppGuiElements.UPPER_BAR = "upperBar";
            AppGuiElements.BUTTON_MANAGE_DESTIONATIONS = "buttonManageDestinations";
            AppGuiElements.BUTTON_MANAGE_FLIGHTS = "buttonManageFlights";
            AppGuiElements.BUTTON_MANAGE_RESERVATIONS = "buttonManageReservations";
            AppGuiElements.DESTINATIONS_SCREEN = "destinationsScreen";
            AppGuiElements.FLIGHTS_SCREEN = "flightsScreen";
            AppGuiElements.RESERVATIONS_SCREEN = "reservationsScreen";
            AppGuiElements.DESTINATIONS_TABLE_CONTAINER = "destinationsTableContainer";
            AppGuiElements.FLIGHTS_TABLE_CONTAINER = "flightsTableContainer";
            AppGuiElements.RESERVATIONS_TABLE_CONTAINER = "reservationsTableContainer";
        })(AppGuiElements = Config.AppGuiElements || (Config.AppGuiElements = {}));
    })(Config = AosWebApp.Config || (AosWebApp.Config = {}));
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var Destination = (function () {
        function Destination() {
        }
        return Destination;
    }());
    AosWebApp.Destination = Destination;
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var Flight = (function () {
        function Flight() {
        }
        return Flight;
    }());
    AosWebApp.Flight = Flight;
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var Reservation = (function () {
        function Reservation() {
        }
        return Reservation;
    }());
    AosWebApp.Reservation = Reservation;
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var GeneralRequest = (function () {
        function GeneralRequest() {
            this.xhttpReq = new XMLHttpRequest();
        }
        GeneralRequest.prototype.sendJsonPostRequest = function (address, requestJson) {
            this.xhttpReq.onreadystatechange = this.onPostResponse.bind(this);
            this.xhttpReq.open("POST", address, true);
            this.xhttpReq.setRequestHeader("Content-type", "application/json");
            this.xhttpReq.send(requestJson);
        };
        GeneralRequest.prototype.sendJsonPutRequest = function (address, requestJson) {
            this.xhttpReq.onreadystatechange = this.onPutResponse.bind(this);
            this.xhttpReq.open("PUT", address, true);
            this.xhttpReq.setRequestHeader("Content-type", "application/json");
            this.xhttpReq.send(requestJson);
        };
        GeneralRequest.prototype.sendGetRequest = function (address) {
            this.xhttpReq.onreadystatechange = this.onGetResponse.bind(this);
            this.xhttpReq.open("GET", address, true);
            this.xhttpReq.setRequestHeader("Content-type", "application/json");
            this.xhttpReq.send();
        };
        GeneralRequest.prototype.sendDeleteRequest = function (address) {
            this.xhttpReq.onreadystatechange = this.onDeleteResponse.bind(this);
            this.xhttpReq.open("DELETE", address, true);
            this.xhttpReq.setRequestHeader("Content-type", "application/json");
            this.xhttpReq.send();
        };
        GeneralRequest.prototype.onPostResponse = function () {
            if (this.isResponseReady()) {
                this.postCallback(this.xhttpReq);
            }
        };
        GeneralRequest.prototype.onPutResponse = function () {
            if (this.isResponseReady()) {
                this.putCallback(this.xhttpReq);
            }
        };
        GeneralRequest.prototype.onDeleteResponse = function () {
            if (this.isResponseReady()) {
                this.deleteCallback(this.xhttpReq);
            }
        };
        GeneralRequest.prototype.isResponseReady = function () {
            return (this.xhttpReq.readyState == 4);
        };
        GeneralRequest.prototype.isResponseOk = function () {
            return (this.xhttpReq.status == 200);
        };
        return GeneralRequest;
    }());
    AosWebApp.GeneralRequest = GeneralRequest;
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var GeneralList = (function () {
        function GeneralList() {
        }
        GeneralList.prototype.createInputCell = function (value, id) {
            var td = document.createElement('td');
            var input = document.createElement("input");
            input.value = value;
            input.id = id;
            td.appendChild(input);
            return td;
        };
        GeneralList.prototype.createSelectCell = function (options, selected, id) {
            var td = document.createElement('td');
            var selectElement = document.createElement('select');
            selectElement.id = id;
            for (var i = 0; i < options.length; i++) {
                selectElement.appendChild(options[i]);
            } //for
            selectElement.selectedIndex = selected;
            td.appendChild(selectElement);
            return td;
        };
        GeneralList.prototype.createSaveButton = function (id, callback) {
            //let tableCell = document.createElement('td');
            var button = document.createElement("button");
            button.id = id;
            button.title = "Save";
            button.textContent = "Save";
            button.addEventListener("click", callback, false);
            return button;
            //tableCell.appendChild(button);
            //return tableCell;
        };
        GeneralList.prototype.createDeleteButton = function (id, callback) {
            var button = document.createElement("button");
            button.id = id;
            button.title = "Delete";
            button.textContent = "Delete";
            button.addEventListener("click", callback, false);
            return button;
        };
        GeneralList.prototype.clearList = function () {
            while (this.tableContainer.firstChild) {
                this.tableContainer.removeChild(this.tableContainer.firstChild);
            }
        };
        GeneralList.prototype.createTable = function () {
            var tbl = document.createElement('table');
            tbl.style.width = '100%';
            tbl.setAttribute('border', '1');
            return tbl;
        };
        return GeneralList;
    }());
    AosWebApp.GeneralList = GeneralList;
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var DestinationsRequest = (function (_super) {
        __extends(DestinationsRequest, _super);
        function DestinationsRequest() {
            _super.call(this);
        }
        DestinationsRequest.prototype.getDestinations = function (callback) {
            this.getCallback = callback;
            this.sendGetRequest(AosWebApp.Config.ServicesUrls.DESTINATION_SERVICE);
        };
        DestinationsRequest.prototype.postDestination = function (postCallback, dest) {
            this.postCallback = postCallback;
            this.sendJsonPostRequest(AosWebApp.Config.ServicesUrls.DESTINATION_SERVICE, JSON.stringify(dest));
        };
        DestinationsRequest.prototype.putDestination = function (putCallback, dest) {
            this.putCallback = putCallback;
            this.sendJsonPutRequest(AosWebApp.Config.ServicesUrls.DESTINATION_SERVICE + "/" + dest.id, JSON.stringify(dest));
        };
        DestinationsRequest.prototype.deleteDestination = function (delCallback, id) {
            this.deleteCallback = delCallback;
            this.sendDeleteRequest(AosWebApp.Config.ServicesUrls.DESTINATION_SERVICE + "/" + id);
        };
        DestinationsRequest.prototype.onGetResponse = function () {
            if (this.isResponseReady()) {
                if (this.isResponseOk()) {
                    var destinations = JSON.parse(this.xhttpReq.responseText);
                    this.getCallback(destinations);
                }
            }
        };
        return DestinationsRequest;
    }(AosWebApp.GeneralRequest));
    AosWebApp.DestinationsRequest = DestinationsRequest;
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var DestinationsList = (function (_super) {
        __extends(DestinationsList, _super);
        function DestinationsList() {
            _super.call(this);
            this.destinations = null;
            this.tableContainer = document.getElementById(AosWebApp.Config.AppGuiElements.DESTINATIONS_TABLE_CONTAINER);
        }
        DestinationsList.prototype.loadDestinations = function () {
            var destinationRequest = new AosWebApp.DestinationsRequest();
            destinationRequest.getDestinations(this.destinationsLoaded.bind(this));
        };
        DestinationsList.prototype.destinationsLoaded = function (destinations) {
            this.destinations = destinations;
            this.clearList();
            var tbl = this.createTable();
            var tbdy = document.createElement('tbody');
            var tr1 = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.appendChild(document.createTextNode("Name"));
            tr1.appendChild(td1);
            var td2 = document.createElement('td');
            td2.appendChild(document.createTextNode("Latitude"));
            tr1.appendChild(td2);
            var td3 = document.createElement('td');
            td3.appendChild(document.createTextNode("Longitude"));
            tr1.appendChild(td3);
            var td4 = document.createElement('td');
            td4.appendChild(document.createTextNode(""));
            tr1.appendChild(td4);
            tbdy.appendChild(tr1);
            for (var i = 0; i < destinations.length; i++) {
                var trn = document.createElement('tr');
                var td1_1 = this.createInputCell(destinations[i].name, DestinationsList.DEST_INPUT_NAME + destinations[i].id);
                trn.appendChild(td1_1);
                var td2_1 = this.createInputCell(String(destinations[i].lat), DestinationsList.DEST_INPUT_LAT + destinations[i].id);
                trn.appendChild(td2_1);
                var td3_1 = this.createInputCell(String(destinations[i].lon), DestinationsList.DEST_INPUT_LON + destinations[i].id);
                trn.appendChild(td3_1);
                var td4_1 = document.createElement('td');
                var saveBtn_1 = this.createSaveButton("destBtn_" + destinations[i].id, this.saveBtnClicked.bind(this));
                var deleteBtn = this.createDeleteButton("destDelBtn_" + destinations[i].id, this.deleteBtnClicked.bind(this));
                td4_1.appendChild(saveBtn_1);
                td4_1.appendChild(deleteBtn);
                trn.appendChild(td4_1);
                tbdy.appendChild(trn);
            } //for
            var trNew = document.createElement('tr');
            td1 = this.createInputCell("", DestinationsList.DEST_INPUT_NAME_NEW);
            trNew.appendChild(td1);
            td2 = this.createInputCell("", DestinationsList.DEST_INPUT_LAT_NEW);
            trNew.appendChild(td2);
            td3 = this.createInputCell("", DestinationsList.DEST_INPUT_LOT_NEW);
            trNew.appendChild(td3);
            td4 = document.createElement('td');
            var saveBtn = this.createSaveButton("destBtn_new", this.saveBtnClicked.bind(this));
            td4.appendChild(saveBtn);
            trNew.appendChild(td4);
            tbdy.appendChild(trNew);
            tbl.appendChild(tbdy);
            this.tableContainer.appendChild(tbl);
        };
        DestinationsList.prototype.deleteBtnClicked = function (evt) {
            var source = evt.srcElement;
            var sourceId = source.id;
            var splited = sourceId.split("_");
            var id = Number(splited[1]);
            var destinationRequest = new AosWebApp.DestinationsRequest();
            destinationRequest.deleteDestination(this.refreshRequestReady.bind(this), id);
        };
        DestinationsList.prototype.saveBtnClicked = function (evt) {
            var source = evt.srcElement;
            var sourceId = source.id;
            var splited = sourceId.split("_");
            if (splited[1] == "new") {
                var new_dest = new AosWebApp.Destination();
                new_dest.id = 0;
                var nameField = document.getElementById(DestinationsList.DEST_INPUT_NAME_NEW);
                new_dest.name = nameField.value;
                var latField = document.getElementById(DestinationsList.DEST_INPUT_LAT_NEW);
                new_dest.lat = Number(latField.value);
                var lonField = document.getElementById(DestinationsList.DEST_INPUT_LOT_NEW);
                new_dest.lon = Number(lonField.value);
                var destinationRequest = new AosWebApp.DestinationsRequest();
                destinationRequest.postDestination(this.refreshRequestReady.bind(this), new_dest);
            }
            else {
                var id = Number(splited[1]);
                for (var i = 0; i < this.destinations.length; i++) {
                    if (this.destinations[i].id == id) {
                        var nameField = document.getElementById(DestinationsList.DEST_INPUT_NAME + this.destinations[i].id);
                        this.destinations[i].name = nameField.value;
                        var latField = document.getElementById(DestinationsList.DEST_INPUT_LAT + this.destinations[i].id);
                        this.destinations[i].lat = Number(latField.value);
                        var lonField = document.getElementById(DestinationsList.DEST_INPUT_LON + this.destinations[i].id);
                        this.destinations[i].lon = Number(lonField.value);
                        var putRequest = new AosWebApp.DestinationsRequest();
                        putRequest.putDestination(this.refreshRequestReady.bind(this), this.destinations[i]);
                        return;
                    }
                } //for    
            }
            //alert(source.id);
        };
        DestinationsList.prototype.refreshRequestReady = function (httpRequest) {
            this.clearList();
            this.loadDestinations();
        };
        /*protected createInputCell(value: string): HTMLTableDataCellElement{
            let td = document.createElement('td');
            let input = document.createElement("input");
            input.value = value;
            td.appendChild(input);
            return td;
        }*/
        DestinationsList.prototype.showTable = function () {
        };
        DestinationsList.DEST_INPUT_NAME_NEW = "destInputName_new";
        DestinationsList.DEST_INPUT_LAT_NEW = "destInputLat_new";
        DestinationsList.DEST_INPUT_LOT_NEW = "destInputLon_new";
        DestinationsList.DEST_INPUT_NAME = "destInputName_";
        DestinationsList.DEST_INPUT_LAT = "destInputLat_";
        DestinationsList.DEST_INPUT_LON = "destInputLon_";
        return DestinationsList;
    }(AosWebApp.GeneralList));
    AosWebApp.DestinationsList = DestinationsList;
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var FlightsRequest = (function (_super) {
        __extends(FlightsRequest, _super);
        function FlightsRequest() {
            _super.call(this);
        }
        FlightsRequest.prototype.getFlights = function (getCallback) {
            this.getCallback = getCallback;
            this.sendGetRequest(AosWebApp.Config.ServicesUrls.FLIGHT_SERVICE);
        };
        FlightsRequest.prototype.postFlight = function (postCallback, flight) {
            this.postCallback = postCallback;
            this.sendJsonPostRequest(AosWebApp.Config.ServicesUrls.FLIGHT_SERVICE, JSON.stringify(flight));
        };
        FlightsRequest.prototype.putFlight = function (putCallback, flight) {
            this.putCallback = putCallback;
            this.sendJsonPutRequest(AosWebApp.Config.ServicesUrls.FLIGHT_SERVICE + "/" + flight.id, JSON.stringify(flight));
        };
        FlightsRequest.prototype.deleteFlight = function (delCallback, id) {
            this.deleteCallback = delCallback;
            this.sendDeleteRequest(AosWebApp.Config.ServicesUrls.FLIGHT_SERVICE + "/" + id);
        };
        FlightsRequest.prototype.onGetResponse = function () {
            if (this.isResponseReady()) {
                if (this.isResponseOk()) {
                    var flights = JSON.parse(this.xhttpReq.responseText);
                    this.getCallback(flights);
                }
            }
        };
        return FlightsRequest;
    }(AosWebApp.GeneralRequest));
    AosWebApp.FlightsRequest = FlightsRequest;
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var FlightsList = (function (_super) {
        __extends(FlightsList, _super);
        function FlightsList() {
            _super.call(this);
            this.flights = null;
            this.destinations = null;
            this.tableContainer = document.getElementById(AosWebApp.Config.AppGuiElements.FLIGHTS_TABLE_CONTAINER);
        }
        FlightsList.prototype.loadFlights = function () {
            this.destinations = null;
            this.flights = null;
            var destinationRequest = new AosWebApp.DestinationsRequest();
            destinationRequest.getDestinations(this.destinationsLoaded.bind(this));
            var flightsRequest = new AosWebApp.FlightsRequest();
            flightsRequest.getFlights(this.flightsLoaded.bind(this));
        };
        FlightsList.prototype.destinationsLoaded = function (destinations) {
            this.destinations = destinations;
            this.clearList();
            if (this.destinations && this.flights) {
                this.showTable();
            }
        };
        FlightsList.prototype.flightsLoaded = function (flights) {
            this.flights = flights;
            this.clearList();
            if (this.destinations && this.flights) {
                this.showTable();
            }
        };
        FlightsList.prototype.showTable = function () {
            var tbl = this.createTable();
            var tbdy = document.createElement('tbody');
            var tr1 = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.appendChild(document.createTextNode("Name"));
            tr1.appendChild(td1);
            var td2 = document.createElement('td');
            td2.appendChild(document.createTextNode("Date of departure"));
            tr1.appendChild(td2);
            var td3 = document.createElement('td');
            td3.appendChild(document.createTextNode("Distance"));
            tr1.appendChild(td3);
            var td4 = document.createElement('td');
            td4.appendChild(document.createTextNode("Price"));
            tr1.appendChild(td4);
            var td5 = document.createElement('td');
            td5.appendChild(document.createTextNode("Seats"));
            tr1.appendChild(td5);
            var td6 = document.createElement('td');
            td6.appendChild(document.createTextNode("From"));
            tr1.appendChild(td6);
            var td7 = document.createElement('td');
            td7.appendChild(document.createTextNode("To"));
            tr1.appendChild(td7);
            var td8 = document.createElement('td');
            td8.appendChild(document.createTextNode(""));
            tr1.appendChild(td8);
            tbdy.appendChild(tr1);
            for (var i = 0; i < this.flights.length; i++) {
                var trn = document.createElement('tr');
                var td1_2 = this.createInputCell(this.flights[i].name, FlightsList.FLIGHT_INPUT_NAME + this.flights[i].id);
                trn.appendChild(td1_2);
                var td2_2 = this.createInputCell(this.flights[i].dateOfDeparture, FlightsList.FLIGHT_INPUT_DATE + this.flights[i].id);
                trn.appendChild(td2_2);
                var td3_2 = this.createInputCell(String(this.flights[i].distance), FlightsList.FLIGHT_INPUT_DIST + this.flights[i].id);
                trn.appendChild(td3_2);
                var td4_2 = this.createInputCell(String(this.flights[i].price), FlightsList.FLIGHT_INPUT_PRICE + this.flights[i].id);
                trn.appendChild(td4_2);
                var td5_1 = this.createInputCell(String(this.flights[i].seats), FlightsList.FLIGHT_INPUT_SEATS + this.flights[i].id);
                trn.appendChild(td5_1);
                var td6_1 = this.createDestinationSelector(this.flights[i].from, FlightsList.FLIGHT_INPUT_FROM + this.flights[i].id);
                trn.appendChild(td6_1);
                var td7_1 = this.createDestinationSelector(this.flights[i].to, FlightsList.FLIGHT_INPUT_TO + this.flights[i].id);
                trn.appendChild(td7_1);
                var td8_1 = document.createElement('td');
                var saveBtn_2 = this.createSaveButton("flightBtn_" + this.flights[i].id, this.saveBtnClicked.bind(this));
                var deleteBtn = this.createDeleteButton("flightDelBtn_" + this.flights[i].id, this.deleteBtnClicked.bind(this));
                td8_1.appendChild(saveBtn_2);
                td8_1.appendChild(deleteBtn);
                trn.appendChild(td8_1);
                tbdy.appendChild(trn);
            } //for
            var trNew = document.createElement('tr');
            td1 = this.createInputCell("", FlightsList.FLIGHT_INPUT_NAME_NEW);
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
            td8 = document.createElement('td');
            var saveBtn = this.createSaveButton("flightBtn_new", this.saveBtnClicked.bind(this));
            td8.appendChild(saveBtn);
            trNew.appendChild(td8);
            tbdy.appendChild(trNew);
            tbl.appendChild(tbdy);
            this.tableContainer.appendChild(tbl);
        };
        FlightsList.prototype.createDestinationSelector = function (selectedId, id) {
            var options = new Array();
            var selectedIndex = -1;
            for (var i = 0; i < this.destinations.length; i++) {
                var option = document.createElement('option');
                option.id = String(this.destinations[i].id);
                option.innerText = this.destinations[i].name;
                if (this.destinations[i].id == selectedId) {
                    selectedIndex = i;
                }
                options.push(option);
            }
            var td = this.createSelectCell(options, selectedIndex, id);
            return td;
        };
        FlightsList.prototype.postRequestReady = function (httpRequest) {
            this.clearList();
            this.loadFlights();
        };
        FlightsList.prototype.saveBtnClicked = function (evt) {
            var source = evt.srcElement;
            var sourceId = source.id;
            var splited = sourceId.split("_");
            if (splited[1] == "new") {
                var new_flight = new AosWebApp.Flight();
                new_flight.id = 0;
                var nameField = document.getElementById(FlightsList.FLIGHT_INPUT_NAME_NEW);
                new_flight.name = nameField.value;
                var dateField = document.getElementById(FlightsList.FLIGHT_INPUT_DATE_NEW);
                new_flight.dateOfDeparture = dateField.value;
                var distField = document.getElementById(FlightsList.FLIGHT_INPUT_DIST_NEW);
                new_flight.distance = Number(distField.value);
                var priceField = document.getElementById(FlightsList.FLIGHT_INPUT_PRICE_NEW);
                new_flight.price = Number(priceField.value);
                var seatsField = document.getElementById(FlightsList.FLIGHT_INPUT_SEATS_NEW);
                new_flight.seats = Number(seatsField.value);
                var fromField = document.getElementById(FlightsList.FLIGHT_INPUT_FROM_NEW);
                var optionsFrom = fromField.options;
                new_flight.from = Number(optionsFrom[optionsFrom.selectedIndex].id);
                var toField = document.getElementById(FlightsList.FLIGHT_INPUT_TO_NEW);
                var optionsTo = toField.options;
                new_flight.to = Number(optionsTo[optionsTo.selectedIndex].id);
                var flightRequest = new AosWebApp.FlightsRequest();
                flightRequest.postFlight(this.refreshRequestReady.bind(this), new_flight);
            }
            else {
                var id = Number(splited[1]);
                for (var i = 0; i < this.flights.length; i++) {
                    if (this.flights[i].id == id) {
                        var nameField = document.getElementById(FlightsList.FLIGHT_INPUT_NAME + this.flights[i].id);
                        this.flights[i].name = nameField.value;
                        var dateField = document.getElementById(FlightsList.FLIGHT_INPUT_DATE + this.flights[i].id);
                        this.flights[i].dateOfDeparture = dateField.value;
                        var distField = document.getElementById(FlightsList.FLIGHT_INPUT_DIST + this.flights[i].id);
                        this.flights[i].distance = Number(distField.value);
                        var priceField = document.getElementById(FlightsList.FLIGHT_INPUT_PRICE + this.flights[i].id);
                        this.flights[i].price = Number(priceField.value);
                        var seatsField = document.getElementById(FlightsList.FLIGHT_INPUT_SEATS + this.flights[i].id);
                        this.flights[i].seats = Number(seatsField.value);
                        var fromField = document.getElementById(FlightsList.FLIGHT_INPUT_FROM + this.flights[i].id);
                        var optionsFrom = fromField.options;
                        this.flights[i].from = Number(optionsFrom[optionsFrom.selectedIndex].id);
                        var toField = document.getElementById(FlightsList.FLIGHT_INPUT_TO + this.flights[i].id);
                        var optionsTo = toField.options;
                        this.flights[i].to = Number(optionsTo[optionsTo.selectedIndex].id);
                        var flightRequest = new AosWebApp.FlightsRequest();
                        flightRequest.putFlight(this.refreshRequestReady.bind(this), this.flights[i]);
                        return;
                    }
                } //for    
            }
        };
        FlightsList.prototype.deleteBtnClicked = function (evt) {
            var source = evt.srcElement;
            var sourceId = source.id;
            var splited = sourceId.split("_");
            var id = Number(splited[1]);
            var flightsRequest = new AosWebApp.FlightsRequest();
            flightsRequest.deleteFlight(this.refreshRequestReady.bind(this), id);
        };
        FlightsList.prototype.refreshRequestReady = function (httpRequest) {
            this.clearList();
            this.loadFlights();
        };
        FlightsList.FLIGHT_INPUT_NAME_NEW = "flightInputName_new";
        FlightsList.FLIGHT_INPUT_DATE_NEW = "flightInputDate_new";
        FlightsList.FLIGHT_INPUT_DIST_NEW = "flightInputDist_new";
        FlightsList.FLIGHT_INPUT_PRICE_NEW = "flightInputPrice_new";
        FlightsList.FLIGHT_INPUT_SEATS_NEW = "flightInputSeats_new";
        FlightsList.FLIGHT_INPUT_FROM_NEW = "flightInputFrom_new";
        FlightsList.FLIGHT_INPUT_TO_NEW = "flightInputTo_new";
        FlightsList.FLIGHT_INPUT_NAME = "flightInputName_";
        FlightsList.FLIGHT_INPUT_DATE = "flightInputDate_";
        FlightsList.FLIGHT_INPUT_DIST = "flightInputDist_";
        FlightsList.FLIGHT_INPUT_PRICE = "flightInputPrice_";
        FlightsList.FLIGHT_INPUT_SEATS = "flightInputSeats_";
        FlightsList.FLIGHT_INPUT_FROM = "flightInputFrom_";
        FlightsList.FLIGHT_INPUT_TO = "flightInputTo_";
        return FlightsList;
    }(AosWebApp.GeneralList));
    AosWebApp.FlightsList = FlightsList;
})(AosWebApp || (AosWebApp = {}));
var AosWebApp;
(function (AosWebApp) {
    var App = (function () {
        function App() {
            this.destinationsList = new AosWebApp.DestinationsList();
            this.flightsList = new AosWebApp.FlightsList();
            this.manageDestinationsMenuItem =
                document.getElementById(AosWebApp.Config.AppGuiElements.BUTTON_MANAGE_DESTIONATIONS);
            this.manageFlightsMenuItem =
                document.getElementById(AosWebApp.Config.AppGuiElements.BUTTON_MANAGE_FLIGHTS);
            this.manageReservationsMenuItem =
                document.getElementById(AosWebApp.Config.AppGuiElements.BUTTON_MANAGE_RESERVATIONS);
            this.destinationScreen = document.getElementById(AosWebApp.Config.AppGuiElements.DESTINATIONS_SCREEN);
            this.flightScreen = document.getElementById(AosWebApp.Config.AppGuiElements.FLIGHTS_SCREEN);
            this.reservationScreen = document.getElementById(AosWebApp.Config.AppGuiElements.RESERVATIONS_SCREEN);
            this.manageDestinationsMenuItem.addEventListener("click", this.manageDestinationsClicked.bind(this), false);
            this.manageFlightsMenuItem.addEventListener("click", this.manageFlightsClicked.bind(this), false);
            this.manageReservationsMenuItem.addEventListener("click", this.manageReservationsClicked.bind(this), false);
            this.loadingScreen = document.getElementById(AosWebApp.Config.AppGuiElements.LOADING_SCREEN);
            this.upperBar = document.getElementById(AosWebApp.Config.AppGuiElements.UPPER_BAR);
            //TODO: Add other handlers
            this.upperBar.setAttribute("style", "display: block");
            this.loadingScreen.setAttribute("style", "display: none");
        }
        App.prototype.manageDestinationsClicked = function () {
            this.showDestinationsScreen();
            this.destinationsList.loadDestinations();
        };
        App.prototype.manageFlightsClicked = function () {
            this.showFlightsScreen();
            this.flightsList.loadFlights();
        };
        App.prototype.manageReservationsClicked = function () {
            this.showReservationsScreen();
        };
        App.prototype.showDestinationsScreen = function () {
            this.destinationScreen.removeAttribute("style");
            this.flightScreen.setAttribute("style", "display:none");
            this.reservationScreen.setAttribute("style", "display:none");
        };
        App.prototype.showFlightsScreen = function () {
            this.destinationScreen.setAttribute("style", "display:none");
            this.flightScreen.removeAttribute("style");
            this.reservationScreen.setAttribute("style", "display:none");
        };
        App.prototype.showReservationsScreen = function () {
            this.destinationScreen.setAttribute("style", "display:none");
            this.flightScreen.setAttribute("style", "display:none");
            this.reservationScreen.removeAttribute("style");
        };
        return App;
    }());
    AosWebApp.App = App;
    new App();
})(AosWebApp || (AosWebApp = {}));
//# sourceMappingURL=app.js.map