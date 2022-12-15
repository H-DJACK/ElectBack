const ElecData = require('../models/ElecData')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const getAllElecDatas = asyncWrapper(async (req, res) => {
  const elecDatas = await ElecData.find({})
  res.status(200).json({ elecDatas })
})

const createElecData = asyncWrapper(async (req, res) => {
  const elecData = await ElecData.create(req.body)
  res.status(201).json({ elecData })
})

const getElecData = asyncWrapper(async (req, res, next) => {
  const { id: elecDataID } = req.params
  const elecData = await ElecData.findOne({ _id: elecDataID })
  if (!elecData) {
    return next(createCustomError(`No data with id : ${elecDataID}`, 404))
  }

  res.status(200).json({ elecData })
})
const deleteElecData = asyncWrapper(async (req, res, next) => {
  const { id: elecDataID } = req.params
  const elecData = await ElecData.findOneAndDelete({ _id: elecDataID })
  if (!elecData) {
    return next(createCustomError(`No data with id : ${elecDataID}`, 404))
  }
  res.status(200).json({ elecData })
})
const updateElecData = asyncWrapper(async (req, res, next) => {
  const { id: elecDataID } = req.params

  const elecData = await Task.findOneAndUpdate({ _id: elecDataID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!elecData) {
    return next(createCustomError(`No data with id : ${elecDataID}`, 404))
  }

  res.status(200).json({ elecData })
})

module.exports = {
  getAllElecDatas,
  createElecData,
  getElecData,
  updateElecData,
  deleteElecData,
}
