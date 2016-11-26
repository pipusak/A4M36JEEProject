/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.TableGenerator;
import semestralwork.pojos.IDestination;

/**
 *
 * @author TomasNovotny
 */
@Entity(name = "DESTINATION")
@TableGenerator(name = "seqDestination", initialValue=0, allocationSize = 1000)
public class Destination implements Serializable, IDestination {

    @GeneratedValue(strategy = GenerationType.TABLE, generator = "seqDestination")
    @Id
    @Column(name = "DESTINATION_ID")
    long id;

    @Column(name = "NAME", unique = true)
    String name;
    
    @Column(name = "LAT")
    float lat;
    
    @Column(name = "LON")
    float lon;

     Destination() {

    }
   public Destination(IDestination destinationPojo) {

        this.name = destinationPojo.getName();
        this.lat = destinationPojo.getLat();
        this.lon = destinationPojo.getLon();
    }
     
     
    public Destination(String name, float lat, float lon) {

        this.name = name;
        this.lat = lat;
        this.lon = lon;
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
