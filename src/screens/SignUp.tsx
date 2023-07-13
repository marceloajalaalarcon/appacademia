import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { api } from '@services/api';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png'

import { Input } from '@components/input';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string
}

const SignUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o E-mail').email('E-mail invalido'),
    password: yup.string().required('Informe senha').min(8, 'A senha deve ter pelo menos 8 digitos'),
    passwordConfirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password'), null], 'A senha está diferente')
});

export function SignUp(){

    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();

    const toast = useToast();

    const { control, handleSubmit, formState:{errors} } = useForm<FormDataProps>({
        resolver: yupResolver(SignUpSchema)
    });

    const navigation = useNavigation();
    function handleGoBack(){
        navigation.goBack();
    }

    async function handleSingUp({ name, email, password } : FormDataProps){
      
        try{
            setIsLoading(true)

            await api.post('/users', { name, email, password });
            await signIn(email, password);
        } catch (error){
            setIsLoading(false)
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possivel criar a conta. Tente novamente mais tarde.'
            
             toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
      
      
    }

return(
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
    <VStack flex={1} px={10} pb={2}>
        <Image 
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode='contain'
        position="absolute"
        />

        <Center my={24}>
            <LogoSvg/>
            <Text color="gray.100" fontSize="sm">
                Treine sua mente e o seu corpo
            </Text>
        </Center>

        <Center>
            <Heading color="gray.100" fontSize='xl' mb={6} fontFamily="heading">
                Crie sua conta
            </Heading>

            <Controller
                control={control}
                name='name'
                render={({ field: { onChange, value }})=>(
                    <Input 
                        placeholder='Nome'
                        onChangeText={onChange}
                        value={value}
                        errorMessage={errors.name?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name='email'
                render={({field: { onChange, value }})=>(
                    <Input 
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={onChange}
                        value={value}
                        errorMessage={errors.email?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name='password'
                render={({field: { onChange, value }})=>(
                    <Input 
                        placeholder='Senha'
                        secureTextEntry
                        onChangeText={onChange}
                        value={value}
                        errorMessage={errors.password?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name='passwordConfirm'
                render={({field: { onChange, value }})=>(
                    <Input 
                        placeholder='Confirme a senha'
                        secureTextEntry
                        onChangeText={onChange}
                        value={value}
                        onSubmitEditing={handleSubmit(handleSingUp)}
                        returnKeyType='send'
                        errorMessage={errors.passwordConfirm?.message}
                    />
                )}
            />

            <Button 
                title='Criar e acessar'
                onPress={handleSubmit(handleSingUp)}
                isLoading={isLoading}
            />
        </Center>



            <Button 
                title='Volta para o login' 
                variant="outline" mt={24}
                onPress={handleGoBack}
                />
       
    </VStack>
    </ScrollView>
)
}