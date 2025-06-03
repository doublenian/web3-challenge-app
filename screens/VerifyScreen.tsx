import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Input, InputField } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { Ionicons } from '@expo/vector-icons';
import * as CryptoJS from 'crypto-js';

export const VerifyScreen = () => {
  const [message, setMessage] = useState('');
  const [expectedHash, setExpectedHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const toast = useToast();

  const pasteFromClipboard = async (setFunction: (value: string) => void, label: string) => {
    try {
      const clipboardText = await Clipboard.getStringAsync();
      if (clipboardText.trim()) {
        setFunction(clipboardText.trim());
        toast.show({
          placement: "top",
          render: ({ id }) => {
            return (
              <Toast nativeID={`toast-${id}`} action="success" variant="solid">
                <ToastTitle>Paste Successful</ToastTitle>
                <ToastTitle>{label} pasted from clipboard</ToastTitle>
              </Toast>
            );
          },
        });
      } else {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            return (
              <Toast nativeID={`toast-${id}`} action="warning" variant="solid">
                <ToastTitle>Clipboard Empty</ToastTitle>
                <ToastTitle>No text content in clipboard</ToastTitle>
              </Toast>
            );
          },
        });
      }
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast nativeID={`toast-${id}`} action="error" variant="solid">
              <ToastTitle>Paste Failed</ToastTitle>
              <ToastTitle>Unable to get content from clipboard</ToastTitle>
            </Toast>
          );
        },
      });
    }
  };

  const verifyHash = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message to verify');
      return;
    }

    if (!expectedHash.trim()) {
      Alert.alert('Error', 'Please enter SHA-256 hash');
      return;
    }

    try {
      // Verify SHA-256 hash
      const calculatedHash = CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
      const hashValid = calculatedHash.toLowerCase() === expectedHash.toLowerCase();
      
      setVerificationResult(hashValid);

      Alert.alert(
        'Verification Result',
        hashValid ? 'SHA-256 hash verification successful!' : 'SHA-256 hash verification failed!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'An error occurred during verification, please check input format');
      setVerificationResult(false);
    }
  };

  const clearAll = () => {
    setMessage('');
    setExpectedHash('');
    setVerificationResult(null);
  };

  return (
    <Box className="flex-1 bg-background-50 p-4">
      <VStack space="lg" className="flex-1">
        {/* Title */}
        <HStack className="justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-typography-900">Hash Verification</Text>
        </HStack>

        {/* Message Input */}
        <Card className="p-4">
          <VStack space="md">
            <Text className="font-semibold text-typography-800">Message</Text>
            <Textarea>
              <TextareaInput
                placeholder="Enter message to verify..."
                value={message}
                onChangeText={setMessage}
                className="min-h-[120px]"
              />
            </Textarea>
          </VStack>
        </Card>

        {/* SHA-256 Hash Input */}
        <Card className="p-4">
          <VStack space="md">
            <HStack className="justify-between items-center">
              <Text className="font-semibold text-typography-800">SHA-256 Hash (hex)</Text>
              <Button 
                size="xs"
                variant="outline"
                onPress={() => pasteFromClipboard(setExpectedHash, 'SHA-256 Hash')}
              >
                <HStack className="items-center space-x-1">
                  <Ionicons name="clipboard-outline" size={14} color="#6B7280" />
                  <ButtonText className="text-xs">Paste</ButtonText>
                </HStack>
              </Button>
            </HStack>
            <Textarea className="min-h-[80px]">
              <TextareaInput
                placeholder="Enter SHA-256 hash..."
                value={expectedHash}
                onChangeText={setExpectedHash}
                className="text-xs font-mono"
              />
            </Textarea>
          </VStack>
        </Card>

        {/* Verification Buttons */}
        <HStack space="md">
          <Button 
            onPress={verifyHash}
            className="bg-primary-500 flex-1"
            isDisabled={!message.trim() || !expectedHash.trim()}
          >
            <ButtonText>Verify Hash</ButtonText>
          </Button>
          <Button 
            onPress={clearAll}
            variant="outline"
            className="flex-1"
          >
            <ButtonText>Clear</ButtonText>
          </Button>
        </HStack>

        {/* Verification Results */}
        {verificationResult !== null && (
          <Card className="p-4">
            <VStack space="md">
              <Text className="font-semibold text-typography-800">Verification Result</Text>
              
              <HStack className="items-center justify-between p-4 rounded-lg bg-background-100">
                <HStack className="items-center">
                  <Badge variant="solid" className="bg-success-500">
                    <BadgeText>SHA-256</BadgeText>
                  </Badge>
                  <Text className="ml-2 font-medium">Hash Verification</Text>
                </HStack>
                <Badge 
                  variant="solid" 
                  className={verificationResult ? 'bg-success-500' : 'bg-error-500'}
                  size="lg"
                >
                  <BadgeText className="text-white font-bold">
                    {verificationResult ? 'Valid' : 'Invalid'}
                  </BadgeText>
                </Badge>
              </HStack>

              <Box 
                className={`w-full p-4 rounded-lg ${
                  verificationResult ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
                }`}
              >
                <Text 
                  className={`text-center font-medium ${
                    verificationResult ? 'text-success-700' : 'text-error-700'
                  }`}
                >
                  {verificationResult 
                    ? '✓ SHA-256 hash verification successful! Message content matches.' 
                    : '✗ SHA-256 hash verification failed! Message content does not match.'
                  }
                </Text>
              </Box>
            </VStack>
          </Card>
        )}
      </VStack>
    </Box>
  );
}; 