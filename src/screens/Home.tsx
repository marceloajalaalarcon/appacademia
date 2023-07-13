import { useState } from 'react'
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack,  FlatList, HStack, Heading, Text} from "native-base";
import { ExerciseCard } from '@components/ExerciseCard';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Home(){
    const [ groups, setGroups ] = useState(['Costa', 'Biceps', 'Triceps', 'Ombro'])
    const [ exercicios, setExercicios ] = useState(['Costa', 'Biceps', 'Triceps', 'Ombro'])
    const [ groupSelected, setGroupSelected ] = useState('')

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExerciseDetails(){
        navigation.navigate('exercise')
    }

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item })=> (
                <Group 
                    name={item}
                    isActive={groupSelected === item}
                    onPress={() => setGroupSelected(item)}
                />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{px: 8 }}
                my={10}
                maxH={10}
            />
            <VStack flex={1} px={8}>
            <HStack justifyContent='space-between' mb={5}>
                <Heading color="gray.200" fontSize="md"  fontFamily="heading">
                    Exercícios
                </Heading>
                    <Text color="gray.200" fontSize="sm">
                        {exercicios.length}
                    </Text>
            </HStack>

            <FlatList 
                data={exercicios}
                keyExtractor={ item => item }
                renderItem={({ item })=>( 
                    <ExerciseCard 
                        onPress={handleOpenExerciseDetails}
                    /> 
                )}
                showsVerticalScrollIndicator={false}
                _contentContainerStyle={{paddingBottom: 10}}
            />
                

            </VStack>
        </VStack>
    )
}