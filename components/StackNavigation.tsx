import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigation';
import Add from './Add';
import Note from './Note';
import Atm from './Atm';
import Map from './Map';
import Stock from './Stock';
import Card from './Card';
import AddCard from './AddCard';
import Predict from './Predict';
import Feedback from './Feedback';
import Edit from './Edit';

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigation} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Note" component={Note} />
      <Stack.Screen name="Atm" component={Atm} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Stock" component={Stock} />
      <Stack.Screen name="Card" component={Card} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Predict" component={Predict} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
}

export default StackNavigation;