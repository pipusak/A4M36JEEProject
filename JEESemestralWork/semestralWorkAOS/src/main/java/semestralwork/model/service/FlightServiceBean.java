/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.model.service;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import semestralwork.model.Flight;

/**
 *
 * @author TomasNovotny
 */
@Stateless
public class FlightServiceBean implements FlightService {

    @PersistenceContext
    EntityManager em;
    
    @Override
    public Flight addFlight(Flight flight) {
       return em.merge(flight);
    }

    @Override
    public void remove(Flight flight) {
       em.remove(em.merge(flight));
    }

    @Override
    public List<Flight> getAllFlights() {
       Query query = em.createQuery("SELECT e FROM FLIGHT e");
        return (List<Flight>) query.getResultList();
    }

    @Override
    public Flight getFlight(long id) {
        return em.find(Flight.class, id);
    }
    
}
