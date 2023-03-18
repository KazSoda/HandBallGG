

const Equipe = require('../models/equipeModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')
const multer = require('multer');
const sharp = require('sharp');




// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img'); // First argument is error (null if none), second is destination
//     },
//     filename: catchAsync(async (req, file, cb) => {
//         const equipeWording = await Equipe.findById(req.params.id).select('wording');

//         const ext = file.mimetype.split('/')[1];
//         cb(null, `equipe-${equipeWording.wording}-${Date.now()}.${ext}`);
//     })
// });
const multerStorage = multer.memoryStorage();


const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Votre fichier n\'est pas une image. Veuillez téléverser des images uniquement.', 400), false);
    }
};


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});


exports.uploadEquipePhoto = upload.single('photo');

exports.resizeEquipePhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    const equipeWording = await Equipe.findById(req.params.id).select('wording');

    req.file.filename = `equipe-${equipeWording.wording}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/equipes/${req.file.filename}`);

    next();
});

exports.getAllEquipes = catchAsync(async (req, res) => {
    const feature = new APIFeatures(Equipe.find(), req.query)
        .filter()
        .limitFields()
        .sort()
        .paginate();
    const equipes = await feature.query;

    res.status(200).json({
        status: 'success',
        results: equipes.length,
        data: {
            equipes
        }
    })
})

exports.createEquipe = catchAsync(async (req, res) => {
    const newEquipe = await Equipe.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newEquipe
        }
    })
})

exports.delEquipe = catchAsync(async (req, res, next) => {
    const delEquipe = await Equipe.findByIdAndDelete(req.params.id)

    if (!delEquipe) {
        return next(new AppError('Aucune équipe trouvé à cette id', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.updateEquipe = catchAsync(async (req, res, next) => {
    // console.log(req.file)
    // console.log(req.body)

    if(req.file) req.body.photo = req.file.filename;

    const updateEquipe = await Equipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!updateEquipe) {
        return next(new AppError('Aucune équipe trouvé à cette id', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            updateEquipe
        }
    })


})

exports.getOneEquipe = catchAsync(async (req, res, next) => {
    const equipe = await Equipe.findById(req.params.id);

    if (!equipe) {
        return next(new AppError('Aucun match avec cet ID', 404));
    }

    //send reponse
    res.status(200).json({
        status: 'success',
        data: {
            equipe
        }
    })
})