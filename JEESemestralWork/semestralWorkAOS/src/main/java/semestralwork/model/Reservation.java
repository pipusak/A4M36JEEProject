/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.model;

import semestralwork.pojos.IReservation;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author TomasNovotny
 */
@Entity(name = "RESERVATION")
@TableGenerator(name = "seqReservation", initialValue = 0, allocationSize = 1000)
public class Reservation implements Serializable, IReservation {

    @GeneratedValue(strategy = GenerationType.TABLE, generator = "seqReservation")
    @Id
    @Column(name = "RESERVATION_ID")
    long id;
    @Column(name = "SEATS", nullable = false)
    int seats;

    @Column(name = "PASSWORD", nullable = false)
    String password;

    @Temporal(TemporalType.TIMESTAMP)
    Date created;

    @ManyToOne
    @JoinColumn(name = "FLIGHT_ID")
    Flight flight;

    @Column(name = "RESERVATION_STATE", nullable = false)
    StateChoices reservationState;

    Reservation() {
    }

    public Reservation(int seats, Flight flight) {
        this.seats = seats;
        this.created = new Date();
        this.flight = flight;
        reservationState = StateChoices.NEW;
        password = Integer.toHexString(this.hashCode());
    }

    @Override
    public long getId() {
        return id;
    }

    @Override
    public int getSeats() {
        return seats;
    }

    @Override
    public void setSeats(int seats) {
        this.seats = seats;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getCreated() {
        return created.toString();
    }

    @Override
    public long getFlight() {
        return flight.id;
    }

    public Flight getFlightClass() {
        return flight;
    }

    @Override
    public void setFlight(long flight) {

    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    @Override
    public String getState() {
        return reservationState.toString();
    }

    @Override
    public void setState(StateChoices reservationState) {
        this.reservationState = reservationState;
    }

}
