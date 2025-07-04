import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLocation } from '../../Contexts/LocationContext';

const { width } = Dimensions.get('window');

const WeatherDetails = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { location } = useLocation();

  const API_KEY = '36c864831b570876eb8b7729a84f8993';
  const CITY_NAME = location?.district;

  useEffect(() => {
    if (!CITY_NAME || CITY_NAME.trim() === '') {
      console.warn('District is not defined in context');
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      try {
        console.log('Fetching weather for:', CITY_NAME);

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch weather:', response.status, errorText);
          setWeatherData(null);
          return;
        }

        const data = await response.json();
        console.log('Weather API Response:', data);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [CITY_NAME]); // <- rerun if city changes

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#27ae60" />
      </View>
    );
  }

  if (!weatherData || weatherData.cod !== 200) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to fetch weather data for "{CITY_NAME}".</Text>
      </View>
    );
  }

  const { name, main, weather, wind, coord, sys } = weatherData;
  const weatherIcon = weather[0].icon;
  const weatherDescription = weather[0].description;

  return (
    <LinearGradient colors={["#e0f7fa", "#ffffff"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.cityName}>{name}, {sys.country}</Text>
        <Image
          style={styles.weatherIcon}
          source={{ uri: `https://openweathermap.org/img/wn/${weatherIcon}@4x.png` }}
        />
        <Text style={styles.temperature}>{main.temp}°C</Text>
        <Text style={styles.description}>{weatherDescription}</Text>

        <View style={styles.infoContainer}>
          <InfoItem icon="thermometer" label="Feels Like" value={`${main.feels_like}°C`} />
          <InfoItem icon="thermometer-low" label="Min Temp" value={`${main.temp_min}°C`} />
          <InfoItem icon="thermometer-high" label="Max Temp" value={`${main.temp_max}°C`} />
          <InfoItem icon="water-percent" label="Humidity" value={`${main.humidity}%`} />
          <InfoItem icon="weather-windy" label="Wind Speed" value={`${wind.speed} m/s`} />
          <InfoItem icon="map-marker-radius" label="Latitude" value={`${coord.lat}`} />
          <InfoItem icon="map-marker-radius-outline" label="Longitude" value={`${coord.lon}`} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoBox}>
    <MaterialCommunityIcons name={icon} size={24} color="#27ae60" style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  weatherIcon: {
    width: 150,
    height: 150,
    marginVertical: 16,
  },
  temperature: {
    fontSize: 48,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  infoContainer: {
    width: width * 0.9,
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    marginTop: 20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    width: 30,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
});

export default WeatherDetails;
