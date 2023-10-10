export const CONSTANTS = {
    FIREBASE_URL : 'https://sparkhunt-cdw-default-rtdb.firebaseio.com',
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
        project_id	: "sparkhunt-cdw",
        private_key_id	: "296cde59d2d53e828d971813f49f7860641a4dda",
        private_key	: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkaAKbQw4hROZX\nUqwmT4/kPhGcE4G86xAA64vTeuaVOHyj/PM3nBrSBm6XcXLtkfk2vAVzKH/XB9V3\n9FPtSWPlXahrLgV2s9gtcSkBeFQLo3IrxhRh4c99PwGkNrwOANQyoIy5mdEfnOq/\nY0nkgBbCjO7R+bgAr1fMrSZMcgeQmpWhlGWgVmOaNivMl/gikPu131X/ygg2a/Uf\nkt9w7ZgUxF3s9CYTwFA/o7RcB22I+05iv+bRNMZhLWpC6gNqXZkfCsO4AuAiP2hR\nOu7eJ5PBYUeYn9c9Io5RPQDxJBw77TXDUW7rJPzMLMH74kVMXV0E5JGkJXHbWCQg\noq4xhOYNAgMBAAECggEAAhDoNs/IVGzeJoBHN2GzaaH0YjKmOXvMaG/irV5uGeIg\nbNt6VKX9T0uIkGt6+dcmW4SliTgxJ8Bf3iFKUbZ6TyZWvhFmvQJkZ9PJeQzW+jYh\nspZLaMcn7pzAAPKKzp6TjBb+QGcusdfsukl9jaXPbhP2fK8yRliYa53MbVRXLynA\n/Ora+wAwoqZZ4O76zoQrUOOKFx9YYebbHhwiO6ihSW1LXRST9vpGmp1fTIV84+gP\nYMroXJ1l1k4jniL+5baEuVcUArzwHeMzGZuoOFbdncDfnVdETfKzj0pKKXt4jD9d\nM5ffcEqjQ+o7VmCd9AHL73JwznOiwHL9rjzisEVLCQKBgQDaRMYb4NVCXUunaLPN\ne/ob2JgqShdMQstNa63h1IOfUbYoaUZAi0khGYfY4Lso3N3nTQOlD8qtUAgSIrdv\nyFJxyMgElhvYf3Gh8QdvBEzY9pgH7qGI1GrxYqS1nJtlYTQZRUG6uRvrdb2j8H3o\nk/w7DrmFQkx56Izh03Dcqoq1CQKBgQDA0568Y1BxCxUyUYtL1XSa5HJBB4vGQxNs\n8HSYIq+q+7THcHo0ujPPkx3Gbfjp6jhOIl1t9w6FBQfWtL4HOa4uZpA+Pn1QEDlA\nJ3IBUMzv6IAJLNCYD/i0ewKqxrMHz7Ca4wIljEirAQ725Z0XPE3GbBDOtu5hAsCm\ncwtZcaON5QKBgB7Nr+vFSjOIeSHSK/Xm9kAxzB/Dvw/7KTfu52ZEmKLGZF/Fo61+\nOr7aHIrmBGPa79Ix0z7bQK4+6jStA5hZ/BCk1l2XVayzJ7VED9mCENpZytDrw45M\n9B7G3hnnVSL0mearGICimSccwbu+N/a309P92v7MgYB+6ksAjSAHTXYJAoGBAKlu\nyYIbeil6ZYurX0ypKSaZKVO+v7Dca4tD1g+AGv+Q4I6GZLtEChaQ3I7pPti7N/Jf\n+9yOQ7Hac8LTWk6a/lRDRueKnS3ms4eNoX1KdGkx0J8/Q6L6Fbzwga1xnwp0Emhm\npBI+K/Qmn/GOXPR3xpddiX85+kg/1OvtFsHnOqGJAoGAG0SLt3Q+0sm4BfNyDVbv\nlaGIEIrDg/Nl0Td0CUgY1fw5x4OO/0qI/+34bfEGk8RkkWAK2YIRHZeGEus+Lvgi\neoBvpkzzqi//U/+6rwizQRB7FDuaQYRXaGlKI+tFxdWBrv02nqREEedvgNjULfw6\nstBf3yK7une9G0gC56mjWJA=\n-----END PRIVATE KEY-----\n",
        client_email	:"firebase-adminsdk-gjwdv@sparkhunt-cdw.iam.gserviceaccount.com",
        client_id	: "108490118553918183106",
        auth_uri	:"https://accounts.google.com/o/oauth2/auth",
        token_uri	:"https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url	: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url : "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gjwdv%40sparkhunt-cdw.iam.gserviceaccount.com",
        universe_domain	: "googleapis.com"
      }                      
};
