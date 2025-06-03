import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { InputScreen } from './screens/InputScreen';
import { VerifyScreen } from './screens/VerifyScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Input') {
                iconName = focused ? 'create' : 'create-outline';
              } else if (route.name === 'Verify') {
                iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
              } else {
                iconName = 'help-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6366F1',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: 60,
              backgroundColor: 'white',
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
              marginTop: 2,
            },
            tabBarIconStyle: {
              marginTop: 5,
            },
          })}
        >
          <Tab.Screen 
            name="Input" 
            component={InputScreen} 
            options={{ title: 'Sign' }}
          />
          <Tab.Screen 
            name="Verify" 
            component={VerifyScreen} 
            options={{ title: 'Verify' }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
