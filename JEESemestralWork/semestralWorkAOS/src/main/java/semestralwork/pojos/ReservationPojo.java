/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.pojos;

import java.util.Date;
import semestralwork.model.Flight;
import semestralwork.model.Reservation;
import semestralwork.model.StateChoices;

/**
 *
 * @author TomasNovotny
 */
public class ReservationPojo implements IReservation {

    long id;

    int seats;

    String password;

    String created;

    long flight;

    String reservationState;

    String url;

    public String getReservationState() {
        return reservationState;
    }

    public void setReservationState(String reservationState) {
        this.reservationState = reservationState;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    
    public ReservationPojo(){
    }
    
        public ReservationPojo(long id,int seats,String password, String created, long flight ){
            this.seats=seats;
            this.flight=flight;
    }
        
                public ReservationPojo(int seats, double flight ){
            this.seats=seats;
            this.flight=(long)flight;
    }

    public ReservationPojo(Reservation res) {
        this.id =res.getId() ;
        this.seats = res.getSeats();
        this.password = res.getPassword();
        this.created = res.getCreated();
        this.flight = res.getFlight();
        this.reservationState = res.getState();
        this.url = "http://localhost:8080/semestralWorkAOS/webresources/reservation/"+res.getId();
    }
                
                
    
    @Override
    public String getCreated() {
    return created;   
    }

    @Override
    public long getFlight() {
return flight;
    }

    @Override
    public long getId() {
return id;
    }

    @Override
    public String getPassword() {
return password;
    }

    @Override
    public int getSeats() {
return seats;   
    }

    @Override
    public String getState() {
return reservationState;
    }

    @Override
    public void setFlight(long flight) {
this.flight=flight;
    }

    @Override
    public void setPassword(String password) {
this.password=password;
    }

    @Override
    public void setSeats(int seats) {
this.seats=seats;
    }

    @Override
    public void setState(StateChoices reservationState) {
this.reservationState=reservationState.toString();
    }

}
