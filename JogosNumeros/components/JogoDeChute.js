import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function JogoDeChute() {
    const [numeroSecreto, setNumeroSecreto] = useState(null);
    const [chute, setChute] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tentativas, setTentativas] = useState(0);
    const [jogoFinalizado, setJogoFinalizado] = useState(false);
    const [focado, setFocado] = useState(false);


    useEffect(() => {
        iniciarJogo();
    }, []);

    const iniciarJogo = () => {
        const numero = Math.floor(Math.random() * 100) + 1; // de 1 a 100
        setNumeroSecreto(numero);
        setTentativas(0);
        setMensagem('');
        setChute('');
        setJogoFinalizado(false);
    };

    const verificarChute = () => {
        const numero = parseInt(chute, 10);
        if (isNaN(numero) || numero < 1 || numero > 100) {
            setMensagem('Digite um número de 1 a 100.');
            return;
        }

        const novasTentativas = tentativas + 1;
        setTentativas(novasTentativas);

        if (numero === numeroSecreto) {
            setMensagem(`Acertou em ${novasTentativas} tentativa(s)! 🎉`);
            setJogoFinalizado(true);
        } else if (novasTentativas >= 5) {
            setMensagem(`Fim de jogo! O número era ${numeroSecreto} 😢`);
            setJogoFinalizado(true);
        } else {
            setMensagem(numero < numeroSecreto ? 'Muito baixo! 📉' : 'Muito alto! 📈');
        }

        setChute('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Qual o número de 1 a 100?</Text>
            <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder={focado ? '' : 'Digite seu chute'}
                value={chute}
                onChangeText={(text) => {
                    const somenteInteiro = text.replace(/[^0-9]/g, '');
                    setChute(somenteInteiro);
                }}
                onFocus={() => setFocado(true)}
                onBlur={() => setFocado(false)}
                editable={!jogoFinalizado}
                inputMode="numeric"
            />

            <Button title="Verificar" onPress={verificarChute} disabled={jogoFinalizado} />
            <Text style={styles.tentativas}>Tentativas: {tentativas} / 5</Text>
            <Text style={styles.mensagem}>{mensagem}</Text>
            {jogoFinalizado && <Button title="Jogar Novamente" onPress={iniciarJogo} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 60,
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        height: '100%',

    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        marginTop: 25,
    },
    input: {
        borderWidth: 2,
        borderColor: '#4682b4',
        padding: 10,
        width: 300,
        height: 80,
        textAlign: 'center',
        marginBottom: 50,
        marginTop: 60,
        borderRadius: 10,
        fontSize: 15,
        backgroundColor: '#fff',
    },
    tentativas: {
        marginTop: 40,
        fontSize: 18,
        color: '#555',
    },
    mensagem: {
        marginBottom: 10,
        marginTop: 25,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#008080',
    },
});
