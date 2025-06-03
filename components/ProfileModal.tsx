import React from 'react';
import { Modal, Alert, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Ionicons } from '@expo/vector-icons';

interface SavingsProductProps {
  icon: string;
  gradientColors: [string, string];
  title: string;
  rate: string;
  description: string;
}

const SavingsProduct: React.FC<SavingsProductProps> = ({
  icon,
  gradientColors,
  title,
  rate,
  description,
}) => {
  return (
    <TouchableOpacity 
      onPress={() => Alert.alert('Product Details', `${title}: ${description}`)}
      activeOpacity={0.7}
    >
      <Card className="p-4 mb-3 bg-white rounded-2xl">
        <HStack className="justify-between items-center">
          <HStack className="items-center flex-1">
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
            >
              <Ionicons name={icon as any} size={24} color="white" />
            </LinearGradient>
            <VStack className="flex-1">
              <Text className="font-semibold text-base text-black">{title}</Text>
              <Text className="text-sm text-gray-500 mt-1">
                {description}
              </Text>
            </VStack>
          </HStack>
          <VStack className="items-end ml-2">
            <Text className="text-lg font-semibold text-black">{rate}</Text>
          </VStack>
        </HStack>
      </Card>
    </TouchableOpacity>
  );
};

interface ComingSoonServiceProps {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  title: string;
}

const ComingSoonService: React.FC<ComingSoonServiceProps> = ({
  icon,
  iconColor,
  iconBgColor,
  title,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Card className="p-4 bg-white rounded-xl items-center flex-1">
        <Box 
          className="w-16 h-16 rounded-full items-center justify-center mb-3"
          style={{ backgroundColor: iconBgColor }}
        >
          <Ionicons name={icon as any} size={32} color={iconColor} />
        </Box>
        <Text className="font-medium text-center text-black">{title}</Text>
      </Card>
    </TouchableOpacity>
  );
};

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        style={{ opacity: fadeAnim }}
        className="flex-1 bg-black/50 justify-end"
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={onClose}
          className="flex-1"
        />
        <Animated.View
          style={{ 
            transform: [{ translateY: slideAnim }],
            height: '100%'
          }}
        >
          <Box 
            className="rounded-t-3xl overflow-hidden flex-1"
            style={{ backgroundColor: '#F3F4F6' }}
          >
            {/* Fixed Hero Section */}
            <LinearGradient
              colors={['#87CEEB', '#4169E1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-6 relative"
              style={{ height: 240 }}
            >
              {/* Close Button */}
              <TouchableOpacity 
                onPress={onClose}
                className="absolute top-4 right-4 z-10"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 20,
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>

              <HStack className="justify-between items-start mb-4 mr-12">
                <VStack>
                  <Text className="text-white/80 text-sm">12,510 Savers</Text>
                  <HStack className="items-end">
                    <Text className="text-white text-5xl font-bold">5.6</Text>
                    <Text className="text-white text-2xl font-bold mb-1">%</Text>
                  </HStack>
                  <Text className="text-white text-sm">p.a.</Text>
                </VStack>
                <Box 
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <Ionicons name="gift" size={24} color="white" />
                </Box>
              </HStack>
              
              <Text className="text-white text-lg font-medium mb-4">
                Super Savings - withdraw anytime
              </Text>
              
              <HStack className="justify-between items-center">
                <Text className="text-white text-base font-medium">Super Savings</Text>
                <Button 
                  className="bg-white rounded-full px-8 py-3"
                  onPress={() => Alert.alert('Account Opening', 'Opening Super Savings account soon')}
                >
                  <ButtonText className="text-blue-600 font-bold text-base">JOIN</ButtonText>
                </Button>
              </HStack>
            </LinearGradient>

            {/* Scrollable Content */}
            <ScrollView 
              className="flex-1"
              style={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingBottom: 0 }}
            >
              <Box className="p-6">
                {/* Featured Products */}
                <VStack space="md" className="mb-8">
                  <HStack className="justify-between items-center mb-2">
                    <Text className="text-xl font-bold text-black">Featured Products</Text>
                    <TouchableOpacity>
                      <Text className="text-blue-500 font-medium">See All</Text>
                    </TouchableOpacity>
                  </HStack>

                  <SavingsProduct
                    icon="wallet"
                    gradientColors={['#10B981', '#3B82F6']}
                    title="Super Savings"
                    rate="5.60% p.a."
                    description="locked in interest rate, 1 year fixed term"
                  />

                  <SavingsProduct
                    icon="trending-up"
                    gradientColors={['#3B82F6', '#8B5CF6']}
                    title="Super Growth"
                    rate="13.2% p.a."
                    description="locked in interest rate, 1 year fixed term"
                  />

                  <SavingsProduct
                    icon="time"
                    gradientColors={['#F59E0B', '#EF4444']}
                    title="Term Deposit"
                    rate="23% p.a."
                    description="locked in interest rate, 1 year fixed term"
                  />
                </VStack>

                {/* Coming Soon */}
                <VStack space="md" className="mb-12">
                  <HStack className="justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-black">Coming Soon</Text>
                    <TouchableOpacity>
                      <Text className="text-blue-500 font-medium">See All</Text>
                    </TouchableOpacity>
                  </HStack>

                  <HStack space="md" className="justify-between mb-8">
                    <Box className="flex-1">
                      <ComingSoonService
                        icon="swap-horizontal"
                        iconColor="#3B82F6"
                        iconBgColor="#DBEAFE"
                        title="Remittance"
                      />
                    </Box>

                    <Box className="flex-1">
                      <ComingSoonService
                        icon="shield"
                        iconColor="#10B981"
                        iconBgColor="#D1FAE5"
                        title="Insurance"
                      />
                    </Box>

                    <Box className="flex-1">
                      <ComingSoonService
                        icon="card"
                        iconColor="#F59E0B"
                        iconBgColor="#FEF3C7"
                        title="Lending"
                      />
                    </Box>
                  </HStack>
                </VStack>
              </Box>
            </ScrollView>
          </Box>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}; 