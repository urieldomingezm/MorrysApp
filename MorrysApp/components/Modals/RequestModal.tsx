import React from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface RequestModalProps {
  visible: boolean;
  onClose: () => void;
  searchingDriver: boolean;
  driverFound: boolean;
}

const RequestModal: React.FC<RequestModalProps> = ({ visible, onClose, searchingDriver, driverFound }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {searchingDriver ? "Buscando conductor" : "¡Conductor encontrado!"}
            </Text>
            <TouchableOpacity onPress={onClose}>
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
              <TouchableOpacity style={styles.contactDriverButton}>
                <MaterialIcons name="phone" size={24} color="#fff" />
                <Text style={styles.contactDriverText}>Contactar conductor</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});

export default RequestModal;