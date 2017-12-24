import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import client from './client';

export default class extends React.Component {
    setText = text => {
        this.setState({ text });
    }
    render() {
        return (
            <View>
                <Text>Control</Text>
                <Text>Mouse control</Text>
                <View style={{ flexDirection: 'row' }} >
                    <Button title="Left" onPress={() => { client.mouseMove(-5, 0); }} />
                    <View>
                        <Button title="Top" onPress={() => { client.mouseMove(0, -5); }} />
                        <Button title="Bottom" onPress={() => { client.mouseMove(0, 5); }} />
                    </View>
                    <Button title="Right" onPress={() => { client.mouseMove(5, 0); }} />
                </View>
                <View style={{ flexDirection: 'row' }} >
                    <Button title="LMB" onPress={() => { client.mouseClick('1'); }} />
                    <Button title="RMB" onPress={() => { client.mouseClick('3'); }} />
                </View>
                <TextInput
                    placeholder="Type to the screen"
                    value={this.state.text}
                    onChange={e => {
                        this.setText(e.nativeEvent.text);
                    }} />
                <Button title="Send command" onPress={async () => {
                    await client.type(this.state.text);
                    this.setText('');
                }} />
            </View>
        );
    }
};