const User = require('./../models/userModel');
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find()

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
})

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError('Aucun utilisateur n\'a été trouvé avec cet ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})

exports.updateUser = catchAsync(async (req, res, next) => {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!updateUser) {
        return next(new AppError("Aucun utilisateur n'a été trouvé avec cet ID", 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            updateUser
        }
    })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const delUser = await User.findByIdAndDelete(req.params.id)

    if (!delUser) {
        return next(new AppError("Aucun utilisateur n'a été trouvé avec cet ID", 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
})


//la création d'utilisateur se fait par authController
exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: "Cette route n'est pas encore définie"
    })
}