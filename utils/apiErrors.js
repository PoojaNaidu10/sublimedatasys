/**
 * List of errors
 *
 * @author DroidBoyJr
 * created on 2016-08-23
 *
 * Defines the error object to be thrown or returned in case of any error condition.
 * It stores the error code that encapsulates error number, severity of error, facility that created an error.
 * Additional parameters can be put in this class, which could be used in cases where the additional
 * information is required to describe an error.
 *
 *
 *  Values are 32 bit values laid out as follows:
 *
 *  +---+-+-+-----------------------+-------------------------------+
 *  |Sev|R|R|     Facility          |               Code            |
 *  +---+-+-+-----------------------+-------------------------------+
 *
 *  where
 *
 *      Sev - is the severity code (2 bits)
 *
 *          00 - Success
 *          01 - Informational
 *          10 - Warning
 *          11 - Error
 *
 *      R - is a reserved bit.
 *
 *      R - is a reserved bit
 *
 *      Facility - is the facility code (12 bits)
 *
 *      Code - is the facility's error number (16 bits)
 *
 */

/*=============================================>>>>>
= Base error codes =
===============================================>>>>>*/

var SEVERITY_ERROR = 0x00000003;
var SEVERITY_WARNING = 0x00000002;
var SEVERITY_INFORMATIONAL = 0x00000001;

var SUCCESS = 0;

var FACILITIES =
  {
    APPLICATION: 0x100,
    USER: 0x101
  };

/*= End of Base error codes =*/
/*=============================================<<<<<*/

/*=============================================>>>>>
= Application errors =
===============================================>>>>>*/

var applicationErrors =
  {
    INVALID_API_KEY :
      {
        code : 0xC1000001,
        message: "Invalid API key"
      },
    INVALID_SESSION :
      {
        code : 0xC1000002,
        message: "Invalid session"
      },
    INTERNAL_ERROR :
      {
        code : 0xC1000003,
        message: "Server error"
      },
    UNAUTHORIZED_REQUEST :
      {
        code : 0xC1000004,
        message: "Unauthorized request"
      },
    INVALID_PARAMETERS :
      {
        code : 0xC1000005,
        message: "Invalid parameters"
      },
    FILE_NOT_FOUND :
      {
        code : 0xC1000006,
        message: "File not found"
      },
    NO_SUCH_FILE_FOUND :
      {
        code : 0xC1000007,
        message: "No such file found"
      }
  };

/*= End of Application errors =*/
/*=============================================<<<<<*/

/*=============================================>>>>>
= User errors =
===============================================>>>>>*/

var userErrors =
  {
    REGISTRATION_FAILED :
      {
        code : 0xC1010001,
        message: "Registration failed"
      },
    LOGIN_FAILED :
      {
        code : 0xC1010002,
        message: "Mobile number or OTP incorrect"
      },
    USER_EXISTS :
      {
        code : 0xC1010003,
        message: "User already exists"
      },
    NO_SUCH_USER_EXIST :
      {
        status_code : 0xC1010004,
        message: "No such user exists"
      }
  };

/*= End of User errors =*/


/*=============================================>>>>>
= User errors =
===============================================>>>>>*/

var therapistErrors =
  {
    REGISTRATION_FAILED :
      {
        status: {
          status_code : 1,
          message: "Registration failed"
        }
      },
    LOGIN_FAILED :
      {
        status: {
          status_code : 1,
          message: "Mobile number or OTP incorrect"
        }
      },
    THERAPIST_EXISTS :
      {
        status: {
          status_code : 1,
          message: "Mobile already exists"
        }
      },
    NO_SUCH_THERAPIST_EXIST :
      {
        status: {
          status_code : 1,
          message: "No such therapist exists"
        }
      }
  };

/*= End of Therapist errors =*/
/*=============================================<<<<<*/
module.exports = {
  APPLICATION : applicationErrors,
  USER : userErrors,
  THERAPIST : therapistErrors
};
