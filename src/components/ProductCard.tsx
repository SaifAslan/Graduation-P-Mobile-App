import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IProduct } from '../interfaces/product';

export default function ProductCard(props:{product:IProduct}): JSX.Element{
    const {brand_name, details, sell_price, mrp, discount, imageUri} =
      props.product;
  
    return (
      <View style={ProductStyles.container}>
        <View style={ProductStyles.imageContainer}>
          <Image
            style={ProductStyles.image}
            source={{
              uri: imageUri,
            }}
            onError={() => {
              console.log('Image Error');
            }}
          />
        </View>
        <View style={ProductStyles.descriptionSection}>
          <Text style={ProductStyles.brand}>{brand_name}</Text>
          <Text style={ProductStyles.title} numberOfLines={2}>
            {details}
          </Text>
          <View
            style={{
              ...ProductStyles.priceContainer,
              justifyContent: discount == '0% off' ? 'flex-end' : 'space-between',
            }}>
            {discount != '0% off' && (
              <Text style={ProductStyles.mrp}>{mrp.replace('\n', ' ')}</Text>
            )}
            <Text
              style={{
                ...ProductStyles.sellPrice,
                color: discount == '0% off' ? 'black' : 'red',
              }}>
              Rs {sell_price}
            </Text>
          </View>
        </View>
       {discount != '0% off' && <View style={ProductStyles.discountContainer}>
          <Text style={ProductStyles.discount}>{discount}</Text>
        </View>}
      </View>
    );
  };
  
  const ProductStyles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 1,
      width: 200,
      backgroundColor: 'white',
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    imageContainer: {
      // height:200,
      width: '100%',
      flex: 2,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    title: {
      // width: '100%',
      textTransform: 'capitalize',
      fontSize: 18,
    },
    descriptionSection: {
      flex: 1,
      padding: 10,
      display: 'flex',
      justifyContent: 'space-between',
    },
    brand: {
      textTransform: 'uppercase',
      color: '#73838D',
      fontSize: 14,
    },
    priceContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    mrp: {
      opacity: 0.5,
      textDecorationLine: 'line-through',
      fontWeight: '200',
      width: '50%',
    },
    sellPrice: {
      fontWeight: '600',
      color: 'red',
    },
    discountContainer: {
      position: 'absolute',
      padding: 5,
      backgroundColor: 'rgba(0,0,0,0.7)',
      right: 0,
      top: 20,
    },
    discount: {
      color: 'white',
    },
  });