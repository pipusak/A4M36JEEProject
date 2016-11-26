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
public interface IDestination {
    public long getId();

    public String getName();

    public float getLat();

    public float getLon();

    public void setName(String name);

    public void setLat(float lat);

    public void setLon(float lon);
}
