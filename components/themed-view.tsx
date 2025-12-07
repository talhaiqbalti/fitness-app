import { View } from 'react-native';

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: any) {
  const backgroundColor = lightColor || '#fff';

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
