const control = async body => {
    await fetch('http://10.10.0.3:8080/command', {
        method: 'POST',
        body: JSON.stringify(body)
    });
};

export default {
    key: async key => await control({
        commandType: 'key',
        payload: key
    }),
    type: async text => await control({
        commandType: 'type',
        payload: text
    }),
    mouseMove: async (x, y) => await control({
        commandType: 'mouse-move',
        payload: `${x < 0 || y < 0 ? '--' : ''} ${x} ${y}`
    }),
    mouseClick: button => control({
        commandType: 'mouse-click',
        payload: button
    }),
};