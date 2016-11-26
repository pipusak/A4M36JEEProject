/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.controller;

import java.util.Set;
import javax.ws.rs.core.Application;


/**
 *
 * @author TomasNovotny, OndrejSuchy
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {
    
   
    public static ListOfResources listOfResources;
    
   
    
  
    
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        ApplicationConfig.listOfResources = new ListOfResources();
        System.out.println("REST configuration starting: getClasses()");
        
        fillResourceList(ApplicationConfig.listOfResources);
        addRestResourceClasses(resources);
        
        
        System.out.println("REST configuration ended successfully.");
        return resources;
    }

    
    private void fillResourceList(ListOfResources listOfResources){
        String resourcesBase = "webresources";
        listOfResources.add(resourcesBase+"/destination");
        listOfResources.add(resourcesBase+"/flight");
        listOfResources.add(resourcesBase+"/reservation");
    }

    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(semestralwork.controller.DestinationController.class);
        resources.add(semestralwork.controller.FlightController.class);
        resources.add(semestralwork.controller.ReservationController.class);
    }
    
}
