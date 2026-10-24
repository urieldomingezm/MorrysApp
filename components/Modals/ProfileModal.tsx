import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  userProfile: {
    name: string;
    email: string;
    phone: string;
    rating: number;
    trips: number;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose, userProfile }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Perfil</Text>
            <TouchableOpacity onPress={onClose}>
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
});

export default ProfileModal;