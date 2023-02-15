import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigation';
import Add from './Add';
import Note from './Note';

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigation} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Note" component={Note} />
    </Stack.Navigator>
  );
}

export default StackNavigation;