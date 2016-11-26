/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.model.service;

import java.util.List;
import javax.ejb.Local;
import semestralwork.model.Destination;
import semestralwork.pojos.IDestination;

/**
 *
 * @author TomasNovotny
 */
@Local
public interface DestinationService {
        Destination addDestination(Destination destination);
     void remove(Destination destination);
     public List<Destination> getAllDestinations();
     public Destination getDestination(long id);
}
