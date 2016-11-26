
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.model;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
 * @author Ondrej Suchy
 */
@Entity(name = "FLIGHT")
@TableGenerator(name = "seqFlight", initialValue = 0, allocationSize = 1000)
public class Flight implements Serializable {

    @GeneratedValue(strategy = GenerationType.TABLE, generator = "seqFlight")
    @Id
    @Column(name = "FLIGHT_ID")
    long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_OF_DEPARTURE")
    Date dateOfDeparture;

    @Column(name = "DISTANCE")
    float distance;

    @Column(name = "PRICE")
    double price;

    @Column(name = "SEATS")
    int seats;

    @Column(name = "NAME",nullable = false, unique = true)
    String name;

    @ManyToOne
    @JoinColumn(name="FROM_DEST", referencedColumnName= "DESTINATION_ID")
    Destination from;

    @ManyToOne
    @JoinColumn(name="TO_DEST",referencedColumnName = "DESTINATION_ID")
    Destination to;


   protected  Flight() {
    }

    public Flight(Date dateOfDeparture, double price, int seats, String name, Destination from, Destination to) {
        this.dateOfDeparture = dateOfDeparture;

        this.price = price;
        this.seats = seats;
        this.name = name;
        this.from = from;
        this.to = to;
       
        distance = (float) Math.sqrt(((int) Math.abs(to.lat - from.lat)) ^ 2 + (int) Math.abs(to.lon - from.lon) ^ 2);
    }
    public Flight(String dateOfDepartureString, double price, int seats, String name, Destination from, Destination to) throws ParseException {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
            Date departure = df.parse(dateOfDepartureString);
           
    
        
        this.dateOfDeparture = departure;

        this.price = price;
        this.seats = seats;
        this.name = name;
        this.from = from;
        this.to = to;
       this.distance=distance;
        //distance = (float) Math.sqrt(((int) Math.abs(to.lat - from.lat)) ^ 2 + (int) Math.abs(to.lon - from.lon) ^ 2);
    }

    public long getId() {
        return id;
    }


    public String getDateOfDeparture() {
        return dateOfDeparture.toString();
    }

    public float getDistance() {
        return distance;
    }

    public double getPrice() {
        return price;
    }

    public int getSeats() {
        return seats;
    }

    public String getName() {
        return name;
    }

    public long getFrom() {
        return from.getId();
    }

    public long getTo() {
        return to.getId();
    }


    public void setDateOfDeparture(String dateOfDeparture) {
        
          DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S"); 
    Date startDate;
    try {
        startDate = df.parse(dateOfDeparture);

         this.dateOfDeparture = startDate;
    } catch (ParseException e) {
        System.err.println(e);
    }
       
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public void setName(String name) {
        this.name = name;
    }

    
    public void setFrom(Destination from) {
        this.from = from;
    }

   
    public void setTo(Destination to) {
        this.to = to;
    }

}
