export const CONSTANTS = {
    FIREBASE_URL : 'https://sparkhunt2-default-rtdb.firebaseio.com',
    SIRIUS_WALLET_IP : 'http://wallet.mycdw.in:5001',
    GAME : {
        LEVELS : 27,
        PLAYING_STATUS : false,
        MAINTENANCE_STATUS : false,
        IS_TEAM_EVENT: false,
        ENABLE_LEADER_BOARD: true,
        ENABLE_MILESTONE: true,
        MILESTONE_LEVELS: [],
        ZONES : {}

    },
    SERVICES : {
        LOGIN           : 'http://wallet.mycdw.in:5001/api/auth/login',
        USERS           : 'siriushunt/users',
        GAME            : 'siriushunt/game',
        DEVICE_TOKEN    : 'siriushunt/deviceTokens',
        ANSWERS         : 'siriushunt/answers',
        CLUES           : 'siriushunt/clues',
        TEAMS           : 'siriushunt/teams',
        CONFIG          : 'siriushunt/config',
        RULES           : 'siriushunt/rules',
        MILESTONE       : 'siriushunt/milestone'
    },
    APIS : {
        LOGIN_USER                  : '/loginUser',
        GET_USER_DATA               : '/getUser',
        CHECK_ANSWER                : '/checkAnswer',
        GET_ACHIEVEMENTS            : '/getAchievements',
        REGISTER_DEVICE_TOKEN       : '/registerDeviceToken',
        GET_CLUES                   : '/getClues',
        GET_RULES                   : '/getRules',
        SYNC_CONFIG                 : '/syncConfig'
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
        type	: "service_account",
        project_id	: "sparkhunt2",
        private_key_id	: "4c921039842a02c403c94bc9d7a07bff2c269d9a",
        private_key	: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJbQsiv6EgGAMn\nckQuOSiXhRNH5VkalZL/qsYTcbXpHb/GpZC7+t1y4YJVezeHYAiPlHXbTUl0oXZ1\nyHBAIap/fQv7otqces3e2YgFI8dg75qgvabejxT1dolIMIWyceT4ar1gEC3PLJ5S\neUqdOZ9FNb3Davvb2QxH/8VS+LZ3Ii5UOY/O6L2ElcLs8O+O56JO3fl4EtoWMSEk\nQAE3tHJGFGuR9Ehnp0UtzYpGrq6ktjc4diT2FqbLs2Jgws1DUBSU03ffOtL6iS71\nnmSVhtuSgdfrDMrNw0hIUhdNdTJzScvpIaVkPzn8QiAZA33xZGM7NssQRHWGfbpE\nBZ4mgRFvAgMBAAECggEAEByUS53CFiPwO1CvtSDQ/I8M8+8bpFLlig96E5EWE2+p\nPjWnxkQylXSwrQS+SX+m1PvzkhdJsmC97dLwGPkjFFqHbFk3nP+nsFUnGlN6fb2n\nWTHXrgK06E4ofKlA8H1IFY94LBMZ5EdLN16eAhswqw5kP5mITCq9iZQjD6127urH\n1u19+E29ieRsLpnqR2itkZmqNr6K8OvgW0OtjlyBDw5t2GQ5FGUK6ywMNQmfPfdT\ntajpXLX+MLwyWEQsuaVal8mNd4G2SBGyabGHIVBWOpQdtPlhBQW63/BXYqePVdtw\nKfoc6yKsCet+y59Eq1IHWrv3uUEyNkFbMrCG7KS1lQKBgQDpT5IRKOMW88CIkAaP\nG/FuSwdwPUX0VoCuBPyCdao1pNFaWkivjqP/CC+14s4BjUSaJGv9e7+N+K/L72CF\nWrvCaYh95/Lg2XmZbvPpjVFNLnksK+0kCN1vSiMQa5W+f6lR3M+21Jl+ikym8ly5\nwIgsa1SNOMByUQrwDTNJxwP2uwKBgQDdA617YvYvlN0aYADvpjtxn2weLh+U+lMF\n+kkxc1so8lH1Ydw2psnUOrb8Rp4gBy2vGVUS5Wz4vKD4V5cOL7pPlxrUR2TVcwwg\nNsiFyJAV7XqQZQswom7G9vISykF7KKoSXi+nrGgaNFw8SfrzkHw8szfiLzXnJ9QL\n73RygxMW3QKBgB9n/Kueq2MNkN9RM/DTvB4yr1+mf+IyOsQyG6OcHzt1YlEdUid/\ntgfAnFuJml2PHKr7OCY5IEIGNfPn10BcRGYZOqxoKsOlwr6qtt67jTQsi1cs2pE9\nOEGg4zN0qAWqvaotZTChUcA88bCPc3f1uN7x28He39kDm8tQm5TU2229AoGAc0+k\n5rhmO8MObOFj+6UeZJTJ4yErZx4HzRmdsIhAKqfrLPym2XjB2tHbgNoTTCCSrEWq\nRlafOVOpJIkGjedG7Jmo7NJnAJqq2+/ZRTu0OUyS4t1lLjXBWFulRzpxWaGIwlaT\nxIbGNc3VxbrPjN54g276HC+HjxgPoT6I4eoTPp0CgYBl0W2f+VXYGWskE9q0DViL\nqk74O0PnarpvTGWWsQhjSN+r2B3cO1bfT71th/ewvWn403L6r1mUHWFRnsH923tQ\njkXtaAIbhhZWzwBFERe2nVrleoK8vy8lgNTudgvZZ7/SUER+5y6hWExRFYaL8w9k\nrwbsvJ3Rfsr0oqnEqn1B/w==\n-----END PRIVATE KEY-----\n",
        client_email	: "firebase-adminsdk-2cq6j@sparkhunt2.iam.gserviceaccount.com",
        client_id	: "114876889260319786091",
        auth_uri	:"https://accounts.google.com/o/oauth2/auth",
        token_uri	:"https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url	:"https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url	:"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2cq6j%40sparkhunt2.iam.gserviceaccount.com",
        universe_domain	:"googleapis.com"
      }                      
};
