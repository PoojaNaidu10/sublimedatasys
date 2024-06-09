/**
 * The apiResponse is a helper utility for sending response to user
 *
 * @author DroidBoyJr
 * created on 2020-08-24
 */

var config = require("../config/config.js");
var apiErrors = require("./apiErrors.js");
var mongoose = require('mongoose'),
    APIKey = mongoose.models.APIKey;

var async = require('async');

/**
 * Send simple response with mentioned response status code
 * @param  {JSON Object/Array} data       - Data to be returned
 * @param  {int} status                   - Http status code to be returned
 * @param  {HttpResponse} res             - NodeJS response object
 */
var sendResponse = function(data, status, res){
  var response = {  status: {
                      status_code: 0,
                      message: "SUCCESS"
                    },
                    payload: data
                  };

  res.status(status).json(response);
};

/**
 * Send response of requested paginated data
 * @param  {Array} data       - Data to be returned
 * @param  {int} pageNumber   - Current page number
 * @param  {int} start        - Starting record index number
 * @param  {int} total        - Total records for query considering all pages
 * @param  {int} status       - Http status code to be returneds
 * @param  {HttpResponse} res - NodeJS response object
 */
var sendPaginationResponse = function(data, pageNumber, start, total, status, res){
  var response = {  status: {
                      status_code: 0,
                      message: "SUCCESS"
                    },
                    payload: data,
                    meta: {
                      page_number: pageNumber,
                      start: start,
                      total: total
                    }};

  res.status(status).json(response);
};

/**
 * Return error to user
 * @param  {Object} error     - ApiError object
 * @param  {int} status       - Http status code to be returneds
 * @param  {HttpResponse} res - NodeJS response object
 */
var sendError = function(error, data, status, res){
  var response = {  error: error
                };

  res.status(status).json(response);
};

var sendErrorWrongOTP = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Please enter correct OTP"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorWrongMobileOrPassword = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "please enter correct mobile or password"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorEmailNotVerified = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Email or otp is incorrect"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorEmailAlreadyVerified = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Your email account already verified"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorNoDoctor = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "No such practitioner exists"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorEmailExist = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Email already exists "
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorMobileExist = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Mobile number already exists "
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorReferenceCodeExist = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "This username already taken. Try another"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorDateExist = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Unavailable date already exists "
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorNoActiveDoctor = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Your account is deactivated. Please contact at connect@naturefit.in "
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorResponse = function(error, data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: error
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorNoUser = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "No such user exists"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorTherapistExist = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Mobile or email already exists "
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorAdminExist = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Please enter correct password "
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorPasswordCheck = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Old password is not matching "
                    },
                    payload: data,
                };

  res.status(status).json(response);
};


/**
 * Return error to user
 * @param  {Object} error     - ApiError object
 * @param  {int} status       - Http status code to be returneds
 * @param  {HttpResponse} res - NodeJS response object
 */
var getStandardDBResponseHandler = function(res, withResult) {
	return function(err, result) {
    console.log("err", err);
    if (err) {
      return sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res);
    } else {
      if(result) {
        console.log("Result length in response ", result.length);
      }
      return sendResponse(withResult ? result : null, 200, res);
    }
  };
};

var sendGeneralSuccess = function(status, res) {
 // return sendResponse(null, 200, res);
  var response = {  status: {
                      status_code: 0,
                      message: "SUCCESS"
                    },
                  };

  res.status(status).json(response);
};

var sendGeneralError = function(res) {
  return sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 200, res);
};

var sendAppointmentTimeError = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Please wait a moment your appointment is not yet started"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendAppointmentTimeOverError = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Sorry! your appointment time has over"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorCouponCodeExist = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "This coupon code already taken. Try another"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorPasswordAndEmail = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Incorrect email or password"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorNoMobileEmail = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "No such mobile and email exists"
                    },
                    payload: data,
                };

  res.status(status).json(response);
}

var sendErrorProgramAlreadyCreated = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Program already created"
                    },
                    payload: data,
                };

  res.status(status).json(response);
}

var sendOTP = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: " OTP send successfully"
                    },
                    payload: data,
                };

  res.status(status).json(response);
}

var sendErrorBidAlreadyExist = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Bid already exist"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

var sendErrorBidTimeExpire = function(data, status, res){
  var response = {   
                    status: {
                      status_code : 1,
                      message: "Bid Duration is expire"
                    },
                    payload: data,
                };

  res.status(status).json(response);
};

module.exports = {
    sendResponse: sendResponse,
    sendPaginationResponse: sendPaginationResponse,
    sendError: sendError,
    sendErrorWrongOTP: sendErrorWrongOTP,
    sendErrorEmailNotVerified: sendErrorEmailNotVerified,
    sendErrorEmailAlreadyVerified: sendErrorEmailAlreadyVerified,
    sendErrorNoDoctor: sendErrorNoDoctor,
    sendErrorMobileExist: sendErrorMobileExist,
    sendErrorReferenceCodeExist: sendErrorReferenceCodeExist,
    sendErrorEmailExist: sendErrorEmailExist,
    sendErrorNoActiveDoctor: sendErrorNoActiveDoctor,
    sendErrorDateExist: sendErrorDateExist,
    sendErrorResponse: sendErrorResponse,
    sendErrorNoUser: sendErrorNoUser,
    sendErrorTherapistExist: sendErrorTherapistExist,
    sendErrorAdminExist: sendErrorAdminExist,
    sendErrorPasswordCheck: sendErrorPasswordCheck,
    getStandardDBResponseHandler: getStandardDBResponseHandler,
    sendGeneralSuccess: sendGeneralSuccess,
    sendGeneralError: sendGeneralError,
    sendAppointmentTimeError: sendAppointmentTimeError,
    sendAppointmentTimeOverError: sendAppointmentTimeOverError,
    sendErrorCouponCodeExist: sendErrorCouponCodeExist,
    sendErrorWrongMobileOrPassword:sendErrorWrongMobileOrPassword,
    sendErrorPasswordAndEmail:sendErrorPasswordAndEmail,
    sendErrorNoMobileEmail:sendErrorNoMobileEmail,
    sendErrorProgramAlreadyCreated:sendErrorProgramAlreadyCreated,
    sendOTP:sendOTP,
    sendErrorBidAlreadyExist:sendErrorBidAlreadyExist,
    sendErrorBidTimeExpire:sendErrorBidTimeExpire
};
