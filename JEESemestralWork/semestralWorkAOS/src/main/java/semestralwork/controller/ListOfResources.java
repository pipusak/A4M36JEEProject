/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.controller;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Ondrej Suchy
 */
public class ListOfResources {
    ArrayList<String> resources;
    
    public ListOfResources(){
        resources = new ArrayList<>();
    }
    
    public void add(String resource){
        this.resources.add(resource);
    }
    
    public List<String> getResources(){
        return resources;
    }
}
