import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

interface MapViewComponentProps {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  currentLocation: string;
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({ region, currentLocation }) => {
  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Mi ubicación"
          description={currentLocation}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: height * 0.6,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapViewComponent;