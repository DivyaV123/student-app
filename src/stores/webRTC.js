import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios';
import * as mediasoupClient from "mediasoup-client";
import Bowser from "bowser";
import dayjs from 'dayjs';
import { io } from "socket.io-client";
import { useMainStore } from '@/stores/main'
import { sessionStore } from '@/stores/session'
import DetectRTC from "detectrtc";
const VIDEO_CONSTRAINS = {
    qvga: { width: { ideal: 320 }, height: { ideal: 240 } },
    vga: { width: { ideal: 640 }, height: { ideal: 480 } },
    hd: { width: { ideal: 1280 }, height: { ideal: 720 } },
};
const PC_PROPRIETARY_CONSTRAINTS = {
    // optional: [{ googDscp: true }],
};

// Used for simulcast webcam video.
const WEBCAM_SIMULCAST_ENCODINGS = [
    { scaleResolutionDownBy: 4, maxBitrate: 500000 },
    { scaleResolutionDownBy: 2, maxBitrate: 1000000 },
    { scaleResolutionDownBy: 1, maxBitrate: 5000000 },
];

// Used for VP9 webcam video.
const WEBCAM_KSVC_ENCODINGS = [{ scalabilityMode: "S3T3_KEY" }];

// Used for simulcast screen sharing.
const SCREEN_SHARING_SIMULCAST_ENCODINGS = [
    { dtx: true, maxBitrate: 1500000 },
    { dtx: true, maxBitrate: 6000000 },
];

