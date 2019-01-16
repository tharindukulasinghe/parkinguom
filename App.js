import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  PermissionsAndroid
} from "react-native";
import MapView from "react-native-maps";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

export default class App extends Component {
  state = {
    mapRegion: {
      latitude: 24.234631,
      longitude: 89.907127,
      error: false,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05
    },
    loading: true
  };
  navigateToHome() {
    navigator.geolocation.getCurrentPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05
      };
      this.setState({ mapRegion: region, loading: false });
      //alert("done");
    });
  }
  async componentDidMount() {
    await this.requestAccess();
  }

  requestAccess = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location permission",
          message:
            "App needs access to your location " +
            "so we can show your location."
        }
      );
      const grant = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (grant) {
        /*         navigator.geolocation.getCurrentPosition(
          position => {
            let region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05
            };
            this.setState({ mapRegion: region, loading: false });
            //alert("done");
          },
          error => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        ); */
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      alert(err);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.mapRegion}
          showsCompass={true}
          showsUserLocation={true}
        />
        <View
          style={{ padding: 20 }}
          style={{
            position: "absolute", //use absolute position to show button on top of the map
            top: "80%", //for center align
            alignSelf: "center",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch"
            //for align to right
          }}
        >
          <View>
            <Button
              title="Navigate to my location"
              onPress={() => {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                  interval: 20000,
                  fastInterval: 10000
                })
                  .then(data => {
                    setTimeout(() => {
                      //alert("Hello");
                      navigator.geolocation.getCurrentPosition(
                        position => {
                          //alert("hi");
                          let region = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.05
                          };
                          this.setState({ mapRegion: region, loading: false });
                          //alert("done");
                        },
                        err => {
                          alert(JSON.stringify(err));
                        }
                      );
                    }, 2000);
                    //alert("done");
                  })
                  .catch(err => {
                    alert("not done");
                  });
              }}
            />
          </View>
          <Button
            title="Select Destination"
            onPress={() => {
              alert(JSON.stringify(this.state.mapRegion));
            }}
          />
        </View>
      </View>
    );
  }
}
