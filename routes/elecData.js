const express = require('express')
const router = express.Router()

const {
    getAllElecDatas,
    createElecData,
    getElecData,
    updateElecData,
    deleteElecData,
} = require('../controllers/ElecData')

router.route('/').get(getAllElecDatas).post(createElecData)
router.route('/:id').get(getElecData).patch(updateElecData).delete(deleteElecData)

module.exports = router
