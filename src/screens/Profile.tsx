import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import {Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from '@components/input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile(){

    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState("https://media.discordapp.net/attachments/737185397423079556/1119756049843503204/marcelo.jpg")

    const toast = useToast();

    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true);

        try{

            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4,4],
                allowsEditing: true
            });

            if(!photoSelected.canceled){
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
                    
                    if(photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5){
                        return toast.show({
                            title: 'Essa imagem é muito grande.',
                            placement: 'top',
                            bgColor: 'red.500'
                        })
                    }
                    setUserPhoto(photoSelected.assets[0].uri);

                    return toast.show({
                        title: 'Imagem atualizada',
                        placement: 'top',
                        bgColor: 'green.500'
                    })
                
            }

        } catch (error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false);
        }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil"/>
            <ScrollView>
                <Center mt={6} px={10}>
                { 
                photoIsLoading ?
                <Skeleton 
                        w={PHOTO_SIZE} 
                        h={PHOTO_SIZE} 
                        rounded="full"
                        startColor="gray.500"
                        endColor="gray.400"
                    />
                    :
                    <UserPhoto
                        source={{uri: userPhoto}}
                        alt="Foto do usuario"
                        size={PHOTO_SIZE}
                    />}

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar foto
                        </Text>
                    </TouchableOpacity>
                    
                    <Input
                        placeholder='Nome'
                        bg='gray.600'
                    />
                    <Input
                        bg='gray.600'
                        value='marcelo@apice.com.br'
                        isDisabled
                    />

                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading color='gray.200' fontSize="md" mb={2}  fontFamily="heading">
                        Alterar senha
                    </Heading>

                    <Input
                        bg='gray.600'
                        placeholder='Senha antiga'
                        secureTextEntry
                    />

                    <Input
                        bg='gray.600'
                        placeholder='Nova senha'
                        secureTextEntry
                    />
                    <Input
                        bg='gray.600'
                        placeholder='Confirme a nova senha'
                        secureTextEntry
                    />

                    <Button
                        title='Atualizar'
                        mt={4}
                    />

                </VStack>
            </ScrollView>
        </VStack>
    )
}