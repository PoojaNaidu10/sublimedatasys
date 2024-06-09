module.exports = {
    // App Settings
    MONGO_URI: process.env.MONGO_URI || 'localhost',

    //API key info
    API_KEY_HEADER_NAME: 'api_key',
    API_KEY: 'hl1h38rhL*3bf)',
    ADMIN_API_KEY: 'ffoqevbo4',

    //SMS API Key info
    SMS_API_KEY: 'lcTvWuS0jYF9KQXwBHpHTpt4dGN4TjtGSq01uH3yXrk=',
    SMS_CLIENT_ID: '7135d8fe-b087-481c-853c-4a74696c6ba2',

    // Session token header key
    X_AUTHORIZATION_HEADER: 'authorization',

    // JWT encryption salt
    TOKEN_SECRET: 'secret',

    //Google map
    GEOCODER_PROVIDER : 'mapquest',
    GEOCODER_API_KEY : '',

    // Email client smtp config
    poolConfig: {
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'testingemail12341234@gmail.com',
            pass: 'testingemail'
        }
    },

    // Log file storage location
    logPath: 'log/app.log',

    // Log status
    LOG_STATUS: {
        SUCCESS: '_SUCCESS',
        FAILURE: '_FAILURE'
    },

    // User role
    USER_ROLE: {
        ADMIN: 'ADMIN',
        APPROVER:'APPROVER',
        SUPPORT:'SUPPORT',
        SELLER:'SELLER',
        BUYER:'BUYER',
        BILLING:'BILLING',
        VIEWER:'VIEWER'

    },

    //Media role
    MEDIA_ROLE: {
        VIDEO: '0',
        IMAGE: "1"
    },

    // Client website base URL
    WEBSITE_BASE_URL: 'http://test.com',

    // Email verification page relative path (path after above base URL)
    WEBSITE_EMAIL_VERIFICATION_API: '/user/emailverify',

    //Agora key info
    APP_ID : 'ebd2baee665a4d0cab9f782e58eb7c8c',
    APP_CERTIFICATE : '6910012ec0da4cc498c1749df5eed590',
};
