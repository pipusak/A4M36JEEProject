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
import semestralwork.model.Reservation;
import semestralwork.model.StateChoices;
import semestralwork.model.service.FlightService;
import semestralwork.model.service.ReservationService;
import semestralwork.pojos.IReservation;
import semestralwork.pojos.ReservationPojo;
import semestralwork.pojos.ReservationsContainer;

/**
 *
 * @author TomasNovotny
 */
@RequestScoped
@Path("/reservation")
public class ReservationController {

    @EJB
    ReservationService db;
    @EJB
    FlightService fEm;


    @GET
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response getReservation(@HeaderParam("Content-Type") String type) throws JsonProcessingException, IOException {
             
        List<Reservation> resList =db.getAllReservations();
        List<ReservationPojo> pojoList = new ArrayList<ReservationPojo>();
        for(int i=0;i<resList.size();i++){
        pojoList.add(new ReservationPojo(resList.get(i)));
        }
        
        
        if (type.equals(MediaType.APPLICATION_JSON)) {
            ObjectMapper mapper = new ObjectMapper();

        String json = mapper.writeValueAsString(pojoList);
        return Response.ok(json, MediaType.APPLICATION_JSON).build();
        } else if (type.equals(MediaType.APPLICATION_XML)) {
             XmlMapper xmlMapper = new XmlMapper();
        ReservationsContainer result;

        result = new ReservationsContainer(pojoList);
        
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
    public Response getReservation(@HeaderParam("Content-Type") String type, @PathParam("id") int id) throws JsonProcessingException, IOException {

        Reservation reservation = db.getReservation(id);
        ReservationPojo resPojo= new ReservationPojo(reservation);
        if (resPojo != null) {
            if (type.equals(MediaType.APPLICATION_JSON)) {
                ObjectMapper mapper = new ObjectMapper();
                String json = mapper.writeValueAsString(resPojo);
                return Response.ok(json, MediaType.APPLICATION_JSON).build();

            } else if (type.equals(MediaType.APPLICATION_XML)) {
                XmlMapper xmlMapper = new XmlMapper();
                String xml = xmlMapper.writeValueAsString(resPojo);
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
    public Response putReservation(@HeaderParam("Content-Type") String type, @PathParam("id") int id,String reservationStr) throws IOException {
         IReservation reservation;
        if (type.equals(MediaType.APPLICATION_JSON)) {
            ObjectMapper mapper = new ObjectMapper();
        reservation = mapper.readValue(reservationStr, ReservationPojo.class);
        
        
        } else if (type.equals(MediaType.APPLICATION_XML)) {
            XmlMapper mapper = new XmlMapper();
            reservation = mapper.readValue(reservationStr, ReservationPojo.class);
        } else {
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }
        try{
            
            
            Reservation jpa = db.getReservation(id);
          jpa.setFlight(fEm.getFlight(reservation.getFlight()));
          jpa.setPassword(reservation.getPassword());
          jpa.setSeats(reservation.getSeats());
          jpa.setState(StateChoices.valueOf(reservation.getState()));
            db.addReservation(jpa);
            
            return Response.status(Response.Status.OK).build();
        }catch(Exception ex){
            //TODO: Use conflict if already exists
            
            System.err.println(ex);
            Response.status(Response.Status.CONFLICT).build();
            
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response postReservation(@HeaderParam("Content-Type") String type, String reservationStr) throws IOException {

        IReservation reservation;
        if (type.equals(MediaType.APPLICATION_JSON)) {
            ObjectMapper mapper = new ObjectMapper();
            reservation = mapper.readValue(reservationStr, ReservationPojo.class);
        } else if (type.equals(MediaType.APPLICATION_XML)) {
            XmlMapper mapper = new XmlMapper();
            reservation = mapper.readValue(reservationStr, ReservationPojo.class);
        } else {

            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }

        try {
            Reservation jpaRes = new Reservation(reservation.getSeats(), fEm.getFlight(reservation.getFlight()));
            db.addReservation(jpaRes);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            System.err.println(ex);
            Response.status(Response.Status.CONFLICT).build();

            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

    }

    @DELETE
    @Path("/{id}")
    public Response deleteReservation(@PathParam("id") int id) {

        Reservation reservation = db.getReservation(id);
        if (reservation != null) {
            db.remove(reservation);
            return Response.status(Response.Status.OK).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}
