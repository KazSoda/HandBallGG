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
        return next(new AppError('Aucune opération avec cet ID', 404));
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

//Si l'utilisateur veut supprimer ou modifier ses informations lui-même.
//mais dans le sujet la modif/supp se fait par l'admin

// const filterObj = (obj, ...allowedFields) => {
// 	const newObj = {};
// 	Object.keys(obj).forEach(el => {
// 		if (allowedFields.includes(el)) {
// 			newObj[el] = obj[el];
// 		}
// 	});
// 	return newObj;
// }

// exports.updateMe = catchAsync(async (req, res, next) => {
// 	if (req.body.password || req.body.passwordConfirm) {
// 		return next(new AppError('Cette url n\'est pas pour la mise à jour du mot de passe. Veuillez utiliser /updateMyPassword', 400))
// 	}

//     const filteredBody = filterObj(req.body, 'firstName','lastName','email');
//     const updatedUser = await User.findByIdAndUpdate(req.body, filteredBody,{
//         new: true,
//         runValidators: true
//     })

//     res.status('200').json({
//         status: 'success',
//         data: {
//             user: updatedUser
//         }
//     })
// })

// exports.deleteMe = catchAsync(async (req, res, next) => {
// 	await User.findByIdAndUpdate(req.user.id, { active: false })

// 	res.status(204).json({
// 		status: 'success',
// 		data: null
// 	})
// });