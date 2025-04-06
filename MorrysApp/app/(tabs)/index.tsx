import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// Interfaces
interface Service {
  id: string;
  name: string;
  price: string;
  time: string;
  icon: string;
  category: string;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  rating: number;
  trips: number;
}

const MorrysApp: React.FC = () => {
  // Estados existentes
  const [selectedService, setSelectedService] = useState<string>('auto-eco');
  const [currentLocation, setCurrentLocation] = useState<string>('Buscando ubicación...');
  const [destination, setDestination] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 19.4326,
    longitude: -99.1332,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Nuevos estados
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const [searchingDriver, setSearchingDriver] = useState<boolean>(false);
  const [driverFound, setDriverFound] = useState<boolean>(false);

  // Mock user profile data
  const userProfile: UserProfile = {
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+52 555-123-4567",
    rating: 4.8,
    trips: 25
  };

  const services: Service[] = [
    {
      id: 'auto-eco',
      name: 'Auto Económico',
      price: '$50-70',
      time: '5 min',
      icon: 'car-side',
      category: 'Autos',
    },
    {
      id: 'auto-comfort',
      name: 'Auto Comfort',
      price: '$75-95',
      time: '3 min',
      icon: 'car',
      category: 'Autos',
    },
    {
      id: 'auto-premium',
      name: 'Auto Premium',
      price: '$120-150',
      time: '7 min',
      icon: 'car-luxury',
      category: 'Autos',
    },
    {
      id: 'moto-express',
      name: 'Moto Express',
      price: '$40-60',
      time: '4 min',
      icon: 'motorcycle',
      category: 'Motos',
    },
  ];

  // Efectos existentes...
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado');
          setIsLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        if (address[0]) {
          setCurrentLocation(
            `${address[0].street || ''} ${address[0].name || ''}, ${address[0].city || ''}`
          );
        }
      } catch (error) {
        setErrorMsg('Error al obtener la ubicación');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Manejadores existentes...
  const handleLocationRefresh = async () => {
    try {
      setIsLoading(true);
      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      if (address[0]) {
        setCurrentLocation(
          `${address[0].street || ''} ${address[0].name || ''}, ${address[0].city || ''}`
        );
      }
    } catch (error) {
      setErrorMsg('Error al actualizar la ubicación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDestinationChange = async (text: string) => {
    setDestination(text);
    if (text.length > 2) {
      try {
        const results = await Location.geocodeAsync(text);
        setSearchResults([
          'Plaza cercana',
          'Centro comercial',
          'Aeropuerto',
          'Terminal de autobuses'
        ]);
      } catch (error) {
        console.error('Error searching locations:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Nuevo manejador para solicitud de vehículo
  const handleRequestVehicle = () => {
    if (!destination) {
      alert('Por favor seleccione un destino');
      return;
    }
    setShowRequestModal(true);
    setSearchingDriver(true);
    // Simulamos la búsqueda de conductor
    setTimeout(() => {
      setSearchingDriver(false);
      setDriverFound(true);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.mainPanel}>
        <View style={styles.header}>
          <Text style={styles.logo}>MorrysGo</Text>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => setShowProfile(true)}
          >
            <Ionicons name="person-circle-outline" size={32} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Modal de Perfil */}
        <Modal
          visible={showProfile}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowProfile(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Perfil</Text>
                <TouchableOpacity onPress={() => setShowProfile(false)}>
                  <MaterialIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.profileInfo}>
                <View style={styles.avatarContainer}>
                  <Ionicons name="person-circle" size={80} color="#000" />
                </View>
                
                <Text style={styles.profileName}>{userProfile.name}</Text>
                <Text style={styles.profileEmail}>{userProfile.email}</Text>
                
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{userProfile.rating}</Text>
                    <Text style={styles.statLabel}>Calificación</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{userProfile.trips}</Text>
                    <Text style={styles.statLabel}>Viajes</Text>
                  </View>
                </View>

                <View style={styles.profileDetails}>
                  <View style={styles.detailItem}>
                    <MaterialIcons name="phone" size={24} color="#666" />
                    <Text style={styles.detailText}>{userProfile.phone}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialIcons name="email" size={24} color="#666" />
                    <Text style={styles.detailText}>{userProfile.email}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de Solicitud de Vehículo */}
        <Modal
          visible={showRequestModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowRequestModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {searchingDriver ? "Buscando conductor" : "¡Conductor encontrado!"}
                </Text>
                <TouchableOpacity onPress={() => {
                  setShowRequestModal(false);
                  setSearchingDriver(false);
                  setDriverFound(false);
                }}>
                  <MaterialIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {searchingDriver ? (
                <View style={styles.searchingContainer}>
                  <ActivityIndicator size="large" color="#000" />
                  <Text style={styles.searchingText}>Buscando el mejor conductor para ti...</Text>
                </View>
              ) : driverFound && (
                <View style={styles.driverInfoContainer}>
                  <Ionicons name="person-circle" size={60} color="#000" />
                  <Text style={styles.driverName}>Carlos Rodriguez</Text>
                  <Text style={styles.vehicleInfo}>Toyota Corolla - ABC123</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>4.9</Text>
                    <MaterialIcons name="star" size={20} color="#FFD700" />
                  </View>
                  <Text style={styles.arrivalTime}>Llegada en 3 minutos</Text>
                  
                  <TouchableOpacity 
                    style={styles.contactDriverButton}
                    onPress={() => {/* Implementar llamada */}}
                  >
                    <MaterialIcons name="phone" size={24} color="#fff" />
                    <Text style={styles.contactDriverText}>Contactar conductor</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.currentLocationBar}
          onPress={handleLocationRefresh}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" style={{ marginRight: 10 }} />
          ) : (
            <MaterialIcons name="my-location" size={24} color="#000" />
          )}
          <Text style={styles.currentLocationText}>
            {errorMsg || currentLocation}
          </Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MaterialIcons name="location-on" size={24} color="#000" />
            <TextInput
              style={styles.input}
              placeholder="¿A dónde vas?"
              value={destination}
              onChangeText={handleDestinationChange}
              placeholderTextColor="#666"
            />
            {destination !== '' && (
              <TouchableOpacity onPress={() => setDestination('')}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          {searchResults.length > 0 && (
            <ScrollView style={styles.searchResults}>
              {searchResults.map((result, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.searchResultItem}
                  onPress={() => {
                    setDestination(result);
                    setSearchResults([]);
                  }}
                >
                  <MaterialIcons name="place" size={20} color="#666" />
                  <Text style={styles.searchResultText}>{result}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <Text style={styles.sectionTitle}>Elige tu servicio</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.servicesContainer}
        >
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService === service.id && styles.selectedService,
              ]}
              onPress={() => setSelectedService(service.id)}
            >
              <View style={styles.serviceIconContainer}>
                <FontAwesome5
                  name={service.icon}
                  size={24}
                  color={selectedService === service.id ? '#000' : '#666'}
                />
              </View>
              <Text style={styles.categoryLabel}>{service.category}</Text>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
              <Text style={styles.serviceTime}>{service.time}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={styles.requestButton}
          onPress={handleRequestVehicle}
        >
          <LinearGradient
            colors={['#000', '#333']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.requestButtonText}>Solicitar Vehículo</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emergencyButton}>
          <Ionicons name="shield-checkmark" size={20} color="#000" />
          <Text style={styles.emergencyText}>Centro de seguridad</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: height * 0.6,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mainPanel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -20,
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  profileButton: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  profileDetails: {
    width: '100%',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
  },
  searchingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  searchingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  driverInfoContainer: {
    alignItems: 'center',
    padding: 20,
  },
  driverName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  vehicleInfo: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: {
    fontSize: 18,
    marginRight: 5,
  },
  arrivalTime: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  contactDriverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  contactDriverText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  currentLocationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  currentLocationText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  searchContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    padding: Platform.OS === 'ios' ? 8 : 4,
  },
  searchResults: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000',
  },
  servicesContainer: {
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
  },
  selectedService: {
    backgroundColor: '#e0e0e0',
    borderWidth: 2,
    borderColor: '#000',
  },
  serviceIconContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  servicePrice: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  serviceTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  requestButton: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  emergencyText: {
    marginLeft: 8,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MorrysApp;