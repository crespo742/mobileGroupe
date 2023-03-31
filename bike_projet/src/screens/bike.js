import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

const Bike = (props) => {
    const navigation = useNavigation();

    const [bikes, setBikes] = useState([]);
    const [make, setMake] = useState('');
    const [url, setUrl] = useState(`https://api.api-ninjas.com/v1/motorcycles?make=${make}`);

    useEffect(() => {
        axios({
            method: "GET",
            url,
            headers: { 'X-Api-Key': 'f5W7nasxrAW6GVNKvJHyEg==dml17MunnVzfVATf' },
        }).then((res) => {
            setBikes(prevState => [...prevState, ...res.data]);
        }).catch(error => {
            console.log(error);
        });
    }, [url]);


    const handleNavigation = page => {
        props.navigation.navigate(page);
    };

    const BikeRow = ({ make, model, year, power }) => {

        const storeData = async (make, model, year, power) => {
            const existingData = await AsyncStorage.getItem('@model');
            const data = existingData ? JSON.parse(existingData) : [];
            const newData = [...data, { make, model, year, power }];
            const jsonValue = JSON.stringify(newData);
            await AsyncStorage.setItem('@model', jsonValue);
        };


        return (
            <Wrapper>
                <StyledText>
                    {make} - {model} - {year}- {power}
                </StyledText>
                <TouchableOpacity onPress={() => storeData(make, model, year, power)}>
                    <StyledText>favoris</StyledText>
                </TouchableOpacity>
            </Wrapper>
        );
    };

    const handleButtonClick = make => {
        setMake(make);
        setUrl(`https://api.api-ninjas.com/v1/motorcycles?make=${make}`);
        setBikes([]);
    };

    return (
        <View>
            {/* <TouchableGoBack onPress={() => navigation.goBack()}>
                <GoBackText>Go Back</GoBackText>
            </TouchableGoBack> */}
            <Title>
                Liste selectionne : {make}
            </Title>

            <StyledButton onPress={() => handleNavigation('Favoris')}>
                <StyledText>Favoris</StyledText>
            </StyledButton>

            <Wrapper>
                <StyledButton onPress={() => handleButtonClick('Honda')}>
                    <Text>
                        Honda
                    </Text>
                </StyledButton>
                <StyledButton onPress={() => handleButtonClick('Yamaha')}>
                    <Text>
                        Yamaha
                    </Text>
                </StyledButton>
                <StyledButton onPress={() => handleButtonClick('Kawasaki')}>
                    <Text>
                        Kawasaki
                    </Text>
                </StyledButton>
                <StyledButton onPress={() => handleButtonClick('Suzuki')}>
                    <Text>
                        Suzuki
                    </Text>
                </StyledButton>
                <StyledButton onPress={() => handleButtonClick('Ktm')}>
                    <Text>
                        Ktm
                    </Text>
                </StyledButton>
                <StyledButton onPress={() => handleButtonClick('Ducati')}>
                    <Text>
                        Ducati
                    </Text>
                </StyledButton>
                <StyledButton onPress={() => handleButtonClick('Gas Gas')}>
                    <Text>
                        Gas Gas
                    </Text>
                </StyledButton>
                <StyledButton onPress={() => handleButtonClick('Bmw')}>
                    <Text>
                        Bmw
                    </Text>
                </StyledButton>
            </Wrapper>

            <FlatList
                data={bikes}
                renderItem={({ item }) => (
                    <BikeRow
                        make={item.make}
                        model={item.model}
                        year={item.year}
                        power={item.power}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const Wrapper = styled.Text`
  display:flex;
  align-items:center;
  flex-direction:column;
`;

const Title = styled.Text`
  text-align:center;
  font-size:25px
`;

const StyledButton = styled.TouchableOpacity`
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  text-align:center;
`;

const TouchableGoBack = styled.TouchableOpacity`
  border:1px solid;
  width:80px;
  height:30px;
  background-color:black;
  justify-content:center;
  align-items:center;
  top:10px;
  left:10px;
  border-radius:5px;
`;

const GoBackText = styled.Text`
  color: white;
`;

const InputContainer = styled.View`
  margin: 4px;
`;

const StyledText = styled.Text`
  color: black;
`;

const Container = styled.View`
  flex: 1;
`;

export default Bike;