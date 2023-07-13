import { TouchableOpacity } from 'react-native'
import { HStack, Text, Heading, VStack, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png'

import { UserPhoto } from "./UserPhoto";
import { useAuth } from '@hooks/useAuth';

export function HomeHeader() {

    const { user, singOut } = useAuth();

    return (
    <HStack bg= "gray.600" pt={16} pb={5} px={8} alignItems="center">
        <UserPhoto 
            source={user.avatar ? { uri:user.avatar } : defaultUserPhotoImg}
            alt= "Imagem so usuario"
            size={16}
            mr={4}
        />
        <VStack flex={1}>
            <Text color="gray.100" fontSize="md">
                Olá,
            </Text>

            <Heading color="gray.100" fontSize="md" fontFamily="heading">
                {user.name}
            </Heading>
        </VStack>

        <TouchableOpacity onPress={singOut}>
            <Icon
                as= {MaterialIcons}
                name="logout"
                color="gray.200"
                size={7}
            />
        </TouchableOpacity>
    </HStack> 
    )
}