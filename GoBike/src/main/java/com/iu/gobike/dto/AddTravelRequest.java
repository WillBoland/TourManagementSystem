package com.iu.gobike.dto;

import lombok.*;

/**
 * @author jbhushan
 */
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class AddTravelRequest {

    private String travelClass;
    private String travelDate;
    private String returnDate;
    private int adults;
    private FlightInfo flight;
    private FlightInfo returnFlight;

}