import { View, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';

const SERVICES = [
  { id: '1', title: 'Mandi Price', icon: require('../assests/images/agg.png') },
  { id: '2', title: 'Crop Doctor', icon: require('../assests/images/cropdoc.png') },
  { id: '3', title: 'Weather', icon: require('../assests/images/weather.png') },
  { id: '4', title: 'Soil Testing', icon: require('../assests/images/soiltest.png') },
  { id: '5', title: 'Nearest Store', icon: require('../assests/images/store1.png') },
  { id: '6', title: 'Happy Kissan', icon: require('../assests/images/kisan.jpeg') },
];

export default function BodyGrid() {
  const { width } = useWindowDimensions();
  const itemSize = width / 3.5;

  return (
    <View style={[styles.container, { padding: width * 0.03, marginVertical: width * 0.08 }]}>
      <View style={styles.grid}>
        {SERVICES.map((service) => (
          <TouchableOpacity key={service.id} style={[styles.serviceItem, { width: itemSize }]}>
            <Image source={service.icon} style={[styles.icon, { width: width * 0.22, height: width * 0.18 }]} />
            <Text style={[styles.title, { fontSize: width * 0.035 }]}>{service.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    resizeMode: 'contain',
  },
  title: {
    color: '#333',
    textAlign: 'center',
  },
});
