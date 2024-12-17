import { router } from 'expo-router';
import { shareAsync } from 'expo-sharing';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Invoice } from '~/schema/invoice';
import { useStore } from '~/store/store';
import { generateInvoicePDF } from '~/utils/pdf';
import LottieView from 'lottie-react-native';

const SuccessScreen = () => {
  const newInvoice = useStore((data) => data.newInvoice);
  const getSubTotal = useStore((data) => data.getSubTotal);
  const getTax = useStore((data) => data.getTax);
  const getTotal = useStore((data) => data.getTotal);

  const [isLoading, setIsLoading] = useState(false);
  const [uriPdf, setUriPdf] = useState<string | null>(null);
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    handleGeneratePDF();
  }, []);

  const handleGeneratePDF = async () => {
    setIsLoading(true);
    const uri = await generateInvoicePDF(newInvoice as Invoice, getTotal, getTax, getSubTotal);
    if (uri) {
      setUriPdf(uri);
      animation.current?.play();
    } else {
      console.log('Error generating PDF');
    }
    setIsLoading(false);
  };

  const handleShare = async () => {
    if (uriPdf) {
      await shareAsync(uriPdf, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-4 text-lg font-medium text-gray-700">Generating invoice...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6">
      <LottieView
        loop={false}
        ref={animation}
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#f3f4f6',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('~/assets/animation.json')}
      />
      <Image
        source={{
          uri: 'https://cdn3.iconfinder.com/data/icons/miscellaneous-80/60/check-512.png',
        }}
        className="mb-6 h-24 w-24"
      />

      {/* Success Text */}
      <Text className="mb-2 text-2xl font-bold text-green-600">Congratulations!</Text>
      <Text className="mb-6 text-center text-base text-gray-600">
        Your invoice has been successfully generated.
      </Text>

      {/* Share Button */}
      <TouchableOpacity
        className="mb-4 w-full flex-row items-center rounded-full bg-green-600 px-6 py-4"
        onPress={handleShare}>
        <Icon name="share" size={20} color="#fff" className="mr-2" />
        <Text className="flex-1 text-center text-lg font-bold text-white">Share</Text>
      </TouchableOpacity>

      {/* Back Home Button */}
      <TouchableOpacity
        className=" w-full flex-row items-center rounded-full border border-blue-700 bg-transparent px-6 py-4"
        onPress={() => {
          router.replace('/');
        }}>
        <Icon name="home" size={20} color="#0000FF" className="mr-2" />
        <Text className="flex-1 text-center text-lg font-bold text-blue-700">Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;
