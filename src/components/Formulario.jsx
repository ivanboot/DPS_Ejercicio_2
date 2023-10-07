import { View } from "react-native";
import { StyleSheet, Alert, Modal, ScrollView } from "react-native";
import { TextInput, Text, Card, Button } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import shortid from "react-id-generator";
import { useState, useEffect } from "react";

export function Formulario({ automoviles, setAutomoviles, setAutomovilStorage }) {


    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [placa, setPlaca] = useState('');
    const [color, setColor] = useState('');
    const [anio, setAnio] = useState('');
    const [marca, setMarca] = useState('');
    const [servicio, setServicio] = useState('');
    const [propina, setPropina] = useState(0.0);
    const [impuesto, setImpuesto] = useState(0.0);
    const [pago, setPago] = useState(0.0);
    //Costo base del servicio seleccionado
    const [costo, setCosto] = useState(0.0);


    useEffect(() => {
        obtenerCostoBase(servicio, tipo);
    }, [tipo]);

    useEffect(() => {
        calcularPago(costo, impuesto, propina);
    }, [costo, impuesto, propina]);


    const [modalVisible, setModalVisible] = useState(false);

    const selectTipo = [
        { key: 'Motocicleta', value: 'Motocicleta' },
        { key: 'Sedan', value: 'Sedán' },
        { key: 'Camioneta', value: 'Camioneta' },
        { key: 'Microbus', value: 'Microbús' },
        { key: 'Bus', value: 'Bus' },
    ]

    const selectServicio = [
        { key: '1', value: 'Lavado Básico' },
        { key: '2', value: 'Lavado Premium' },
        { key: '3', value: 'Lavado VIP' },
        { key: '4', value: 'Polarizado' },
    ]


    const selectMarca = [
        { key: '1', value: 'Nissan' },
        { key: '2', value: 'Suzuki' },
        { key: '3', value: 'Toyota' },
        { key: '4', value: 'Volkswagen' },
        { key: '5', value: 'Mitsubishi' },
        { key: '6', value: 'Mazda' },
        { key: '7', value: 'Honda' },
        { key: '8', value: 'Seat' },
        { key: '9', value: 'Volvo' },
        { key: '10', value: 'Renault' },
        { key: '11', value: 'Chevrolet' },
        { key: '12', value: 'Hyundai' },
    ]

    const registrarAutomovil = () => {

        if (nombre == '' || tipo == '' ||
            placa == '' || color == '' ||
            anio == '' || marca == '' ||
            servicio == '') {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                [{
                    text: 'OK'
                }]
            )
            limpiarCampos();
            return;
        }

        
        if (servicio == 'Polarizado' && tipo == 'Motocicleta') {
            Alert.alert(
                'Aviso',
                'El servicio de polarizado no aplica a motocicletas',
                [{
                    text: 'OK'
                }]
            )
            limpiarCampos();
            return;
        } else {
            obtenerCostoBase(servicio, tipo);
            calcularPago(costo, impuesto, propina);


            const Auto = { nombre, tipo, placa, color, anio, servicio, marca, costo, propina, impuesto, pago };
            Auto.id = shortid();

            const nuevoAuto = [...automoviles, Auto];

            setAutomoviles(nuevoAuto);
            setAutomovilStorage(JSON.stringify(nuevoAuto));

            limpiarCampos();

            setModalVisible(!modalVisible);
            console.log("Se ha registrado un auto");
        }

    }

    const limpiarCampos = () => {
        setNombre('');
        setServicio('');
        setTipo('');
        setMarca('');
        setAnio('');
        setPlaca('');
        setColor('');
        setCosto(0.0);
        setImpuesto(0.0);
        setPropina(0.0);
        setPago(0.0);
    }

    const obtenerCostoBase = (servicio, tipo) => {
        let costoBase = 0

        console.log("Servicio seleccionado: " + servicio);
        console.log("Tipo de auto: " + tipo);
        if (servicio === 'Lavado Básico') {
            if (tipo === 'Motocicleta') { costoBase = 2; }
            else if (tipo === 'Sedán') { costoBase = 3; }
            else if (tipo === 'Camioneta') { costoBase = 4; }
            else if (tipo === 'Microbús') { costoBase = 5; }
            else if (tipo === 'Bus') { costoBase = 6 }
        } else if (servicio === 'Lavado Premium') {
            if (tipo === 'Motocicleta') { costoBase = 2.5; }
            else if (tipo === 'Sedán') { costoBase = 3.5; }
            else if (tipo === 'Camioneta') { costoBase = 4.5; }
            else if (tipo === 'Microbús') { costoBase = 5.5; }
            else if (tipo === 'Bus') { costoBase = 6.5 }
        }
        else if (servicio === 'Lavado VIP') {
            if (tipo === 'Motocicleta') { costoBase = 3; }
            else if (tipo === 'Sedán') { costoBase = 4; }
            else if (tipo === 'Camioneta') { costoBase = 5; }
            else if (tipo === 'Microbús') { costoBase = 6; }
            else if (tipo === 'Bus') { costoBase = 7 }
        }
        else if (servicio === 'Polarizado') {
            if (tipo === 'Sedán') { costoBase = 25; }
            else if (tipo === 'Camioneta') { costoBase = 35; }
            else if (tipo === 'Microbús') { costoBase = 45; }
            else if (tipo === 'Bus') { costoBase = 60 }
        }
        const costoBaseTemp = costoBase.toFixed(2);
        
        setCosto(costoBaseTemp, console.log("Costo en state actual es de: " + costo));

        calcularPropina(costoBaseTemp);
        calcularImpuesto(costoBaseTemp);
    }

    //Revisar calculos
    const calcularPropina = (costoBase) => {
        var propinaTemp = 0;
        propinaTemp = (costoBase * 0.05).toFixed(2);

        setPropina(propinaTemp);
    }

    const calcularImpuesto = (costoBase) => {
        var impuestoTemp = 0;
        impuestoTemp = (costoBase * 0.13).toFixed(2);
        setImpuesto(impuestoTemp);
    }

    const calcularPago = (costoBase, impuesto, propina) => {
        var pagoTemp = 0;
        pagoTemp = parseFloat(costoBase) + parseFloat(impuesto) + parseFloat(propina);
        pagoTemp = pagoTemp.toFixed(2);
        setPago(pagoTemp);
    }

    return (
        <View>
            <Modal transparent={true} animationType='slide' visible={modalVisible}
                onRequestClose={() => { alert('Modal has been closed'); }}>
                <View style={styles.vistaModal}>
                    <View style={styles.Modal}>
                        <Card style={styles.cardContent}>

                            <Card.Content>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Text variant="headlineSmall">Formulario de Automovil</Text>
                                    <View style={styles.formControl}>
                                        <Text>Nombre del cliente:</Text>
                                        <TextInput mode="outlined" onChangeText={(value) => { setNombre(value) }} />
                                    </View>

                                    <View style={styles.formControl} >
                                        <Text>Servicio:</Text>
                                        <SelectList
                                            setSelected={(seleccion) => setServicio(seleccion)}
                                            data={selectServicio}
                                            save="value"
                                        />
                                    </View>

                                    <View style={styles.formControl} >
                                        <Text>Tipo de automovil:</Text>
                                        <SelectList
                                            setSelected={(seleccion) => setTipo(seleccion)}
                                            data={selectTipo}
                                            save="value"
                                        />
                                    </View>

                                    <View style={styles.formControl}>
                                        <Text>Marca de automovil:</Text>
                                        <SelectList
                                            setSelected={(seleccion) => setMarca(seleccion)}
                                            data={selectMarca}
                                            save="value" />
                                    </View>

                                    <View style={styles.formControl} >
                                        <Text>Año del automovil:</Text>
                                        <TextInput mode="outlined" keyboardType="numeric"
                                            onChangeText={(anio) => { setAnio(anio) }} />
                                    </View>

                                    <View style={styles.formControl}>
                                        <Text>Color del automovil:</Text>
                                        <TextInput mode="outlined" onChangeText={(value) => { setColor(value) }} />
                                    </View>

                                    <View style={styles.formControl}>
                                        <Text>Placa del automovil:</Text>
                                        <TextInput mode="outlined" onChangeText={(value) => { setPlaca(value) }} />
                                    </View>

                                    <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
                                        <Button style={{ flex: 2 }} mode="elevated" onPress={() => { registrarAutomovil() }}>Registrar Automovil</Button>
                                        <Button style={{ flex: 1 }} mode="elevated" onPress={() => { setModalVisible(!modalVisible) }}>Cancelar</Button>
                                    </View>
                                </ScrollView>
                            </Card.Content>
                        </Card>
                    </View>
                </View>
            </Modal>

            <Button style={{ marginVertical: 25 }} mode="elevated" onPress={() => { setModalVisible(!modalVisible) }}>Registrar Servicio</Button>
        </View>
    );
}
const styles = StyleSheet.create({
    cardContent: {
        width: '100%',
        backgroundColor: '#FAF3F0',
    },
    formControl: {
        marginTop: 10
    },
    vistaModal: {
        flex: 1,
        width: 'auto',
        backgroundColor: '#000000aa',

    },
    Modal: {

        backgroundColor: '#fff',
        margin: 10,
        padding: 20,
        borderRadius: 10,

    },
});