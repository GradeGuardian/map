var literacydata = null
$.getJSON('../data/literacy.json', data => literacydata = data)

var facilitydata = null
$.getJSON('../data/data.json', data => {
    facilitydata = data
    $('#loading-screen h1').fadeOut("slow")
    $('#loading-screen').slideUp("slow")
})

var correlationData = null
$.getJSON('../data/correlations.json', data => correlationData = data)