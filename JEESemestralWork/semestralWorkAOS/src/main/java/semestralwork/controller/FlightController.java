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
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import semestralwork.model.Flight;
import semestralwork.model.service.DestinationService;
import semestralwork.model.service.FlightService;
import semestralwork.pojos.FlightPojo;
import semestralwork.pojos.FlightsContainer;
import semestralwork.pojos.IFlight;

/**
 *
 * @author TomasNovotny
 */
@RequestScoped
@Path("/flight")
public class FlightController {

    @EJB
    FlightService db;

    @EJB
    DestinationService desEM;

    @GET
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response getFlight(@HeaderParam("Content-Type") String type, 
     @HeaderParam("X-Filter") String filter, @HeaderParam("X-Order") String order, 
     @HeaderParam("X-Base")@DefaultValue("-1") int base, @HeaderParam("X-Offset") @DefaultValue("-1")int offset ) throws JsonProcessingException, IOException, ParseException {
        List<Flight> flightList = db.getAllFlights();
        List<FlightPojo> pojoList = new ArrayList<FlightPojo>();
        for (int i = 0; i < flightList.size(); i++) {
            pojoList.add(new FlightPojo(flightList.get(i)));
        }
if (base > 0 || offset > 0) {
pojoList = limit(base,offset,pojoList);
}
if(filter!=null){
pojoList = filter(filter,pojoList);
}

if(order!=null){
pojoList = order(order,pojoList);
}
        if (type.equals(MediaType.APPLICATION_JSON)) {
            ObjectMapper mapper = new ObjectMapper();

            String json = mapper.writeValueAsString(pojoList);
            if (base < 0 || offset < 0) {
                return Response.ok(json, MediaType.APPLICATION_JSON).header("X-Count-records", pojoList.size()).build();
            } else {
                return Response.ok(json, MediaType.APPLICATION_JSON).build();
            }
        } else if (type.equals(MediaType.APPLICATION_XML)) {
            XmlMapper xmlMapper = new XmlMapper();
            FlightsContainer result;

            result = new FlightsContainer(pojoList);

            String xml = xmlMapper.writeValueAsString(result);
            if (base < 0 || offset < 0) {
                return Response.ok(xml, MediaType.APPLICATION_XML).header("X-Count-records", pojoList.size()).build();
            } else {
                return Response.ok(xml, MediaType.APPLICATION_XML).build();
            }
        } else {
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }

    }

    @GET
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public Response getFlightXml(@PathParam("id") int id) throws IOException {
        XmlMapper xmlMapper = new XmlMapper();

        Flight flight = db.getFlight(id);
        FlightPojo pojo = new FlightPojo(flight);
        if (flight != null) {
            String xml = xmlMapper.writeValueAsString(pojo);
            return Response.ok(xml, MediaType.APPLICATION_JSON).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

    }

    @GET
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getFlightJson(@PathParam("id") int id) throws JsonProcessingException {

        //"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
        ObjectMapper mapper = new ObjectMapper();

        Flight flight = db.getFlight(id);
        FlightPojo pojo = new FlightPojo(flight);
        if (flight != null) {
            String json = mapper.writeValueAsString(pojo);
            return Response.ok(json, MediaType.APPLICATION_JSON).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response putFlight(@HeaderParam("Content-Type") String type, @PathParam("id") int id, String flightStr) throws IOException {
        IFlight flight;
        if (type.equals(MediaType.APPLICATION_JSON)) {
            ObjectMapper mapper = new ObjectMapper();
            flight = mapper.readValue(flightStr, FlightPojo.class);
        } else if (type.equals(MediaType.APPLICATION_XML)) {
            XmlMapper mapper = new XmlMapper();
            flight = mapper.readValue(flightStr, FlightPojo.class);
        } else {

            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }

        try {

            Flight jpaFlight = db.getFlight(id);
            jpaFlight.setDateOfDeparture(flight.getDateOfDeparture());
            jpaFlight.setName(flight.getName());
            jpaFlight.setPrice(flight.getPrice());
            jpaFlight.setSeats(flight.getSeats());
            jpaFlight.setFrom(desEM.getDestination(flight.getFrom()));
            jpaFlight.setTo(desEM.getDestination(flight.getTo()));
            db.addFlight(jpaFlight);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            System.err.println(ex);
            Response.status(Response.Status.CONFLICT).build();

            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response postFlight(@HeaderParam("Content-Type") String type, String flightStr) throws IOException {
        IFlight flight;
        if (type.equals(MediaType.APPLICATION_JSON)) {
            ObjectMapper mapper = new ObjectMapper();
            flight = mapper.readValue(flightStr, FlightPojo.class);
        } else if (type.equals(MediaType.APPLICATION_XML)) {
            XmlMapper mapper = new XmlMapper();
            flight = mapper.readValue(flightStr, FlightPojo.class);
        } else {

            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }

        try {

            Flight jpaFlight = new Flight(flight.getDateOfDeparture(), flight.getPrice(), flight.getSeats(), flight.getName(), desEM.getDestination(flight.getFrom()), desEM.getDestination(flight.getTo()));
            db.addFlight(jpaFlight);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            System.err.println(ex);
            Response.status(Response.Status.CONFLICT).build();

            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteFlight(@PathParam("id") int id) {

        Flight flight = db.getFlight(id);
        if (flight != null) {
            db.remove(flight);
            return Response.status(Response.Status.OK).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
    
    
    List<FlightPojo> limit(int base, int offset,List<FlightPojo> orig){
    
    List<FlightPojo> ret = new ArrayList();
    int to;
    if(offset>orig.size()){
    to =orig.size();
    }else{
    to=offset;
    }
    if(base<orig.size()){
    for(int i =base-1;i<to;i++){
   ret.add(orig.get(i));
    
    }
        }
    return ret;
    }
    
     List<FlightPojo> filter(String filter,List<FlightPojo> orig) throws ParseException{
    DateFormat flightFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
    DateFormat filterFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX");
    // dateOfDepartureFrom=2013-02-27T02:04:46+01:00,dateOfDepartureTo=2013-02-27T03:04:46+01:00
    String[] ssplit = filter.split(",");
    String[] ssplit1 =ssplit[0].split("=");
    String[] ssplit2 =ssplit[1].split("=");
    
    Date from = filterFormat.parse(ssplit1[1]);
    Date to = filterFormat.parse(ssplit2[1]);
    
    
    List<FlightPojo> ret = new ArrayList();


    
    for(int i =0;i<orig.size();i++){
        Date departure = flightFormat.parse(orig.get(i).getDateOfDeparture());
   if(departure.compareTo(to)!=1&&departure.compareTo(from)!=-1){
        ret.add(orig.get(i));
   }
    }
        
    return ret;
    }
    
        List<FlightPojo> order(String order,List<FlightPojo> orig){
    
    String[] field =order.split(":");
    
    if(field[0].equals("name")&&field[1].equals("asc")){
    Collections.sort(orig,FlightPojo.nameAsc );
    }
        if(field[0].equals("name")&&field[1].equals("desc")){
    Collections.sort(orig,FlightPojo.nameDesc );
    }
            if(field[0].equals("dateOfDeparture")&&field[1].equals("asc")){
    Collections.sort(orig,FlightPojo.dateAsc );
    }
                if(field[0].equals("dateOfDeparture")&&field[1].equals("desc")){
    Collections.sort(orig,FlightPojo.dateDesc );
    }
                
                return orig;
    }
    
}
