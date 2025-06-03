import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge, BadgeText } from '@/components/ui/badge';
import { ProfileModal } from '@/components/ProfileModal';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { Ionicons } from '@expo/vector-icons';
import * as CryptoJS from 'crypto-js';
import * as nacl from 'tweetnacl';

export const InputScreen = () => {
  const [message, setMessage] = useState('');
  const [hash, setHash] = useState('');
  const [signature, setSignature] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const toast = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await Clipboard.setStringAsync(text);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast nativeID={`toast-${id}`} action="success" variant="solid">
              <ToastTitle>Copy Successful</ToastTitle>
              <ToastTitle>{label} copied to clipboard</ToastTitle>
            </Toast>
          );
        },
      });
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast nativeID={`toast-${id}`} action="error" variant="solid">
              <ToastTitle>Copy Failed</ToastTitle>
              <ToastTitle>Unable to copy to clipboard</ToastTitle>
            </Toast>
          );
        },
      });
    }
  };

  const hashAndSign = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message to sign');
      return;
    }

    try {
      // Generate SHA-256 hash
      const hashHex = CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
      setHash(hashHex);

      // Generate new key pair and sign
      const keyPair = nacl.sign.keyPair();
      const messageBytes = new TextEncoder().encode(message);
      const signatureBytes = nacl.sign.detached(messageBytes, keyPair.secretKey);
      const signatureBase64 = btoa(String.fromCharCode(...signatureBytes));
      setSignature(signatureBase64);

      Alert.alert('Signature Successful', 'Message has been hashed and signed');
    } catch (error) {
      Alert.alert('Error', 'An error occurred during the signing process');
    }
  };

  return (
    <Box className="flex-1 bg-background-50 p-4">
      <VStack space="lg" className="flex-1">
        {/* Profile Button */}
        <HStack className="justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-typography-900">Crypto Signature</Text>
          <Button 
            size="sm" 
            variant="outline"
            className="rounded-full"
            onPress={() => setShowProfileModal(true)}
          >
            <ButtonText>Profile</ButtonText>
          </Button>
        </HStack>

        {/* Message Input */}
        <Card className="p-4 flex-1">
          <VStack space="md" className="flex-1">
            <Text className="font-semibold text-typography-800">Message Input</Text>
            <Textarea className="flex-1">
              <TextareaInput
                placeholder="Enter any UTF-8 message..."
                value={message}
                onChangeText={setMessage}
                className="min-h-[120px]"
              />
            </Textarea>
            
            <Button 
              onPress={hashAndSign}
              className='bg-primary-500'
            >
              <ButtonText>Hash + Sign</ButtonText>
            </Button>
          </VStack>
        </Card>

        {/* Results Display */}
        {(hash || signature) && (
          <Card className="p-4">
            <VStack space="md">
              <Text className="font-semibold text-typography-800">Signature Results</Text>
              
              {hash && (
                <VStack space="sm">
                  <HStack className="items-center">
                    <Badge variant="solid" className="bg-success-500">
                      <BadgeText>SHA-256</BadgeText>
                    </Badge>
                    <Text className="ml-2 text-sm text-typography-600">Hash (hex)</Text>
                  </HStack>
                  <HStack className="items-start space-x-2">
                    <Box className="flex-1">
                      <Textarea className="min-h-[80px]">
                        <TextareaInput
                          value={hash}
                          editable={false}
                          multiline={true}
                          className="text-xs font-mono bg-background-100"
                          style={{ fontSize: 12 }}
                        />
                      </Textarea>
                    </Box>
                    <Button 
                      size="xs"
                      variant="outline"
                      className="ml-2 flex-shrink-0"
                      onPress={() => copyToClipboard(hash, 'SHA-256 Hash')}
                    >
                      <Ionicons name="copy-outline" size={16} color="#6B7280" />
                    </Button>
                  </HStack>
                </VStack>
              )}

              {signature && (
                <VStack space="sm">
                  <HStack className="items-center">
                    <Badge variant="solid" className="bg-info-500">
                      <BadgeText>Ed25519</BadgeText>
                    </Badge>
                    <Text className="ml-2 text-sm text-typography-600">Signature (base64)</Text>
                  </HStack>
                  <HStack className="items-start space-x-2">
                    <Box className="flex-1">
                      <Textarea className="min-h-[80px]">
                        <TextareaInput
                          value={signature}
                          editable={false}
                          multiline={true}
                          className="text-xs font-mono bg-background-100"
                          style={{ fontSize: 12 }}
                        />
                      </Textarea>
                    </Box>
                    <Button 
                      size="xs"
                      variant="outline"
                      className="ml-2 flex-shrink-0"
                      onPress={() => copyToClipboard(signature, 'Ed25519 Signature')}
                    >
                      <Ionicons name="copy-outline" size={16} color="#6B7280" />
                    </Button>
                  </HStack>
                </VStack>
              )}
            </VStack>
          </Card>
        )}
      </VStack>

      <ProfileModal 
        visible={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </Box>
  );
}; 