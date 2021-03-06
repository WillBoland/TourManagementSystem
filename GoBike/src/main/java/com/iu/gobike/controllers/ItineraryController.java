package com.iu.gobike.controllers;

import com.iu.gobike.dto.*;
import com.iu.gobike.model.Itinerary;
import com.iu.gobike.model.Plan;
import com.iu.gobike.model.UserItinerary;
import com.iu.gobike.repository.UserItineraryRepository;
import com.iu.gobike.service.ItineraryService;
import com.iu.gobike.service.UserItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityExistsException;
import java.text.ParseException;
import java.util.List;

/**
 * @author jbhushan
 */
@RestController
@RequestMapping(path = "itinerary")
@CrossOrigin(origins = "*",allowedHeaders = "*", allowCredentials = "true")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @Autowired
    private UserItineraryService userItineraryService;

    @Autowired
    private UserItineraryRepository userItineraryRepository;

    /**
     * This API is responsible for creating new itinerary
     */
    @PostMapping(path = "/{username}", produces = "application/json")
    public ResponseEntity<UserItinerary> create(@PathVariable("username") String userName, @RequestBody CreateItineraryRequest createItineraryRequest) {
        UserItinerary userItinerary = null;
        try {
            userItinerary = itineraryService.create(createItineraryRequest,userName);
        } catch(EntityExistsException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        } catch(ParseException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return  ResponseEntity.ok(userItinerary);
    }

    /**
     * This API is responsible for creating new itinerary
     */
    @PostMapping(path = "/adduser", produces = "application/json")
    public ResponseEntity<Itinerary> addUserToItinerary(@RequestBody AddUserToItineraryRequest createItineraryRequest) {
        Itinerary itinerary = null;
        try {
            itinerary = itineraryService.addUser(createItineraryRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return  ResponseEntity.ok(itinerary);
    }

    /**
     * This API is responsible for saving selected flight details to itinerary
     */
    @PostMapping(path = "/{username}/travel", produces = "application/json")
    public ResponseEntity<String> addTravel(@PathVariable("username") String userName, @RequestBody AddTravelRequest request) {
         itineraryService.addTravel(request,userName);
         return  ResponseEntity.ok("SAVED");
    }

    /**
     * This API is responsible for saving selected place names to itinerary.
     */
    @PostMapping(path = "/{username}/place", produces = "application/json")
    public ResponseEntity<String> addPlace(@PathVariable("username") String userName, @RequestBody AddPlaceRequest request) {
        itineraryService.addPlace(userName,request);
        return  ResponseEntity.ok("SAVED");
    }

    @GetMapping(path = "/{username}",produces = "application/json")
    public ResponseEntity<GetItineraryDetailsResponse> getAllItineraries(@PathVariable("username") String username){
        ResponseEntity responseEntity = null;
        GetItineraryDetailsResponse itineraries = itineraryService.getAllItineraries(username);
        if(itineraries != null){
            responseEntity = ResponseEntity.ok(itineraries);
        } else {
            responseEntity = ResponseEntity.noContent().build();
        }
       return responseEntity;
    }

    @GetMapping(path="/{username}/{name}", produces = "application/json")
    public ResponseEntity<ItineraryDetail> getItineraryDetails(@PathVariable("username") String userName, @PathVariable("name") String name){
            return ResponseEntity.ok(itineraryService.getItinerary(userName, name));
    }

    /**
     * This API is responsible for creating new itinerary
     */
    @PostMapping(path = "/plan", produces = "application/json")
    public ResponseEntity<Plan> addPlan(@RequestBody AddPlanRequest addPlanRequest) {
        Plan plan = null;
        try {
            plan = itineraryService.savePlan(addPlanRequest);
        } catch (ParseException e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return  ResponseEntity.ok(plan);
    }

    /**
     * This API is responsible for creating new itinerary
     */
    @DeleteMapping(path = "/plan/{id}", produces = "application/json")
    public ResponseEntity<Plan> deletePlan(@PathVariable("id") Long id) {
        itineraryService.deletePlan(id);
        return  ResponseEntity.ok().build();
    }

    @GetMapping( produces = "application/json")
    public ResponseEntity<Iterable<UserItinerary>> getALl(){
        return ResponseEntity.ok(userItineraryRepository.findAll());
    }

    @PutMapping(path = "/{itineraryname}/book/{username}",  produces = "application/json")
    public ResponseEntity<Boolean> book(@PathVariable("username") String userName, @PathVariable("itineraryname") String itineraryName){
        return ResponseEntity.ok(userItineraryService.book(userName, itineraryName));
    }
}
