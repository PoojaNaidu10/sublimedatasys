const apiErrors = require('../utils/apiErrors')
const apiResponse = require('../utils/apiResponse')

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    config = require('../config/config'),
    Customer = mongoose.models.customer
    ObjectId = mongoose.Types.ObjectId

const addCustomer = async function(req,  res){
    try{
        let firstName = req.body.first_name
        console.log("---firstName-----",firstName)
        if(!firstName){
            return apiResponse.sendResponse({message:"First name is required"}, 400, res)
        }

        let lastName = req.body.last_name
        if(!lastName){
            return apiResponse.sendResponse({message:"Last name is required"}, 400, res)
        }

        let city = req.body.city
        if(!city){
            return apiResponse.sendResponse({message:"City name is required"}, 400, res)
        }

        let customerCityObj = await Customer.findOne({"city":city})
        if(customerCityObj != null){
            return apiResponse.sendResponse({message:"City is already exist"}, 400, res)
        }

        let company = req.body.company
        if(!company){
            return apiResponse.sendResponse({message:"Company name is required"}, 400, res)
        }

        let customerCompanyObj = await Customer.findOne({"company":company})
        if(customerCompanyObj != null){
            return apiResponse.sendResponse({message:"Company is already exist"}, 400, res)
        }

        let customer = new Customer(req.body)
        let customerObject = await customer.save()
        return apiResponse.sendResponse({message:"Customer added successully"}, 200 ,res)
    } catch(err){
        console.log("----err-----",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}

const getCustomerById = async function(req, res){
    try{
        let customerId = req.query.customer_id
        let customerObject = await Customer.findOne({"id":customerId})
        return apiResponse.sendResponse(customerObject, 200, res)
    } catch(err){
        console.log("-----------err-------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}

const getAllCustomerCitiesList = async function(req, res){
    try{
        let customerObjectList = await Customer.find().distinct('city')
        return apiResponse.sendResponse(customerObjectList, 200, res)
    } catch(err){
        console.log("-------err------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}

const getCustomerByFirstName = async function(req, res){
    try{
        let firstName = req.query.first_name
        let customerObjList = await Customer.find({"first_name":firstName})
        return apiResponse.sendResponse(customerObjList, 200, res)
    } catch(err){
        console.log("------err-------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}

const getCustomerByLastName = async function(req, res){
    try{
        let lastName = req.query.last_name
        let customerObjList = await Customer.find({"last_name":lastName})
        return apiResponse.sendResponse(customerObjList, 200, res)
    } catch(err){
        console.log("------err-------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}

const getCustomerByCity = async function(req, res){
    try{
        let city = req.query.city
        let customerObjList = await Customer.find({"city":city})
        return apiResponse.sendResponse(customerObjList, 200, res)
    } catch(err){
        console.log("------err-------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
}

router.post('/customer/addCustomer', addCustomer)

router.get('/customer/getCustomerByFirstName', getCustomerByFirstName)
router.get('/customer/getCustomerByLastName', getCustomerByLastName)
router.get('/customer/getCustomerByCity', getCustomerByCity)
router.get('/customer/getAllCustomerCitiesList', getAllCustomerCitiesList)
router.get('/customer/getCustomerById', getCustomerById)

module.exports = router