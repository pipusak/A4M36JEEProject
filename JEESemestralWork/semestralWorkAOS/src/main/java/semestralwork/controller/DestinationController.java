/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.xml.XmlMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import semestralwork.pojos.DestinationsContainer;
import semestralwork.model.Destination;
import semestralwork.model.Reservation;
import semestralwork.model.service.DestinationService;
import semestralwork.pojos.DestinationPojo;
import semestralwork.pojos.IDestination;
import semestralwork.pojos.ReservationPojo;

/**
 *
 * @author TomasNovotny, OndrejSuchy
 * 
 */
@RequestScoped
@Path("/destination")
public class DestinationController {
    @EJB
    DestinationService db;
    
    

    
    
    @GET
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response getDestination(@HeaderParam("Content-Type") String type) throws JsonProcessingException, IOException {
         List<Destination> desList =db.getAllDestinations();
        List<DestinationPojo> pojoList = new ArrayList<DestinationPojo>();
        for(int i=0;i<desList.size();i++){
        pojoList.add(new DestinationPojo(desList.get(i)));
        }
if (type.equals(MediaType.APPLICATION_JSON)) {
    
            ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(pojoList);
        return Response.ok(json, MediaType.APPLICATION_JSON).build();
        
        } else if (type.equals(MediaType.APPLICATION_XML)) {
            
             XmlMapper xmlMapper = new XmlMapper();
        DestinationsContainer result;

        result = new DestinationsContainer(pojoList);
        
        String xml = xmlMapper.writeValueAsString(result);
        return Response.ok(xml, MediaType.APPLICATION_XML).build();
        } else {
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }
    } 
      
  
    

    
    @GET
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response getDestination(@HeaderParam("Content-Type") String type, @PathParam("id") int id) throws JsonProcessingException, IOException {
           
        Destination destination = db.getDestination(id);
        DestinationPojo desPojo= new DestinationPojo(destination);
        if (desPojo != null) {
            if (type.equals(MediaType.APPLICATION_JSON)) {
                ObjectMapper mapper = new ObjectMapper();
                String json = mapper.writeValueAsString(desPojo);
                return Response.ok(json, MediaType.APPLICATION_JSON).build();

            } else if (type.equals(MediaType.APPLICATION_XML)) {
                XmlMapper xmlMapper = new XmlMapper();
                String xml = xmlMapper.writeValueAsString(desPojo);
                return Response.ok(xml, MediaType.APPLICATION_JSON).build();
            } else {

                return Response.status(Response.Status.NOT_ACCEPTABLE).build();
            }

        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
    
    
   
    @PUT
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response putDestination(@HeaderParam("Content-Type") String type,@PathParam("id")int id, String destinationStr) throws IOException{
       IDestination destination;
        if (type.equals(MediaType.APPLICATION_JSON)) {
            ObjectMapper mapper = new ObjectMapper();
        destination = mapper.readValue(destinationStr, DestinationPojo.class);
        
        
        } else if (type.equals(MediaType.APPLICATION_XML)) {
            XmlMapper mapper = new XmlMapper();
            destination = mapper.readValue(destinationStr, DestinationPojo.class);
        } else {
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }
        try{
            
            
            Destination jpa = db.getDestination(id);
            jpa.setLat(destination.getLat());
            jpa.setLon(destination.getLon());
            jpa.setName(destination.getName());
            db.addDestination(jpa);
            
            return Response.status(Response.Status.OK).build();
        }catch(Exception ex){
            //TODO: Use conflict if already exists
            
            System.err.println(ex);
            Response.status(Response.Status.CONFLICT).build();
            
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @POST
    @Consumes( MediaType.APPLICATION_JSON)
    @Produces( MediaType.APPLICATION_JSON)
    public Response postDestination(String destinationStr) throws IOException{
        
        ObjectMapper mapper = new ObjectMapper();
        IDestination destination = mapper.readValue(destinationStr, DestinationPojo.class);
        
        try{
            Destination jpaDes = new Destination(destination);
            db.addDestination(jpaDes);
            return Response.status(Response.Status.CREATED).build();
        }catch(Exception ex){
            //TODO: Use conflict if already exists
            
            System.err.println(ex);
            Response.status(Response.Status.CONFLICT).build();
            
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public Response postDestinationXML(String destinationStr) throws IOException{
        XmlMapper xmlMapper = new XmlMapper();
        IDestination destination = xmlMapper.readValue(destinationStr,  DestinationPojo.class);
        
       
        
        try{
            Destination jpaDes = new Destination(destination);
            db.addDestination(jpaDes);
            return Response.status(Response.Status.CREATED).build();
        }catch(Exception ex){
            //TODO: Use conflict if already exists
            
            System.err.println(ex);
            Response.status(Response.Status.CONFLICT).build();
            
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DELETE
    @Path("/{id}")
       public Response deleteDestination(@PathParam("id")int id){
        Destination destination = db.getDestination(id);
        if(destination!=null){
        db.remove(destination);
       return Response.status(Response.Status.OK).build();
        }else{
         return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}
