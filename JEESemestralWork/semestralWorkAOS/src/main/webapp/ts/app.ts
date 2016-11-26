module AosWebApp{
    export class App{
        private loadingScreen;
        private upperBar;

        private manageDestinationsMenuItem: HTMLElement;
        private manageFlightsMenuItem: HTMLElement;
        private manageReservationsMenuItem: HTMLElement;

        private destinationScreen: HTMLDivElement;
        private flightScreen: HTMLDivElement;
        private reservationScreen: HTMLDivElement;

        private destinationsList: DestinationsList;
        private flightsList: FlightsList;
        
        constructor(){
            this.destinationsList = new DestinationsList();
            this.flightsList = new FlightsList();

            this.manageDestinationsMenuItem = 
                document.getElementById(Config.AppGuiElements.BUTTON_MANAGE_DESTIONATIONS);
            this.manageFlightsMenuItem = 
                document.getElementById(Config.AppGuiElements.BUTTON_MANAGE_FLIGHTS);
            this.manageReservationsMenuItem = 
                document.getElementById(Config.AppGuiElements.BUTTON_MANAGE_RESERVATIONS);

            this.destinationScreen = document.getElementById(Config.AppGuiElements.DESTINATIONS_SCREEN) as HTMLDivElement;
            this.flightScreen = document.getElementById(Config.AppGuiElements.FLIGHTS_SCREEN) as HTMLDivElement;
            this.reservationScreen = document.getElementById(Config.AppGuiElements.RESERVATIONS_SCREEN) as HTMLDivElement;

            this.manageDestinationsMenuItem.addEventListener("click", this.manageDestinationsClicked.bind(this), false);
            this.manageFlightsMenuItem.addEventListener("click", this.manageFlightsClicked.bind(this), false);
            this.manageReservationsMenuItem.addEventListener("click", this.manageReservationsClicked.bind(this), false);

            this.loadingScreen  = document.getElementById(Config.AppGuiElements.LOADING_SCREEN);
            this.upperBar = document.getElementById(Config.AppGuiElements.UPPER_BAR);

            
            //TODO: Add other handlers
            this.upperBar.setAttribute("style", "display: block");
            this.loadingScreen.setAttribute("style", "display: none");
        }

        protected manageDestinationsClicked(){
            this.showDestinationsScreen();
            this.destinationsList.loadDestinations();
        }

        protected manageFlightsClicked(){
            this.showFlightsScreen();
            this.flightsList.loadFlights();
        }

        protected manageReservationsClicked(){
            this.showReservationsScreen();
        }

        protected showDestinationsScreen(){
            this.destinationScreen.removeAttribute("style");
            this.flightScreen.setAttribute("style","display:none");
            this.reservationScreen.setAttribute("style","display:none");
        }

        protected showFlightsScreen(){
            this.destinationScreen.setAttribute("style","display:none");
            this.flightScreen.removeAttribute("style");
            this.reservationScreen.setAttribute("style","display:none");
        }

        protected showReservationsScreen(){
            this.destinationScreen.setAttribute("style","display:none");
            this.flightScreen.setAttribute("style","display:none");
            this.reservationScreen.removeAttribute("style");
        }
    }

    new App();
}