import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  illustrationContainer: {
    height: 250,
    marginBottom: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIllustrationContainer: {
    height: 240,
    marginBottom: -45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  smallIllustration: {
    width: '45%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#008000',
  },
  input: {
    backgroundColor: '#0D330E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#008000',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#008000',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#008000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#008000',
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxLabel: {
    color: '#008000',
  },
  forgotPassword: {
    color: '#008000',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  bottomText: {
    color: '#008000',
  },
  bottomLink: {
    color: '#008000',
    fontWeight: 'bold',
  },
});