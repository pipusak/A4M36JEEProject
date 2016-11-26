/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.pojos;


import com.fasterxml.jackson.xml.annotate.JacksonXmlElementWrapper;
import com.fasterxml.jackson.xml.annotate.JacksonXmlProperty;
import java.util.List;
import semestralwork.model.Reservation;

/**
 *
 * @author Ondrej Suchy
 */
//@JacksonXmlRootElement(localName = "destinations")
public class ReservationsContainer {
    @JacksonXmlElementWrapper(localName = "reservations")
    @JacksonXmlProperty(localName = "reservation")
    public List<ReservationPojo> reservations;
    
    public ReservationsContainer(List<ReservationPojo> reservations){
        this.reservations = reservations;
    }
}
