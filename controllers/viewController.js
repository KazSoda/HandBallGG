

exports.getHomePage = (req, res) => {
    res.status(200).render('prez', {
        title: 'Accueil'
    })
}
