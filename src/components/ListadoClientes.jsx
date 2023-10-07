import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput, Text, Card, DataTable } from "react-native-paper";

export function ListadoClientes({ item }) {

    return (
        <Card style={styles.container}>
            <Card.Content>
                <DataTable.Row><Text styles={styles.label} >Registro #{item.id}</Text></DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell> <Text style={styles.label}>Nombre:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.nombre}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Tipo automovil:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.tipo}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Servicio:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.servicio}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Placa:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.placa}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.label}>Color:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.color}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Año:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.anio}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.label}>Marca:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.marca}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Costo servicio:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.costo}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.label}>Propina:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.propina}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.label}>Impuesto:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.impuesto}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.label}>Pago Total:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.pago}</Text></DataTable.Cell>
                </DataTable.Row>

            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {

        marginVertical: 25,
        backgroundColor: '#FAF3F0',
    },
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    texto: {
        fontSize: 18,
        width: 'auto'
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

