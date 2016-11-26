/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.pojos;

import com.fasterxml.jackson.xml.annotate.JacksonXmlElementWrapper;
import com.fasterxml.jackson.xml.annotate.JacksonXmlProperty;
import java.util.List;
import semestralwork.model.Flight;

/**
 *
 * @author TomasNovotny
 */
public class FlightsContainer {
    
 @JacksonXmlElementWrapper(localName = "flights")
    @JacksonXmlProperty(localName = "flight")
    public List<FlightPojo> flights;
    
    public FlightsContainer(List<FlightPojo> flights){
        this.flights = flights;
    }
}
