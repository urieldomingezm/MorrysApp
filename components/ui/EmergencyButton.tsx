import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmergencyButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.emergencyButton}>
      <Ionicons name="shield-checkmark" size={20} color="#000" />
      <Text style={styles.emergencyText}>Centro de seguridad</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default EmergencyButton;