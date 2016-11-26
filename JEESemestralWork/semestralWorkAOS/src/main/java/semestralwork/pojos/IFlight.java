/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.pojos;

import java.util.Date;
import semestralwork.model.Destination;

/**
 *
 * @author TomasNovotny
 */
public interface IFlight {

    String getDateOfDeparture();

    float getDistance();

    long getFrom();

    long getId();

    String getName();

    double getPrice();

    int getSeats();

    long getTo();

    void setDateOfDeparture(String dateOfDeparture);

    void setFrom(long from);

    void setName(String name);

    void setPrice(double price);

    void setSeats(int seats);

    void setTo(long to);
    
}
