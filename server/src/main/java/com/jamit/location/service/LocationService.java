package com.jamit.location.service;

import com.jamit.jam.entity.Jam;
import com.jamit.location.dto.LocationRequestDto;
import com.jamit.location.repository.LocationRepository;
import com.jamit.location.utility.Direction;
//import com.jamit.location.utility.GeometryUtil;
import com.jamit.location.utility.GeometryUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jhlabs.map.proj.Projection;
import com.jhlabs.map.proj.ProjectionFactory;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.awt.geom.Point2D;
import java.util.List;

@RequiredArgsConstructor
@Service
public class LocationService {
   private final EntityManager em;

    @Transactional(readOnly = true)
    public List<Jam> getNearByJams(Double latitude, Double longitude, Double distance) {
        LocationRequestDto northEast = GeometryUtil.calculate(latitude, longitude, distance, Direction.NORTHEAST.getBearing());
        LocationRequestDto southWest = GeometryUtil.calculate(latitude, longitude, distance, Direction.SOUTHWEST.getBearing());

        double x1 = northEast.getLatitude();
        double y1 = northEast.getLongitude();
        double x2 = southWest.getLatitude();
        double y2 = southWest.getLongitude();

        System.out.println("x1 : " + x1);
        System.out.println("x2 : " + x2);
        System.out.println("y1 : " + y1);
        System.out.println("y2 : " + y2);

        String pointFormat = String.format("'LINESTRING(%f %f, %f %f)')", x1, y1, x2, y2);

        System.out.println("pointFormat : " + pointFormat);

        Query query = em.createNativeQuery("SELECT * "
                        + "FROM Jam AS j "
                        + "WHERE MBRContains(ST_LINESTRINGFROMTEXT(" + pointFormat + ", j.point)", Jam.class);

        List<Jam> restaurants = query.getResultList();
        return restaurants;
    }

}

