package com.iu.gobike.dto;

import lombok.*;

import java.sql.Timestamp;
import java.time.Clock;

/**
 * @author jbhushan
 */
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class FlightInfo {

    private float price;
    private String duration;
    private Timestamp takeOffTime;
    private Timestamp arrivalTime;
    private String airline;
    private String arrivalTerminal;
    private String deptTerminal;
    private String arrivalIataCode;
    private String deptIataCode;
}
