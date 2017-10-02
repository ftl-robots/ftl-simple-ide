import Promise from 'promise';
import PromiseRejectionTracking from 'promise/lib/rejection-tracking';
import uuidv4 from 'uuid/v4';
import ee from 'event-emitter';
import IO from 'socket.io-client';

PromiseRejectionTracking.enable();

const TIMEOUT_DURATION = 2000;

const FAKE_EXAMPLE_DATA = [
    {
        metadata: {
            id: 'simple-robot',
            text: 'Simple Robot',
            description: 'A simple robot'
        },
        content: "// I am a Simple Robot"
    },
    {
        metadata: {
            id: 'iterative-robot',
            text: 'Iterative Robot',
            description: 'An iterative robot'
        },
        content: "// I am an Iterative Robot"
    }
];

const FAKE_FILE = "public class TestRobot {\n}\n";

class RemoteAPI {
    constructor() {
        console.log('RemoteAPI initialized');

        this.socket = null;
        this.initialized = false;
        this.requestCallbacks = {};

        this.identifier = null;
        this.offline = true;
    }

    initialize(offline) {
        // Create socket and hook up events
        if (!offline) {
            this.socket = IO.connect('http://localhost:3001');
            this.socket.on('response', this.handleResponse.bind(this));

            // Config and other out of band messages
            this.socket.on('registration', (newId) => {
                if (this.identifier !== null) {
                    console.warn('Already have an identifier, server could have died. Sending a recap');
                    // TODO Send Recap
                }
                else {
                    this.identifier = newId;
                    console.log('Got registration message: ', newId);
                    //Send a workspace init
                    this.sendRequest('createWorkspace', { sessionId: newId })
                    .then(() => {
                        // Finish up the rest of initialization
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                }
            });

            this.socket.on('clientStatus', (clientState) => {
                this.emit('clientStatusUpdated', clientState);
            });

            this.socket.on('connect', () => {
                this.emit('apiConnected');
                this.offline = false;
            });

            this.socket.on('disconnect', () => {
                this.emit('apiDisconnected');
                this.offline = true;
            });

            // Occurs when a file is changed on the backend, e.g. load example
            this.socket.on('fileUpdated', (update) => {
                this.emit('fileUpdated', update);
            });
        }
        else {
            this.initializeOffline();
        }

        this.initialized = true;
    }

    initializeOffline() {
        this.socket = {
            on: () => {},
            off: () => {},
            emit: () => {}
        };

        this.identifier = 'OFFLINE';
        console.log('firing fileUpdated');
        this.emit('fileUpdated', {
            content: FAKE_FILE
        });
    }

    sendRequest(request) {
        return new Promise((resolve, reject) => {
            var reqGuid = uuidv4();
            var reqObj = {
                guid: reqGuid,
                payload: request
            };

            var timeoutToken = setTimeout(() => {
                reject({
                    guid: reqGuid,
                    payload: {
                        reason: 'Request Timed Out'
                    }
                });
            }, TIMEOUT_DURATION);

            this.requestCallbacks[reqGuid] = (response) => {
                if (timeoutToken) {
                    clearTimeout(timeoutToken);
                    timeoutToken = undefined;
                }

                if (response.success) {
                    resolve({
                        guid: response.guid,
                        payload: response.payload
                    });
                }
                else {
                    reject({
                        guid: response.guid,
                        payload: response.payload
                    });
                }

                if (this.socket) {
                    this.socket.emit('request', reqObj);
                }
                else {
                    console.error('Socket not ready');
                }
            };
        });
    }

    // Public API
    
    getExamples() {
        if (!this.offline) {
            return this.sendRequest('getExamples', {})
            .then((exampleList) => {
                return exampleList.payload;
            })
            .catch((err) => {
                // Return fake data
                return FAKE_EXAMPLE_DATA;
            });
        }
        else {
            return Promise.resolve(FAKE_EXAMPLE_DATA);
        }
    }

    // This will automatically generate a fileUpdated event on the socket
    loadExample(exampleId) {
        if (!this.offline) {
            return this.sendRequest('loadExample', {
                exampleId: exampleId
            });
        }
        else {
            var fileContent;
            for (var i = 0; i < FAKE_EXAMPLE_DATA.length; i++) {
                if (FAKE_EXAMPLE_DATA[i].metadata.id === exampleId) {
                    fileContent = FAKE_EXAMPLE_DATA[i].content;
                }
            }

            if (fileContent) {
                this.emit('fileUpdated', {
                    content: fileContent
                });
            }
        }
    }

    // This will automatically generate a fileUpdated event on the socket
    loadWorkspace(sessionId) {
        return this.sendRequest('loadWorkspace', {
            sessionId: sessionId
        });
    }

    getRemoteFile() {
        if (!this.offline) {
            this.sendRequest('getRemoteFile', {})
            .then((getResp) => {
                return {
                    content: getResp.payload.content
                }
            })
        }
        else {
            return Promise.resolve(FAKE_FILE);
        }
    }

    // We really only modify TestRobot.java
    updateRemoteFile(fileContents) {
        this.sendRequest('updateRemoteFile', {
            contents: fileContents
        })
        .then((updateResp) => {
            return {
                ok: true,
            }
        })
        .catch((err) => {
            return {
                ok: false,
            }
        });
    }
}

ee(RemoteAPI.prototype);

const APIInstance = new RemoteAPI();

export default APIInstance;