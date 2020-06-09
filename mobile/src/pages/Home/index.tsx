import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, StyleSheet, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface PickerSelect {
  label: string;
  value: string;
}

const Home: React.FC = () => {

  const [ufs, setUfs] = useState<PickerSelect[]>([]);
  const [cities, setCities] = useState<PickerSelect[]>([]);  
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => {
          return { label: uf.sigla, value: uf.sigla }
        });
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => {
          return { label: city.nome, value: city.nome }
        });
        setCities(cityNames);
      });
  }, [selectedUf]);



  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity,
    });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >      
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        

        <View style={styles.footer}>
          {/* <TextInput 
              style={styles.input}
              placeholder='Digite a UF'
              value={uf}
              maxLength={2}
              autoCapitalize="characters"
              autoCorrect={false}
              onChangeText={text => setUf(text)}
            />
            <TextInput
              style={styles.input}
              placeholder='Digite a cidade'
              value={city}
              autoCorrect={false}
              onChangeText={setCity}
            /> */}
          <RNPickerSelect
            placeholder={{
              label: 'Selecione uma UF',
              value: null,
              color: '#9EA0A4'
            }}
            style={pickerStyle}
            Icon={() => {
              return <Icon name="chevron-down" size={24} color="#C9C9C9" style={{top: 20, right: 10}} />;
            }}
            value={selectedUf} 
            onValueChange={setSelectedUf}
            items={ufs}
          />
          <RNPickerSelect
            placeholder={{
              label: 'Selecione uma cidade',
              value: null,
              color: '#9EA0A4'
            }}
            style={pickerStyle}
            value={selectedCity} 
            Icon={() => {
              return <Icon name="chevron-down" size={24} color="#C9C9C9" style={{top: 20, right: 10}} />;
            }}
            onValueChange={setSelectedCity}
            items={cities}
          />
        </View>

        <View style={styles.footer}>          
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} /> 
              </Text>
            </View> 
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )

}

export default Home;

const pickerStyle = {
	inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 30,
    fontSize: 16,
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32    
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});