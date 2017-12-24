import React from 'react';
import { View, Text, TextInput, Button, TouchableHighlight } from 'react-native';

import client from './client';

class MouseControlButton extends React.Component {
    componentWillMount() {
        this.setPressState(false);
    }
    setPressState = pressed => {
        this.setState({ pressed })
    }
    startPressHandler = () => {
        setTimeout(async () => {
            await this.props.onPress();
            console.log(this.state.pressed);
            if (this.state.pressed) {
                this.startPressHandler();
            }
        }, 100);
    }
    render = () => {
        const { title, } = this.props;

        return (
            <TouchableHighlight
                onPressIn={() => { this.setPressState(true); }}
                onPressOut={() => { this.setPressState(false); }}
                onLongPress={() => { this.startPressHandler(); }}>
                <View style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#FF7373',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{title}</Text>
                </View>
            </TouchableHighlight>);
    }
}

const xOffset = 5;
const yOffset = 5;

export default class extends React.Component {
    componentWillMount() {
        this.setText('');
    }
    setText = text => {
        this.setState({ text });
    }
    render() {
        return (
            <View>
                <Text>Control</Text>
                <Text>Mouse control</Text>
                <View style={{ flexDirection: 'row' }} >
                    <MouseControlButton
                        title="Left" onPress={async () => { await client.mouseMove(-xOffset, 0); }} />
                    <View>
                        <MouseControlButton
                            title="Top" onPress={async () => { await client.mouseMove(0, -yOffset); }} />
                        <MouseControlButton
                            title="Bottom" onPress={async () => { await client.mouseMove(0, yOffset); }} />
                    </View>
                    <MouseControlButton
                        title="Right" onPress={async () => { await client.mouseMove(xOffset, 0); }} />
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