import {
  Image,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import useApi from "common/hooks/useApi";
import { getScreenHeightRespValue } from "../utils";
import { useEffect } from "react";

const Home = () => {
  const { list, hasMore, loading, fetchRecords } = useApi();

  useEffect(() => {
    fetchRecords();
  }, []);
  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          style={{ height: 60, width: 60, marginRight: 15 }}
          source={{ uri: item.thumbnail }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            width: "80%",
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (hasMore && !loading) fetchRecords();
        }}
        onEndReachedThreshold={0.3}
        initialNumToRender={10} // Initial number of items to render
        maxToRenderPerBatch={7} // Max items to render per scroll batch
        removeClippedSubviews={true} // Improve scroll performance
        contentContainerStyle={{ padding: 20 }}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 10,
  },
});

export default Home;
