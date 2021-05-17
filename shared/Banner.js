import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

var { width } = Dimensions.get("window");
const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://i.postimg.cc/SNyzFdhP/wls-home-banner.png",
      "https://i.postimg.cc/9MdzsRNV/pngegg.png",
      "https://i.postimg.cc/YCv0Myyd/Pngtree-landing-page-language-courses-illustration-5066905.png",
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);
       {/* here the slidshow for the banner of the App begins looping om map on all the Data*/}
  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: "gainsboro",
  },

  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;