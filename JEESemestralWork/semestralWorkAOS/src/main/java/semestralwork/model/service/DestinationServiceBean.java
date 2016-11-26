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
import semestralwork.model.Destination;
import semestralwork.pojos.IDestination;

/**
 *
 * @author TomasNovotny
 */
@Stateless
public class DestinationServiceBean implements DestinationService {

    @PersistenceContext
    EntityManager em;

    @Override
    public Destination addDestination(Destination destination) {
        return em.merge(destination);
    }

    @Override
    public void remove(Destination destination) {
        em.remove(em.merge(destination));
    }



    @Override
    public List<Destination> getAllDestinations() {
        Query query = em.createQuery("SELECT e FROM DESTINATION e");
        return (List<Destination>) query.getResultList();
    }

    @Override
    public Destination getDestination(long id) {
        return em.find(Destination.class, id);
    }
}
