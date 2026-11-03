import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ==================== TIPOS ====================
type Registro = {
  id: string;
  numero: number;
  hora: string;
};

// ==================== COLORES ====================
const colores = {
  fondo: '#f4f7f6',
  tarjeta: '#ffffff',
  titulo: '#2c3e50',
  texto: '#555555',
  textoTabla: '#333333',
  contador: '#1776b6',
  boton: '#2ecc71',
  botonTexto: '#ffffff',
  borde: '#e0e0e0',
  cabeceraTabla: '#f8f9fa',
  cabeceraTexto: '#7f8c8d',
  filaPar: '#fafafa',
};

// ==================== FUNCIONES AUXILIARES ====================
function formatearHora(fecha: Date = new Date()): string {
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getSeconds()).padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
}

// ==================== PANTALLA ====================
export default function App() {
  // Estado
  const [contador, setContador] = useState(0);
  const [registros, setRegistros] = useState<Registro[]>([]);

  // Lógica
  const incrementarContador = () => {
    const nuevoContador = contador + 1;

    const nuevoRegistro: Registro = {
      id: Date.now().toString(),
      numero: nuevoContador,
      hora: formatearHora(),
    };

    setContador(nuevoContador);
    setRegistros((anteriores) => [nuevoRegistro, ...anteriores]); // más reciente primero
  };

  // Interfaz
  return (
    <View style={estilos.pantalla}>
      <View style={estilos.tarjeta}>
        {/* Título y descripción */}
        <Text style={estilos.titulo}>Interactividad con el DOM</Text>
        <Text style={estilos.descripcion}>
          Haz clic en el botón para incrementar el contador y registrar la hora
          exacta del evento en la tabla.
        </Text>

        {/* Contador */}
        <Text style={estilos.contador}>{contador}</Text>

        {/* Botón */}
        <TouchableOpacity style={estilos.boton} onPress={incrementarContador}>
          <Text style={estilos.botonTexto}>¡Haz Clic Aquí!</Text>
        </TouchableOpacity>

        {/* Tabla */}
        <View style={estilos.tabla}>
          <View style={estilos.cabecera}>
            <Text style={[estilos.th, estilos.colNumero]}>Nº Clic</Text>
            <Text style={[estilos.th, estilos.colHora]}>Hora</Text>
          </View>

          <ScrollView style={estilos.cuerpo}>
            {registros.map((item, index) => (
              <View
                key={item.id}
                style={[estilos.fila, index % 2 === 0 && estilos.filaPar]}
              >
                <Text style={[estilos.td, estilos.colNumero]}>{item.numero}</Text>
                <Text style={[estilos.td, estilos.colHora]}>{item.hora}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

// ==================== ESTILOS ====================
const estilos = StyleSheet.create({
  // Pantalla y tarjeta
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },

  // Textos
  titulo: {
    color: colores.titulo,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  descripcion: {
    color: colores.texto,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  contador: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colores.contador,
    marginVertical: 10,
  },

  // Botón
  boton: {
    backgroundColor: colores.boton,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: colores.boton,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
    width: '100%',
  },
  botonTexto: {
    color: colores.botonTexto,
    fontSize: 18,
    fontWeight: '600',
  },

  // Tabla
  tabla: {
    width: '100%',
    maxHeight: 220,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 6,
    overflow: 'hidden',
  },
  cabecera: {
    flexDirection: 'row',
    backgroundColor: colores.cabeceraTabla,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  cuerpo: {
    maxHeight: 170,
  },
  fila: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
    backgroundColor: colores.tarjeta,
  },
  filaPar: {
    backgroundColor: colores.filaPar,
  },
  th: {
    color: colores.cabeceraTexto,
    fontWeight: '600',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  td: {
    color: colores.textoTabla,
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  colNumero: { flex: 1 },
  colHora: { flex: 1.5 },
});