/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.pojos;


import com.fasterxml.jackson.xml.annotate.JacksonXmlElementWrapper;
import com.fasterxml.jackson.xml.annotate.JacksonXmlProperty;
import java.util.List;
import semestralwork.model.Destination;

/**
 *
 * @author Ondrej Suchy
 */
//@JacksonXmlRootElement(localName = "destinations")
public class DestinationsContainer {
    @JacksonXmlElementWrapper(localName = "destinations")
    @JacksonXmlProperty(localName = "destination")
    public List<DestinationPojo> destinations;
    
    public DestinationsContainer(List<DestinationPojo> destinations){
        this.destinations = destinations;
    }
}
