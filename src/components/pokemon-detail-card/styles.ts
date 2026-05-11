import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
   flex:1,
   padding: 16,
  },
  header: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#333',
  },
  dataSection: {
    padding: 20,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  dataLabel: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
  },
  dataValue: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
});