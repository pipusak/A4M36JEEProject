/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.pojos;

import java.util.Comparator;
import java.util.Date;
import semestralwork.model.Destination;
import semestralwork.model.Flight;


/**
 *
 * @author Ondrej Suchy
 */
public class FlightPojo implements IFlight{
        long id;
        String name;
        String dateOfDeparture;
        float distance;
        double price;
        int seats;
        long from;
        long to;
        String url;
        
        
        @Override
    public long getId() {
        return id;
    }

    public FlightPojo(Flight flight) {
        this.id = flight.getId();
        this.name = flight.getName();
        this.dateOfDeparture = flight.getDateOfDeparture();
        this.distance = flight.getDistance();
        this.price = flight.getDistance();
        this.seats = flight.getSeats();
        this.from = flight.getFrom();
        this.to = flight.getTo();
        url="http://localhost:8080/semestralWorkAOS/webresources/flight/"+flight.getId();
    }

public FlightPojo(){}
    @Override
    public String getDateOfDeparture(){
        return dateOfDeparture;
    }
 @Override
    public float getDistance() {
        return distance;
    }
 @Override
    public double getPrice() {
        return price;
    }
 @Override
    public int getSeats() {
        return seats;
    }

     @Override 
     public String getName() {
        return name;
    }


 @Override
    public long getTo() {
        return to;
    }
 @Override
    public void setDateOfDeparture(String dateOfDeparture) {
        this.dateOfDeparture = dateOfDeparture;
    }

        @Override
    public void setPrice(double price) {
        this.price = price;
    }
@Override
    public void setSeats(int seats) {
        this.seats = seats;
    }
@Override
    public void setName(String name) {
        this.name = name;
    }
    public void setFromId(long from) {
        this.from = from;
    }

    public void setToId(long to) {
        this.to = to;
    }

   

    @Override
    public void setFrom(long from) {
this.from=from;
    }

    @Override
    public void setTo(long to) {
        this.to=to;
    }

    @Override
    public long getFrom() {
return from;
    }
    
    
     public static Comparator<FlightPojo> nameDesc = (FlightPojo n1, FlightPojo n2) -> {
         String s1 = n1.getName();
         String s2 = n2.getName();
         
         /*For ascending order*/
         return s2.compareTo(s1);
         /*For descending order*/
         //rollno2-rollno1;
        };
     
          public static Comparator<FlightPojo> nameAsc = (FlightPojo n1, FlightPojo n2) -> {
         String s1 = n1.getName();
         String s2 = n2.getName();
         
         /*For ascending order*/
         return s1.compareTo(s2);
         /*For descending order*/
         //rollno2-rollno1;
        };
          
                    public static Comparator<FlightPojo> dateAsc = (FlightPojo n1, FlightPojo n2) -> {
         String s1 = n1.getDateOfDeparture();
         String s2 = n2.getDateOfDeparture();
         
         /*For ascending order*/
         return s1.compareTo(s2);
         /*For descending order*/
         //rollno2-rollno1;
        };
                    
     public static Comparator<FlightPojo> dateDesc = (FlightPojo n1, FlightPojo n2) -> {
         String s1 = n1.getDateOfDeparture();
         String s2 = n2.getDateOfDeparture();
         
         /*For ascending order*/
         return s2.compareTo(s1);
         /*For descending order*/
         //rollno2-rollno1;
        };
}
