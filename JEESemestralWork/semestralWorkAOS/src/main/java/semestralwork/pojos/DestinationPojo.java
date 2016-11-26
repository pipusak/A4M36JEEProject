/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.pojos;

/**
 *
 * @author Ondrej Suchy
 */

public class DestinationPojo implements IDestination{   
    long id;
    String name;
    float lat;
    float lon;
    String url;
    
    public DestinationPojo(){}
    
    public DestinationPojo(long id, String name, float lat, float lon) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        url="http://localhost:8080/semestralWorkAOS/webresources/destination/"+id;
    }
    
    public DestinationPojo(long id, String name, double lat, double lon) {
        this.id = id;
        this.name = name;
        this.lat = (float)lat;
        this.lon = (float)lon;
        url="http://localhost:8080/semestralWorkAOS/webresources/destination/"+id;
    }
    
    public DestinationPojo(IDestination destination){
        this.id = destination.getId();
        this.name = destination.getName();
        this.lat = destination.getLat();
        this.lon = destination.getLon();
        url="http://localhost:8080/semestralWorkAOS/webresources/destination/"+destination.getId();
    }
    
    public DestinationPojo(IDestination destination, long id){
        this.id = id;
        this.name = destination.getName();
        this.lat = destination.getLat();
        this.lon = destination.getLon();
    }

    @Override
    public long getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public float getLat() {
        return lat;
    }

    @Override
    public float getLon() {
        return lon;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public void setLat(float lat) {
        this.lat = lat;
    }

    @Override
    public void setLon(float lon) {
        this.lon = lon;
    }
    
    
}
