const { Router }  = require("express");
const apiResponse = require("../helpers/apiResponse");


function controller(model) {
    let router = Router();
    router.get('/', async (req, res, next) => {
        try {
            const datas = await model.getAll()

            if(!datas.length) return apiResponse.dataNotFoundResponse(res, 'Data not found')

            return apiResponse.successResponseWithData(res, "Data retrieved", datas);
        } catch (error) {
            return next(error);
        }
    })
    
    router.get('/detail/:id', async (req, res, next)=>{
        try {
            const data = await model.getById(req.params.id)

            if(!data) return apiResponse.dataNotFoundResponse(res, 'Data not found')

            return apiResponse.successResponseWithData(res, "Data retrieved", data);
        } catch (error) {
            return next(error);
        }
    })
    
    router.post('/create',async (req, res, next)=>{
        try {
            const data = await model.insert(req.body)

            return apiResponse.successResponseWithData(res, "Data added succesfully", data);
        } catch (error) {
            return next(error);
        }
    })
    
    router.put('/update/:id', async (req, res, next) => {
        try {
            const data = await model.update({ id: req.params.id }, model.convertParam(body))

            return apiResponse.successResponseWithData(res, "Data updated succesfully", data);
        } catch (error) {
            return next(error);
        }
    })

    router.delete('/delete/:id',async (req, res, next)=>{
        try {
            const data = await model.delete({ id: req.params.id }, model.convertParamDeleted(body))

            return apiResponse.successResponse(res, "Data deleted succesfully");
        } catch (error) {
            return next(error);
        }
    })
    
    router.get('/paging/:page/:perPage', async (req, res, next) => {

        try {
            const { page, perPage } = req.params;
            const select = ''
            const datas = await model.paging(perPage, (((page - 1) * perPage)), {isDeleted: false}, { created_at: -1 }, select);

            if(datas.results == 0) return apiResponse.dataNotFoundResponse(res, 'Data not found')
            
            return apiResponse.successResponseWithData(res, "Data retrieved", datas);
        } catch (error) {
            return next(error);
        }
        
    })

    return router;
}

module.exports = {
    controller:controller
}