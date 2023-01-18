

exports.getHomePage = (req, res) => {
    res.status(200).render('index', {
        title: 'Accueil'
    })
}
