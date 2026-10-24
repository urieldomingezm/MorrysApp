import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    price: string;
    time: string;
    icon: string;
    category: string;
  };
  selectedService: string;
  onSelect: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, selectedService, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.serviceCard, selectedService === service.id && styles.selectedService]}
      onPress={() => onSelect(service.id)}
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
  );
};

const styles = StyleSheet.create({
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
});

export default ServiceCard;