// Used for VP9 screen sharing.
const SCREEN_SHARING_SVC_ENCODINGS = [{ scalabilityMode: "S3T3", dtx: true }];
const browser = Bowser.getParser(window.navigator.userAgent);
let audioContext = null;
export const webrtcStore = defineStore('webrtc', {
    state: () => ({
        room: '',
        joined: false,
        role: null,
        audio: false,
        video: false,
        record: false,
        screen: false,
        muteAll: false,
        muteUser: false,
        muteRoom: false,
        broadcastRoom: false,
        broadcastVideo: null,
        broadcastStream:  new Map(),
        broadcastVideoPaused: false,
        bAudioID: null,
        bVideoID: null,
        trainer: false,
        chat: false,
        exit: false,
        rtpCapabilities: null,
        device: null,
        producerTransport: null,
        consumerTransports: [],
        producer: null,
        consumer: null,
        consumers: new Map(),
        producers: new Map(),
        forceH264: false,
        forceVP9: false,
        useSimulcast: true,
        useSharingSimulcast: false,
        consumerTransport: null,
        roomUsers: [],
        socket: null,
        localVideo:  new Map(),
        producerLabel: new Map(),
        remoteTracks: new Map(),
        deletedTracks: new Map(),
        videoCount: 0, 
        setNewMessage: false,
        checkRTC: null,
        trainerJoined: false,
        trainerAudio: false,
        trainerVideo: false,

    }),
    actions: {
        async connectSocket(url) {
            try {
                this.socket = io(url, { transports: ["websocket"] });
                return true
            } catch (err) {
                return false
            }
        },
        async getWebRtc(){
            var that = this
            DetectRTC.load(async function() {
                that.checkRTC = DetectRTC
            });
        },
        async socketResponses() {
            const theme = useMainStore();
            this.socket.on("newUser", (data) => {
                let found = false;
                if (data.role === "trainer") {
                    this.trainerJoined = true;
                }
                for (var i = 0; i < this.roomUsers.length; i++) {
                    let user = this.roomUsers[i]
                    if (user.userID == data.userID) {
                        user.connected = true;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.roomUsers.push(data);
                    theme.pushMessage(`New user connected ${data.name}`)
                }
            });
            this.socket.on("userDisconnected", (data) => {
                for (var i = 0; i < this.roomUsers.length; i++) {
                    let user = this.roomUsers[i]
                    if (user.userID == data.userID) {
                        if (user.role === "trainer") {

                            this.trainerJoined = false;
                        }
                        user.connected = false;
                    }
                }
            });
            this.socket.on("newProducers", async (producers) => {
                for (let producer of producers.producerList) {
                    await this.connectRecvTransport(producer.producerId, producer.name, producer.userID)
                }
            });
            this.socket.on("new-producer", (data) =>
                this.connectRecvTransport(data.producerId, data.name, data.userID)
            );
            this.socket.on("producer-closed", async ({ cid }) => {
                await this.removeConsumer(cid)
            }
            );
            this.socket.on("producer-closed", async ({ cid }) => {
                await this.removeConsumer(cid)
            }
            );

            this.socket.on("muteRoom", async () => {
                this.muteRoom = true
                this.closeProducer("audio", true)
                theme.pushMessage('Trainer has disabled the microphone for this classroom!')
            }
            );
            this.socket.on("unmuteRoom", async () => {
                theme.pushMessage('Trainer has enabled the microphone for this classroom!')
                this.muteRoom = false
            }
            );
            this.socket.on("muteUser", async () => {
                this.muteUser = true
                this.closeProducer("audio", true)
                theme.pushMessage('Trainer has disabled the microphone for you!')
            }
            );
            this.socket.on("unmuteUser", async () => {
                theme.pushMessage('Trainer has enabled the microphone for you!')
                this.muteUser = false
            }
            );
            this.socket.on("disconnect", async () => {
                this.joined = false
            }
            );
            // chat messages
            this.socket.on("newMessage", ({ content, date, from, to }) => {
                // console.log(content, from)
                for (var i = 0; i < this.roomUsers.length; i++) {
                  let user = this.roomUsers[i];
                  if (user.userID == from) {
                    if (this.checkRTC.osName !== "Apple") {
                      var notification = new Notification(user.name, {
                        body: content,
                        silent: true,
                      });
                      setTimeout(notification.close.bind(notification), 2500);
                    }
                    user.messages.push({
                      content,
                      date,
                      from,
                    });
                    // let newUser = this.users[i];
                    user.hasNewMessages = true;
                    this.roomUsers.splice(i, 1);
                    this.roomUsers.unshift(user);
                    this.setNewMessage = true;
                    break;
                  }
                }
              });
              this.socket.on("dupMessage", ({ content, date, from, to }) => {
                for (var i = 0; i < this.roomUsers.length; i++) {
                let user = this.roomUsers[i];
                  if (user.userID == to) {
                    user.messages.push({
                      content,
                      date,
                      from,
                    });
                    break;
                  }
                }
              });


        },
        async socketRequest(type, data = {}) {
            return new Promise((resolve, reject) => {
                this.socket.emit(type, data, (data) => {
                    if (data.error) {
                        reject(data.error)
                    } else {
                        resolve(data)
                    }
                })
            })
        },
 

        async joinRoom(room) {
            const user = sessionStore();

        
            if (user.user.role=== "trainer") {
                this.role = 'trainer'
            } else if (user.user.role === "student") {
  
            
                this.role = 'student'
            }
            // this.role = user.user.groups.map(group => {
            //     return group.name;
            // })
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
            this.room = room
            const data = await this.socketRequest(
                "joinRoom",
                { roomName: room, userID: user.user.uid, username: user.user.username, role: this.role })
            if(data.muted){
                this.muteAll = true
                if(this.role === 'student'){
                this.muteRoom = true
                }
                user.pushMessage("Please note, trainer has disabled the microphone for this classroom")
            }
            if(data.userMuted){
                this.muteUser = true
                this.closeProducer("audio", true)
                user.pushMessage("Please note, trainer has disabled the microphone for you.")
            }
            this.rtpCapabilities = data.rtpCapabilities;
            this.device = new mediasoupClient.Device();
            await this.device.load({
                // see getRtpCapabilities() below
                routerRtpCapabilities: this.rtpCapabilities,
            });
            await this.initProducerTransport()
            await this.initConsumerTransport()
            await this.getRoomUsers()
            await this.getRoomProducers()
            this.socketResponses()
            this.joined = true
            return true
        },
        async initProducerTransport() {
            const { params } = await this.socketRequest(
                "createWebRtcTransport",
                { consumer: false })
            if (params.error) {
                console.log(params.error);
                return;
            }
            params.proprietaryConstraints = PC_PROPRIETARY_CONSTRAINTS;
            this.producerTransport = await this.device.createSendTransport(params);

            this.producerTransport.on(
                "connect",
                async ({ dtlsParameters }, callback, errback) => {
                    try {
                        await this.socket.emit("transport-connect", {
                            dtlsParameters,
                        });
                        callback();
                    } catch (error) {
                        errback(error);
                    }
                }
            );

            this.producerTransport.on(
                "produce",
                async (parameters, callback, errback) => {
                    try {
                        await this.socket.emit(
                            "transport-produce",
                            {
                                kind: parameters.kind,
                                rtpParameters: parameters.rtpParameters,
                                appData: parameters.appData,
                            },
                            ({ id, producersExist }) => {
                                callback({ id });
                            }
                        );
                    } catch (error) {
                        errback(error);
                    }
                }
            );
            this.producerTransport.on("connectionstatechange", function (state) {
                switch (state) {
                    case "connecting":
                        break;

                    case "connected":
                        break;

                    case "failed":
                        this.producerTransport.close();
                        break;

                    default:
                        break;
                }
            });
        },

        async initConsumerTransport() {
            const { params } = await this.socketRequest(
                "createWebRtcTransport",
                { consumer: true })

            if (params.error) {
                console.log(params.error);
                return;
            }

            try {
                this.consumerTransport = await this.device.createRecvTransport(params);

            } catch (error) {
                console.log(error);
                return;
            }

            this.consumerTransport.on(
                "connect",
                async ({ dtlsParameters }, callback, errback) => {
                    try {
                        await this.socket.emit("transport-recv-connect", {
                            dtlsParameters,
                            serverConsumerTransportId: this.consumerTransport.id,
                        });
                        callback();
                    } catch (error) {
                        errback(error);
                    }
                }
            );
        },
        async getRoomUsers() {
            const roomUsers = await this.socketRequest("roomUsers", { roomName: this.room, role: this.role })
            this.roomUsers = roomUsers.users
        },
        async getRoomProducers() {
            const roomProducers = await this.socketRequest("getProducers")
            for (let producer of roomProducers.producerList) {
                await this.connectRecvTransport(producer.producerId, producer.name, producer.userID)
            }
        },

        async connectRecvTransport(remoteProducerId, name, userID) {
            var that = this
            console.log(remoteProducerId)
            this.getConsumeStream(remoteProducerId).then(
                function ({ consumer, stream, kind }) {
                    that.consumers.set(consumer.id, consumer)
                    that.remoteTracks.set("media", { stream: stream, type: kind, id: consumer.id })
                    that.socketRequest("consumer-resume", {
                        serverConsumerId: consumer.id,
                    });

                    consumer.on(
                        'trackended',
                        function () {
                            console.log("trackended")
                            this.removeConsumer(consumer.id)
                        }.bind(this)
                    )

                    consumer.on(
                        'transportclose',
                        function () {
                            console.log("transportclose")
                            this.removeConsumer(consumer.id)
                        }.bind(this)
                    )

                    for (var i = 0; i < that.roomUsers.length; i++) {
                        let user = that.roomUsers[i]
                        if (user.userID == userID) {
                            if (kind === "audio") {
                                user.aid = consumer.id
                            }
                            if (kind === "video") {
                                user.vid = consumer.id
                            }

                            break;
                        }
                    }
                }

            )

        },
        async startRecording(){
            this.record = true
            this.socketRequest('startRecording', {})

        },
        async stopRecording(){
            this.record = false
            this.socketRequest('stopRecording', {})

        },
        async playSafariAudio(){
            await audioContext.resume()
            console.log("audioContext",audioContext)
        },

        async pauseCastRoom(){
            // await this.closeProducer("audio",true)
            this.broadcastVideo.pause();
            // await this.pauseProducerID(this.bAudioID,"audio")
            // await this.pauseProducerID(this.bVideoID,"video")
            this.broadcastVideoPaused = true
        },
        async resumeCastRoom(){
            // await this.closeProducer("audio",true)
            this.broadcastVideo.play();
            // await this.resumeProducerID(this.bAudioID,"audio")
            // await this.resumeProducerID(this.bVideoID,"video")
            this.broadcastVideoPaused = false
        },
        async castRoom(){
            await this.closeProducer("audio",true)
            this.broadcastRoom = false
            this.broadcastVideo.pause();
            this.broadcastVideo = null
            await this.closeProducerID(this.bAudioID,"audio")
            await this.closeProducerID(this.bVideoID,"video")
            this.broadcastStream.delete("media")
            this.bAudioID = null
            this.bVideoID = null
            console.log("cast room");
        },
        async uncastRoom(){
            await this.closeProducer("audio",true)
            await this.closeProducer("screen",true)
            this.broadcastRoom = true
            this.broadcastVideo = document.createElement('video')
            this.broadcastVideo.src = "/videos/video1.webm"
            this.broadcastVideo.playsInline = true
            this.broadcastVideo.autoplay = true
            this.broadcastVideo.preload = 'auto'
            this.broadcastVideo.loop = false
            this.broadcastVideo.oncanplay = () => {
                const stream = this.broadcastVideo.captureStream()
                this.broadcastStream.set("media", { stream: stream, type: "video", id: "broadcast" })
                // this.broadcastStream = stream
                if (stream) {
                   const videoTrack = stream.getVideoTracks()[0]
                   this.addVideoTrack(videoTrack,"video")
                   const audioTracks = stream.getAudioTracks()
                   if (audioTracks.length>0) {
                   const audioTrack = audioTracks[0]
                   this.addAudioTrack(audioTrack,"audio")
                   }  
             }
            }
            console.log("uncast room");
        },

        async addVideoTrack(track,type){
            const theme = useMainStore();
            try{
                let producer = await this.producerTransport.produce({track})

                this.producers.set(producer.id, producer)
                this.bVideoID = producer.id
                // if (!audio) {
                //     this.localVideo = stream
                   
                // }

                producer.on('trackended', async () => {
                    await this.closeProducerID(this.bVideoID,"video")
                })

                producer.on('transportclose', () => {
                    if (!this.audio) {
                        track.stop();
                        this.broadcastStream.delete("media")
                    }
                    this.producers.delete(producer.id)
                })

                producer.on('close', () => {
                    console.log('Closing producer')
                    if (!audio) {
                        track.stop();
                        // this.localVideo.getTracks().forEach(function (track) {
                        //     track.stop()
                        // })
                        this.broadcastStream.delete("media")
                    }
                    this.producers.delete(producer.id)
                })
                // this.producerLabel.set(type, producer.id)
            }catch (err) {
                console.log(err)
                    text: err,
                    theme.pushMessage("Please check audio/video permission in the browser." + err)
            }
        },
        async addAudioTrack(track, type){
            const theme = useMainStore();
            try{
                let producer = await this.producerTransport.produce({track})

                this.producers.set(producer.id, producer)
                this.bAudioID = producer.id
                // if (!audio) {
                //     this.localVideo = stream
                   

                // }

                producer.on('trackended', async () => {
                    await this.closeProducerID(this.bAudioID,"audio")

                    // this.closeProducer(type)
                })

                producer.on('transportclose', () => {
                    if (!this.audio) {
                        track.stop();
                        // this.localVideo.getTracks().forEach(function (track) {
                        //     track.stop()
                        // })
                        // this.localVideo = null
                    }
                    this.producers.delete(producer.id)
                })

                producer.on('close', () => {
                    console.log('Closing producer')
                    if (!audio) {
                        track.stop();
                        // this.localVideo.getTracks().forEach(function (track) {
                        //     track.stop()
                        // })
                        // this.localVideo = null
                    }
                    this.producers.delete(producer.id)
                })
                // this.producerLabel.set(type, producer.id)
            }catch (err) {
                theme.pushMessage("Please check audio/video permission in the browser." + err)

            }
        },
        async getConsumeStream(remoteProducerId) {
            const data = await this.socketRequest('consume', {
                rtpCapabilities: this.device.rtpCapabilities,
                remoteProducerId,
                serverConsumerTransportId: this.consumerTransport.id,

            })

            const { params } = data
            let codecOptions = {}
            const consumer = await this.consumerTransport.consume({
                id: params.id,
                producerId: params.producerId,
                kind: params.kind,
                rtpParameters: params.rtpParameters,
                codecOptions
            })
            const { track } = consumer;
            const stream = new MediaStream()
            stream.addTrack(track)
            if (params.kind === 'video') {
                this.videoCount=this.videoCount+1
            }
            if (params.kind === 'audio') {
                // const audioTrack = audioContext.createMediaStreamSource(stream);
                // var audioDestination = audioContext.createMediaStreamDestination();
                // const gainNode = audioContext.createGain();
                // audioTrack.connect(audioDestination)
                // gainNode.connect(audioContext.destination);
                // console.log("New Audio incoming")
                var audio = new Audio();
                audio.srcObject = stream;
                audio.muted = true;
                var gainNode = audioContext.createGain();
                gainNode.gain.value = 0.9;
                audio.onloadedmetadata = function () {
                    var source = audioContext.createMediaStreamSource(audio.srcObject);
                    audio.play();
                    source.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                }
            }


            return {
                consumer,
                stream,
                kind: params.kind
            }
        },

        async produce(type) {
            const theme = useMainStore();
            if (this.producerLabel.has(type)) {
                // console.log('Producer already exists for this type ' + type)
                this.resumeProducer(type)
                return

            }
            let mediaConstraints = {}
            let audio = false
            let screen = false
            switch (type) {
                case "audio":
                    mediaConstraints = {
                        audio: {
                            sampleSize: 16,
                            channelCount: 2,
                            autoGainControl: false,
                            noiseSuppression: true,
                            echoCancellation: false
                        },
                        video: false
                    }
                    // mediaConstraints = {
                    //     audio: true,
                    //     video: false
                    // }
                    this.audio = true
                    audio = true
                    break
                case "video":
                    mediaConstraints = {
                        audio: false,
                        video: {
                            width: {
                                min: 640,
                                ideal: 1280
                            },
                            height: {
                                min: 400,
                                ideal: 720
                            },
                        }
                    }
                    this.video = true
                    break
                case "screen":
                    mediaConstraints = false
                    this.screen = true
                    screen = true
                    break
                default:
                    return
            }
            if (!this.device.canProduce('video') && !audio) {
                console.error('Cannot produce video')
                return
            }
            let stream
            try {
                stream = screen
                    ? await navigator.mediaDevices.getDisplayMedia({
                        video: {
                            width: 1920,
                            height: 1080
                        }
                    })
                    : await navigator.mediaDevices.getUserMedia(mediaConstraints)

                const track = audio ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0]
                const params = {
                    track
                }
                if (audio) {
                    // params.encodings = [{ maxBitrate: 40000, dtx: true }]
                    params.codecOptions = {
                        opusStereo: true,
                        opusFec: true,
                        opusDtx: false,
                    }
                }
                if (screen) {
                    let encodings;
                    let codec;
                    const codecOptions = {
                        videoGoogleStartBitrate: 1000,
                    };
                    if (this.forceH264) {
                        codec = this.device.rtpCapabilities.codecs.find(
                            (c) => c.mimeType.toLowerCase() === "video/h264"
                        );

                        if (!codec) {
                            throw new Error(
                                "desired H264 codec+configuration is not supported"
                            );
                        }
                    } else if (this.forceVP9) {
                        codec = this.device.rtpCapabilities.codecs.find(
                            (c) => c.mimeType.toLowerCase() === "video/vp9"
                        );

                        if (!codec) {
                            throw new Error("desired VP9 codec+configuration is not supported");
                        }
                    }
                    params.codec = codec
                    if (this.useSharingSimulcast) {
                        // If VP9 is the only available video codec then use SVC.
                        const firstVideoCodec =
                            this.device.rtpCapabilities.codecs.find(
                                (c) => c.kind === "video"
                            );

                        if (
                            (this.forceVP9 && codec) ||
                            firstVideoCodec.mimeType.toLowerCase() === "video/vp9"
                        ) {
                            encodings = SCREEN_SHARING_SVC_ENCODINGS;
                        } else {
                            encodings = SCREEN_SHARING_SIMULCAST_ENCODINGS.map((encoding) => ({
                                ...encoding,
                                dtx: true,
                            }));
                        }
                    }
                    params.encodings = encodings

                }
                if (!audio && !screen) {
                    let codec;
                    let encodings;
                    if (this.forceH264) {
                        codec = this.device.rtpCapabilities.codecs.find(
                            (c) => c.mimeType.toLowerCase() === "video/h264"
                        );

                        if (!codec) {
                            throw new Error(
                                "desired H264 codec+configuration is not supported"
                            );
                        }
                    } else if (this.forceVP9) {
                        codec = this.device.rtpCapabilities.codecs.find(
                            (c) => c.mimeType.toLowerCase() === "video/vp9"
                        );

                        if (!codec) {
                            throw new Error("desired VP9 codec+configuration is not supported");
                        }
                    }

                    params.encodings = [
                        {
                            rid: 'r0',
                            maxBitrate: 100000,
                            //scaleResolutionDownBy: 10.0,
                            scalabilityMode: 'S1T3'
                        },
                        {
                            rid: 'r1',
                            maxBitrate: 300000,
                            scalabilityMode: 'S1T3'
                        },
                        {
                            rid: 'r2',
                            maxBitrate: 900000,
                            scalabilityMode: 'S1T3'
                        },

                    ]
                    params.codecOptions = {
                        videoGoogleStartBitrate: 1000
                    }
                    params.codec = codec
                }
                let producer = await this.producerTransport.produce(params)

                this.producers.set(producer.id, producer)

                if (!audio) {
                    this.localVideo.set("media", { stream: stream, type: "video", id: "localvideo" })
                }

                producer.on('trackended', () => {
                    this.closeProducer(type)
                })

                producer.on('transportclose', () => {
                    if (!this.audio) {
                        this.localVideo.getTracks().forEach(function (track) {
                            track.stop()
                        })
                        this.localVideo.delete("media")
                    }
                    this.producers.delete(producer.id)
                })

                producer.on('close', () => {
                    console.log('Closing producer')
                    if (!audio) {
                        this.localVideo.getTracks().forEach(function (track) {
                            track.stop()
                        })
                        this.localVideo.delete("media")
                    }
                    this.producers.delete(producer.id)
                })
                this.producerLabel.set(type, producer.id)

            } catch (err) {
                console.log(err)
                switch (type) {
                    case "audio":
                        this.audio = false
                        break
                    case "video":
                        if(this.videoCount > 0){
                            this.videoCount = this.videoCount-1
                        }
                        this.video = false
                        break
                    case "screen":
                        if(this.videoCount > 0){
                            this.videoCount = this.videoCount-1
                        }
                        this.screen = false
                        break
                    default:
                        return
                }
                theme.pushMessage("Please check audio/video permission in the browser." + err)
            }

        },
        async closeProducer(type, force = false) {
            // console.log("closeProducer", type)
            if (!this.producerLabel.has(type)) {
                console.log('There is no producer for this type ' + type)
                return
            }
            // if (type === 'audio' && !force) {
            //     this.pauseProducer('audio')
            //     return
            // }
            if((type === 'audio') && this.producerLabel.get(type) && !force){
                this.pauseProducer(type)
                return
            }
           
            let producer_id = this.producerLabel.get(type)
            this.socketRequest("producer-close", {
                producerId: producer_id,
            });

            await this.producers.get(producer_id).close()
            this.producers.delete(producer_id)
            this.producerLabel.delete(type)

            if (type !== "audio") {
                let track = this.localVideo.get("media")
                track.stream.getTracks().forEach(function (track) {
                    track.stop()
                })
                this.localVideo.delete("media")
            }

            switch (type) {
                case "audio":
                    this.audio = false
                    break
                case "video":
                    if(this.videoCount > 0){
                        this.videoCount = this.videoCount-1
                    }
                    this.video = false
                    break
                case "screen":
                    if(this.videoCount > 0){
                        this.videoCount = this.videoCount-1
                    }
                    this.screen = false
                    break
                default:
                    return
            }
        },

        async closeProducerID(producer_id, type) {
            
            try{
                this.socketRequest("producer-close", {
                    producerId: producer_id,
                });
                await this.producers.get(producer_id).close()
                this.producers.delete(producer_id)

            }catch(err){
                console.log("Error",err)
            }

            if (type !== "audio") {
                let track = this.broadcastStream.get("media")
                track.stream.getTracks().forEach(function (track) {
                    track.stop()
                })
                this.localVideo.delete("media")
            }

        },

        pauseProducer(type) {
            if (!this.producerLabel.has(type)) {
                console.log('There is no producer for this type ' + type)
                return
            }

            let producer_id = this.producerLabel.get(type)
            this.producers.get(producer_id).pause()
            switch (type) {
                case "audio":
                    this.audio = false
                    break
                case "video":
                    this.video = false
                    break
                case "screen":
                    this.screen = false
                    break
                default:
                    return
            }
        },
        async pauseProducerID(producer_id, type) {
            try{
                this.producers.get(producer_id).pause()

            }catch(err){
                console.log("error",err)
            }

        },

        resumeProducer(type) {
            if (!this.producerLabel.has(type)) {
                console.log('There is no producer for this type ' + type)
                return
            }

            let producer_id = this.producerLabel.get(type)
            this.producers.get(producer_id).resume()
            switch (type) {
                case "audio":
                    this.audio = true
                    break
                case "video":
                    this.video = true
                    break
                case "screen":
                    this.screen = true
                    break
                default:
                    return
            }
        },
        async resumeProducerID(producer_id,type) {
            try{
                this.producers.get(producer_id).resume()
            }catch(err){
                console.log("error",err)
            }

        },

        async removeConsumer(consumer_id) {
            try {
                // if (this.remoteTracks.get(consumer_id)) {
                //     let track = this.remoteTracks.get(consumer_id)
                //     await track.stream.getTracks().forEach(function (track) {
                //         track.stop()
                //     })
                // }
                this.consumers.delete(consumer_id)
                this.deletedTracks.set(consumer_id, consumer_id)
                // this.remoteTracks.delete(consumer_id)
                for (var i = 0; i < this.roomUsers.length; i++) {
                    let user = this.roomUsers[i]
                    if (user.aid === consumer_id) {
                        user.aid = null
                        break;
                    }
                    if (user.vid === consumer_id) {
                        user.vid = null
                        break;
                    }
                }
                return true

            } catch (err) {
                console.log("error", err)
            }

        },
        //chat operations
        async chatToggle() {
            this.chat = !this.chat
            this.setNewMessage = false
        },
        async setMessageFalse() {
            this.setNewMessage = false
        },
        async sendChatMessage(content, to) {
            this.socketRequest("newMessage", {
                content,
                date: dayjs().format('MMM D, h:mm A'),
                to: to,
              })
        },
        
        //remove media
        async removedMedia(id) {
            this.consumers.delete(id)
        },
        //generic operations
        async muteRoomTrainer() {
            this.socketRequest("muteRoom", {})
            this.muteAll = true

        },
        async unmuteRoomTrainer() {
            this.socketRequest("unmuteRoom", {})
            this.muteAll = false
        },
        async muteRoomUser(userID) {
            if (this.role === "trainer") {
                this.socketRequest("muteUser", { userID: userID });
                for (var i = 0; i < this.roomUsers.length; i++) {
                    let user = this.roomUsers[i]
                    if (user.userID == userID) {
                        user.muted = true;
                        break;
                    }
                }
            }
        },
        async unmuteRoomUser(userID) {
            if (this.role === "trainer") {
                this.socketRequest("unmuteUser", { userID: userID });
                for (var i = 0; i < this.roomUsers.length; i++) {
                    let user = this.roomUsers[i]
                    if (user.userID == userID) {
                        user.muted = false;
                        break;
                    }
                }
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(webrtcStore, import.meta.hot))
}