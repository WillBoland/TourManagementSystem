package com.iu.gobike.service;

import com.iu.gobike.model.ItineraryPlace;
import com.iu.gobike.model.Place;
import com.iu.gobike.repository.ItineraryPlaceRepository;
import com.iu.gobike.repository.PlaceRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * @author jbhushan
 */
@Component
@AllArgsConstructor
public class PlaceServiceImpl implements PlaceService{

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private ItineraryPlaceRepository itineraryPlaceRepository;

    @Override
    public List<String> search(String searchStr) {
        List<String> places = new ArrayList<String>();
        List<String> result = placeRepository.findAllName(searchStr);
        if (result != null) {
            places.addAll(result);
        }
        return places;
    }

    @Override
    public Place getDetails(String name) {
        return placeRepository.findByName(name);
    }

    @Override
    public Place save(Place place) {
        return placeRepository.save(place);
    }

    @Override
    public List<Place> findAll() {
        Iterable<Place> p = placeRepository.findAll();
        return p != null ? StreamSupport.stream(p.spliterator(), false)
                .collect(Collectors.toList()) : Collections.emptyList();
    }

    @Override
    public List<Place> topPlaces() {
        return placeRepository.findTop3ByOrderByRatingsDesc();
    }

    @Override
    public void deletePlace(Long id) {
        itineraryPlaceRepository.deleteById(id);
    }
}
