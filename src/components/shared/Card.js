import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from './../../res/colors';
import { getCardWidth, getCardPadding } from './../../util/layoutUtil';

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  image: {
    backgroundColor: Colors.CATEGORY_IMAGE_BACKGROUND_GREY,
  },
  selectable: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 100,
  },
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
  },
  name: {
    textAlign: 'center',
    fontFamily: 'nunito',
  },
});

export function Card({ name, children, onPress, src }) {
  const imagePaddingHorizontal = getCardPadding() * 2;
  const imagePaddingVertical = getCardPadding() * 2;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.cardContainer,
        {
          width: getCardWidth(),
          paddingVertical: getCardPadding(),
          paddingHorizontal: getCardPadding(),
        },
      ]}>
      <View
        style={[
          styles.imageContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            height: getCardWidth() - 4 * getCardPadding(),
          },
        ]}>
        {children}
        <Image
          style={[
            styles.image,
            {
              width:
                getCardWidth() -
                2 * (getCardPadding() + imagePaddingHorizontal),
              height:
                getCardWidth() - 2 * (getCardPadding() + imagePaddingVertical),
            },
          ]}
          source={src}
        />
      </View>
      <View
        style={[
          styles.nameContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            paddingHorizontal: imagePaddingHorizontal,
          },
        ]}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function SelectableCard({ selected, color, ...props }) {
  return (
    <Card {...props}>
      {selected && (
        <MaterialIcons
          name="check-circle"
          size={40}
          style={styles.selectable}
          color={color}
        />
      )}
    </Card>
  );
}
