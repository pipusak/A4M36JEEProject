/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.model.service;

import java.util.List;
import javax.ejb.Local;
import semestralwork.model.Flight;


/**
 *
 * @author TomasNovotny
 */
@Local
public interface FlightService {
            Flight addFlight(Flight flight);
     void remove(Flight flight);
     public List<Flight> getAllFlights();
     public Flight getFlight(long id);
}
