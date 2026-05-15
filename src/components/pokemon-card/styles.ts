import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    margin: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row', 
    alignItems: 'center'
  },
  descriptionCard:
    { flex: 1, justifyContent: 'center' }
  ,
  typesAndFavoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 8,
    right: 80,
    zIndex: 1,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
    backgroundColor:'transparent',
    borderRadius: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 30,
    textTransform: 'capitalize',
  },
});