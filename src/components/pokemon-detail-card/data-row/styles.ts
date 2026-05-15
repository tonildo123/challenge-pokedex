import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
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

export default styles;