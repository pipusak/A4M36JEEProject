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
import semestralwork.model.Reservation;

/**
 *
 * @author TomasNovotny
 */
@Stateless
public class ReservationServiceBean implements ReservationService{

        @PersistenceContext
    EntityManager em;
    
    @Override
    public Reservation addReservation(Reservation reservation) {
       return em.merge(reservation);
    }

    @Override
    public void remove(Reservation reservation) {
         em.remove(em.merge(reservation));
    }

    @Override
    public List<Reservation> getAllReservations() {
                Query query = em.createQuery("SELECT e FROM RESERVATION e");
        return (List<Reservation>) query.getResultList();
    }

    @Override
    public Reservation getReservation(long id) {
        return em.find(Reservation.class, id);
    }
    
}
