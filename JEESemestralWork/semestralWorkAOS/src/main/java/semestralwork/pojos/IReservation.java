/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.pojos;

import java.util.Date;
import semestralwork.model.Flight;
import semestralwork.model.StateChoices;

/**
 *
 * @author TomasNovotny
 */
public interface IReservation {


   
  

    String getCreated();

    long getFlight();

    long getId();

    String getPassword();

    int getSeats();

    String getState();

    void setFlight(long flight);

    void setPassword(String password);

    void setSeats(int seats);

    void setState(StateChoices reservationState);
    
}
