import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';

const SERVICES = [
  { id: '1', title: 'Mandi Price', icon: require('../../assests/images/agg.png'),navigateTo:'MandiPrice' },
  { id: '2', title: 'Crop Doctor', icon: require('../../assests/images/cropdoc.png') ,navigateTo:'CropDoctor'},
  { id: '3', title: 'Weather', icon: require('../../assests/images/weather.png'),navigateTo:'Weather' },
  { id: '4', title: 'Soil Test', icon: require('../../assests/images/soiltest.png'),navigateTo:'SoilTesting' },
  { id: '5', title: 'Nearest Store', icon: require('../../assests/images/store1.png'),navigateTo:'NearestStore' },
  { id: '6', title: 'Happy Kissan', icon: require('../../assests/images/kissan.png'),navigateTo:'HappyKissan' },
];

export default function BodyGrid() {
  const navigation=useNavigation();
  const { width } = useWindowDimensions();
  const itemSize = width / 3.5;


  return (
    <View style={[styles.container, { padding: width * 0.03,backgroundColor: '#e6f5ec' }]}>
      <View style={styles.grid}>
        {SERVICES.map((service) => (
          <TouchableOpacity key={service.id} style={[styles.serviceItem, { width: itemSize }]} onPress={()=> navigation.navigate(service.navigateTo)}>
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
    padding: 12,
    borderRadius: 5,
    borderColor: 'grey'
  },
  icon: {
    resizeMode: 'contain',
    marginBottom: 5,
  },
  title: {
    color: '#333',
    textAlign: 'center',
    fontWeight: '700',
    // Some attractive and readable font families:
    fontFamily: 'Poppins-SemiBold', // Try 'Poppins', 'Montserrat', 'Roboto', or 'Nunito'
  },
});
