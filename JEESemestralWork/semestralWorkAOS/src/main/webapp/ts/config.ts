module AosWebApp{
    export module Config{
        export module ServicesUrls{
            const SERVICES_BASE_PATH = "webresources/";
            export const DESTINATION_SERVICE = SERVICES_BASE_PATH+"destination";
            export const FLIGHT_SERVICE = SERVICES_BASE_PATH+"flight";
            export const RESERVATION_SERVICE = SERVICES_BASE_PATH+"reservation";
        }

        export module AppGuiElements{
             export const LOADING_SCREEN = "loadingScreen";
             export const UPPER_BAR = "upperBar";

            export const BUTTON_MANAGE_DESTIONATIONS = "buttonManageDestinations";
            export const BUTTON_MANAGE_FLIGHTS = "buttonManageFlights";
            export const BUTTON_MANAGE_RESERVATIONS = "buttonManageReservations";

            export const DESTINATIONS_SCREEN = "destinationsScreen";
            export const FLIGHTS_SCREEN = "flightsScreen";
            export const RESERVATIONS_SCREEN = "reservationsScreen";

            export const DESTINATIONS_TABLE_CONTAINER = "destinationsTableContainer";
            export const FLIGHTS_TABLE_CONTAINER = "flightsTableContainer";
            export const RESERVATIONS_TABLE_CONTAINER = "reservationsTableContainer";
        }
    }
}
