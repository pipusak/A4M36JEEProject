<%--@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"--%>
<%@page import="com.fasterxml.jackson.xml.XmlMapper"%>
<%@page import="javax.ws.rs.core.HttpHeaders"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="suchyon6.novott16.semestralwork.controller.ApplicationConfig"%>
<%@page import="com.fasterxml.jackson.databind.ObjectMapper"%>
<%@page import="javax.ws.rs.core.MediaType"%>

<%
        String contentTypeHeader = request.getHeader(HttpHeaders.CONTENT_TYPE);
        response.setCharacterEncoding("UTF-8");
        if(contentTypeHeader!=null){
            if(MediaType.APPLICATION_JSON.equals(contentTypeHeader)){
                //case MediaType.APPLICATION_JSON:{
                //response.setContentType(MediaType.APPLICATION_JSON+";charset=UTF-8");
                response.setContentType(MediaType.APPLICATION_JSON);
                ObjectMapper mapper = new ObjectMapper();

                String json = mapper.writeValueAsString(ApplicationConfig.listOfResources);
                PrintWriter out2 = response.getWriter();
                out2.print(json);
                
                return;
            }else if(MediaType.APPLICATION_XML.equals(contentTypeHeader)){
            //case MediaType.APPLICATION_XML:{
                response.setContentType(MediaType.APPLICATION_XML+";charset=UTF-8");
                
                XmlMapper xmlMapper = new XmlMapper();

                String xml = xmlMapper.writeValueAsString(ApplicationConfig.listOfResources);
                PrintWriter out2 = response.getWriter();
                out2.print(xml);
                
                return;
            }else{
            //default:{
                response.setContentType(MediaType.TEXT_HTML+";charset=UTF-8");
            }

        }
        

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Airline Service</title>
        <script src="lib/jquery-2.2.4.min.js"></script> 
        <script src="lib/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href="lib/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="style.css"/>        
    </head>

    <body>
        <style>
            /* Prevents modal window being shown if the css have not been loaded */
            .loadingScreen{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
            .basicScreen {
                display: none;
            }
            .upperBar {
                list-style-type: none;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: #333;
            }

            .upperBar li {
                float: left;
                /*cursor:pointer;*/
            }

            .upperBar li a {
                display: block;
                color: white;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
            }

            .upperBar li a:hover:not(.active) {
                background-color: #111;
            }

            .active {
                background-color: #4CAF50;
            }
        </style>
        <div id="loadingScreen" class="loadingScreen">
            <div class="loadingMessage">
                Loading...
            </div>
        </div>
        <!--div id="upperBar" class="basicScreen">
           <h1>Airline Service application for AOS</h1><br>
           by suchyon6,novott16<br>
           <br>
           <!--button id="buttonManageDestinations">Manage destinations</button>
           <button id="buttonManageFlights">Manage flights</button>
           <button id="buttonManageReservations">Manage reservations</button-->
           <ul id="upperBar" class="upperBar">
            <li id="buttonManageDestinations"><a >Manage destinations</a></li>
            <li id="buttonManageFlights"><a>Manage flights</a></li>
            <li id="buttonManageReservations"><a>Manage reservations</a></li>
            </ul>
       <!--/div-->
        <div id="destinationsScreen" style="display: none">
            <h1>Destinations</h1>
            <div id="destinationsTableContainer">
            </div>
        </div>
        <div id="flightsScreen" style="display: none">
            <h1>Flights</h1>
            <div id="flightsTableContainer">
            </div>
        </div>
       <div id="reservationsScreen" style="display: none">
            <h1>Reservations</h1>
            <div id="reservationsTableContainer">
            </div>
        </div>
       <script src="js/app.js"></script>
    </body>
    
</html>