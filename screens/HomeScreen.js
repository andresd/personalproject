import React from "react";
import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Icon from "react-native-vector-icons/FontAwesome";

import { Ionicons } from "@expo/vector-icons";

import styles from "./stylesHome";

import HeaderButton from "../components/HeaderButton";
import SpotList from "../components/SpotList";

const HomeScreen = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const spots = useSelector(state => state.spots.filteredSpots);

  const displayedSpots = spots.filter(spot => spot.name != " ");

  return (
    <View>
      <View style={styles.filter}>
        <TouchableCmp
          onPress={() => props.navigation.navigate({ routeName: "Filter" })}
        >
          <View style={styles.filterBtn}>
            <Icon name="filter" size={25} color="#979797" />
            <Text style={styles.filterText}>Filter</Text>
          </View>
        </TouchableCmp>
      </View>

      <SpotList listData={displayedSpots} navigation={props.navigation} />
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: "Neighbourhood",
  headerTitleStyle: {
    textAlign: "center",
    flex: 1
  },
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Search"
        MyIconComponent={Ionicons}
        iconName="ios-search"
        onPress={() => {
          console.log("Search!");
        }}
      />
    </HeaderButtons>
  ),
  headerRight: <View style={{ padding: 6 }}></View>
};

export default HomeScreen;
