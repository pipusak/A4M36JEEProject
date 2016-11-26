/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.model.service;

import java.util.List;
import javax.ejb.Local;
import semestralwork.model.Reservation;

/**
 *
 * @author TomasNovotny
 */
@Local
public interface ReservationService {
            Reservation addReservation(Reservation reservation);
     void remove(Reservation reservation);
     public List<Reservation> getAllReservations();
     public Reservation getReservation(long id);
}
