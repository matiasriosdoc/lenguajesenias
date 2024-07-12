import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { getCardPadding } from './../../util/layoutUtil';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingVertical: getCardPadding(),
    paddingHorizontal: getCardPadding(),
  },
});

export default function List({ data, scrollRef, renderItem }) {
  return (
    <FlatList
      ref={scrollRef}
      style={styles.viewContainer}
      numColumns={2}
      initialNumToRender={6}
      maxToRenderPerBatch={10}
      removeClippedSubviews={true}
      data={data}
      keyExtractor={item => item.name_es}
      renderItem={renderItem}
    />
  );
}
