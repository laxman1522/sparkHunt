"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = {
    FIREBASE_URL: 'https://sparkhunt-sirius-default-rtdb.firebaseio.com',
    SIRIUS_WALLET_IP: 'http://54.175.213.131:3001',
    GAME: {
        LEVELS: 27,
        PLAYING_STATUS: false,
        MAINTENANCE_STATUS: false,
        IS_TEAM_EVENT: false,
        ENABLE_LEADER_BOARD: true,
        ENABLE_MILESTONE: true,
        MILESTONE_LEVELS: [],
        ZONES: {}
    },
    SERVICES: {
        LOGIN: 'http://54.175.213.131:3001/user/login',
        USERS: 'siriushunt/users',
        GAME: 'siriushunt/game',
        DEVICE_TOKEN: 'siriushunt/deviceTokens',
        ANSWERS: 'siriushunt/answers',
        CLUES: 'siriushunt/clues',
        TEAMS: 'siriushunt/teams',
        CONFIG: 'siriushunt/config',
        RULES: 'siriushunt/rules',
        MILESTONE: 'siriushunt/milestone'
    },
    APIS: {
        LOGIN_USER: '/loginUser',
        GET_USER_DATA: '/getUser',
        CHECK_ANSWER: '/checkAnswer',
        GET_ACHIEVEMENTS: '/getAchievements',
        REGISTER_DEVICE_TOKEN: '/registerDeviceToken',
        GET_CLUES: '/getClues',
        GET_RULES: '/getRules',
        SYNC_CONFIG: '/syncConfig'
    },
    /*
    FIREBASE_SDK : {
        "type": "service_account",
        "project_id": "siriushunt-5c4f3",
        "private_key_id": "abec733d4258ee6b856b36839901413b1c0ba9fe",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCLsWls25IPG+Oy\ncVnC1xfFSmprLCOxkHPl77PruP3iMPUQc9qzaPugLgXryxrzj2YqJD2rfav/xZ7/\n21XNwQX5Igf1t+X4dRb1QDLFvj8fwBoKxUP4ljQ5VCcMlK01yHlcNIV3Zh5QqDFB\n4P8G2aX6OXB9ozYTr4tTj1gz3T9Z3jd91aeloB27Earr2X8hGvS5g3JiLi3rXjdI\nxIovJwX4aWDyi/4l3dpye93OF0Cm/B+h9TKb+H60kF35wJziCLuWf77Jbid50vVU\nn4yyU/48I0+frV+HHTIYQk7udq3CYz1Uhk8cVPEnm6c1F7Ph+tnMy73C6M+nw2JD\n1GKmGG3lAgMBAAECggEAF0FedekayGmh7yW4JfvVYPqJu1RCj++mn7eXOg2WtHZm\ngcnrtXTreOfYg//QuY3cmfTlEFzQSrj9RoZe4y04X5h2/0TRY9qoSwVYPnu0ugYq\nv7LF5UcqJAYapxlEOaEpdPxoYK9vKgnKA3fftOX8X+r6i2vll4LgnLVPH3k8b+sT\nyUO/OLKIp/291agBm4SbY2/Lm5FZkUNWM+9l3fGYRPHfwhCKNb9PNUCgyBIDE6pf\nq4NvOpY4e00OEYRT3FWNERqgMDNZbqEv8tfn/1n6vRheB/NplObG+Fua7hWbd5Ij\nUQ4o7Xg/49zsI0GfKKaX+FAeivNdMUZJ/F/xgMDi4QKBgQDE9J9ONPnyItFXVBKN\nxwjDTjHJYSf7X9X2WDcMwtNrbPzQpl862Gdp9BfotGDOJy924edFlEN7TRrFZ03h\nKm+LtrgR30RzJhNlrwVG5lu3nwDaWJNBmAbtPvEhh//VeSlwJ9jybTDiDIPwiesx\njE+hYZtJ0TVG1B/S/nGgwyqF4QKBgQC1kitBy5obdmgXNdFjzzwApd0YUL0medeu\nQjwn8OZp/Y5q7qtDeAm2nu1o5biOOs3gl3t99kG88lNJ3x0rDQcT8rkIZlQc30x0\nrhIboCapknw5JLFxRvUv/e/h29fHr9OHlkQ7MR3SIaxA5FOVtyyU1yVVkvGEgYzI\nFG9vz1zghQKBgESj3EEtRU6Vw89jhXPTwcIPJlrAeWap56+K3uSboYL24MT2tomT\nkbbjUtHOy04NagVMhYVCPqJiJMpXTlUCrQ1MCKpx3TEkO+5cKMKk1aIQ0ANIi0l4\n6jEUloTRGOAU8dQcjwct9rNRGUpjRoxmEfp0QeJf/ulIVC78bi1Q1ykBAoGACTTX\nIqfrMXdIgdzFuDTaywGd+0ykup209O4A1NmfJUKpBP0DDBG7FFpsmUQEnpmWtMuZ\nhGKHJMh4tqcseHFZqYZGIYnmu+wKmWP2IRZ2v2RhDhixMpgxeHR8xEv8XfCpXhed\ncA7mfzAb5tJs9otqJEXga71ep6RV+hMnL1kpUW0CgYBGtteJ6XOk1bSRLPnHaAF8\nHRckKIxT3QG6ZsoKC8B0DCWuMRsXrhu6HAsjOO1fEUscipvKmhfyHvf0dhrghtXr\nQULK5ETfDi9/CREgQ3dSU87+GvkxBFJTDWQyAYJQs/KtzZ+axdotSv+4+UGKJvfO\n05CmIc6w/ll1v1o8PAIlLg==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-msdwr@siriushunt-5c4f3.iam.gserviceaccount.com",
        "client_id": "104589347023165035293",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-msdwr%40siriushunt-5c4f3.iam.gserviceaccount.com"
    }
    */
    /**
     * New Firebase config for Sirius's Super Quest
     */
    FIREBASE_SDK: {
        "type": "service_account",
        "project_id": "sparkhunt-sirius",
        "private_key_id": "0c0dd9d6bfa882f7574c35ccef37e4e44bef0112",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7GPbRHL6LM2lp\nsMCGACJ/0CPOueyWN/Hrwlp4H4Oqr3yNYHm2PN7ZVuUhQaeT+xcaH3g3N+2haO3S\nitkEoLNIOGzNUhAzu0ZqM8IQkEucUD7yceLUkEGCnsggKCFiVHnFGGZPJ6RSVd+M\nBTwNLn6XyBi14AMzB2Yqr4NVcaGel9XaTL9KaWk9fI/wTqQhAGcWeswFUYmtRvZr\nkGK7P3EdGFL8Ch6iAhTqhFPSzHhGSRtP+hF5iroP/0F6HDu+Zz8jbvGLXImrWBDW\nJcdIF/G/V/7gAc9CbEKrPRw3wJVLCGEq2//Jv35sX1LMOE/ZUEn9eStdCYSrvQMK\n6wUX8leJAgMBAAECggEAEYv6JzXH6lbXAweFoXZFG1w85M1rvSbgCcP/fME6ivkh\nouyyXX9V8xItiQdBnSTw+g02LA+TD2PqMf29nqvSRJVYzDoZtOWnvpwTY5RKKGMf\nlC35dQVWb4FOtDKvTCvaA7xnE/NcJjCm4i3iKjulubxqvNvr0ORXwOxsUnNxZzsd\njvfN8s/RqSG6SR5Cpg0nl8reUSyJOGuwGizxIEKvtG5NYXtPGRy5tdzYmhcqtCjE\nkV3zDmMQDKd5uMrRqqMLGpk9Gt7uarEth2Kefn3+Tfc4p2ZDprQuNJGrpDg4izt9\n0UgvLOV6mVr9IpiDe1VgvrLdExe8uYw55oWEw3RzBQKBgQD03p+5pPyIFxtPtO8O\nPYSDK3rkVJNp2DvqKYl/83DpeUkhibXIhFvKBzhPQFMICOSmLVWAb4JCvY9xcH/i\n5uQjOa1JWhC4MfvhBnt2Rf+2EsmRcM8ljWznAhS3fiDO5Oxq/9oR4bP3Wv041DUl\nlt4tNddTvc49ucNR4NCCuXJobwKBgQDDmhYxpT2ZmIdYE5aE0AqLntCc5cjBs/12\nOS5i1aSE+7TLWwEGQOvbWaU+DY/wPz8/ODllKrXMe2Y7Lh2yCfovi6q0snfDBeSg\nMILgy9Ey+IFvMxJFNHE1HcyZoFHs704++B+/BKHE9D6p9Y5DBTmPqd4+1anFQqe0\nWrTeiyeLhwKBgAxVbkwmgEXGjCyem2/nL1aACSeZDvfE2Xe48eEM/QH1hvZ2fj6E\nVC8/39k2DziXYhTwsZ7PfwsniyMWnIpsQM95Zz4LmE3+zoYOEofpjLC6D4cQ3I4y\nqmqUU0DOzI4/P51AF9bQvITYA2sqXSbwi25RiPAB3nKDedAU98ut1ZJnAoGAbR9/\nlj7LeO8hQr/az0mJOI9nbsC7GWWi19vaxwTNfes21+RzU9vQOVVv3IiQbsW6MTja\nvFfxiJynUgjORE9QpknS+HBAZCrbe4rU2TicA0WkYDcr0DQLnEh9po9MZVS0YGjo\nvRaGcWyZsRPvQ/CcRkvMU128EvK2wOWB1k3nx+0CgYBBJwL7f1RWs58BzMKukvbo\nN7d1lxzWA9NxmV90iNPv5j2nXFwvys2M/026iwoIdQEZzfFZ53I1PlPiWEgm7sS4\nzy9k1NXXIKeC9NfIHMoJ4gRxRbtJMy8KIzryoTCyHuFLdAtmNaxmXdxq7w0cxuSr\n2Vky5eI6gtAVy2fBMhZ1SA==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-ijxdi@sparkhunt-sirius.iam.gserviceaccount.com",
        "client_id": "101046006988258868531",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ijxdi%40sparkhunt-sirius.iam.gserviceaccount.com"
    }
};
