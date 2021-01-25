import React, {useState, useEffect, useContext} from 'react';
import * as RNLocalize from 'react-native-localize';

import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

import en from './src/lang/en.json';
import tr from './src/lang/tr.json';
import fr from './src/lang/fr.json';
import ar from './src/lang/ar.json';

type LanguageContextType = {
  hello: string;
  isim: string;
  ID: string;
  veri: string;
  tarih: string;
};

const LanguageContext = React.createContext<LanguageContextType>(
  {} as LanguageContextType,
);

const languageObj = {
  en: en,
  fr: fr,
  tr: tr,
  ar: ar,
};

const LanguageContextProvider: React.FC = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(Object.keys(languageObj));
    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...languageObj[selectedLanguage as 'en' | 'tr' | 'fr' | 'ar'],
  };

  return (
    <LanguageContext.Provider value={value}>
      <App />
    </LanguageContext.Provider>
  );
};
const useTranslation = () => useContext(LanguageContext);


const App = () => {
  const { hello, isim, ID, veri, tarih } = useTranslation();

  return (
  <View style={styles.container}>

    <View style={styles.title}>
      <Text style={styles.text}>{hello}</Text>
      <Text style={styles.text}>{isim}</Text>
      <Text style={styles.text}>{ID}</Text>
      <Text style={styles.text}>{veri}</Text>
      <Text style={styles.text}>{tarih}</Text>
    </View>

    <View style={styles.buttons}>
      <Button color="#234584" title={hello} onPress={() => console.warn(hello)}/>
    </View>

  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    flex:1,
    marginHorizontal: 30,
  },
  title: {
    height: 100,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "yellow",
  },
  buttons: {
    justifyContent: "space-around",
    height: 200,
    marginVertical: 20,
  },
});

export default LanguageContextProvider;
