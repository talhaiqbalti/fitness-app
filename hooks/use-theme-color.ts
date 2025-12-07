export function useThemeColor(props: any, colorName: any) {
  const colorFromProps = props.light;

  if (colorFromProps) {
    return colorFromProps;
  }

  const colors: any = {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
  };

  return colors[colorName] || '#11181C';
}
