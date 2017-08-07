var literacydata = null
$.getJSON('../data/literacy.json', data => literacydata = data)

var facilitydata = null
$.getJSON('../data/data.json', data => facilitydata = data)

var correlationData = null
$.getJSON('../data/correlations.json', data => correlationData = data)