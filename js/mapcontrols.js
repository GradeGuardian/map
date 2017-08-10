const stateNames = [
    "Bihar",
    "Sikkim",
    "Jharkhand",
    "Rajasthan",
    "West Bengal",
    "Madhya Pradesh",
    "Chhatisgarh",
    "Odisha",
    "Gujarat",
    "Maharashtra",
    "Goa",
    "Andhra Pradesh",
    "Karnataka",
    "Kerala",
    "Tamil Nadu",
    "Uttar Pradesh",
    "Haryana",
    "Punjab",
    "Uttaranchal",
    "Himachal Pradesh",
    "Tripura",
    "Mizoram",
    "Manipur",
    "Nagaland",
    "Meghalaya",
    "Delhi",
    "Jammu & Kashmir",
    "Arunachal Pradesh",
    "Assam"
]

const colorGradient = [ "#f44336", "#FF3D00", "#FF5722", "#EF6C00", "#FF9800", "#FFC107", "#FFEB3B", "#CDDC39", "#8BC34A", "#4CAF50", "#00C853"]

var activeDatafield = null
var activeState = null

states.forEach(stateObj => {

    /* Styling */
    let color = stateObj.attrs.fill
    let color_RGB = hexToRgb(color)
    let color_gray = desaturate(color_RGB.r, color_RGB.g, color_RGB.b)
    let color_old = color_gray
    let color_highlight = color
    stateObj.node.style.fill = color_gray

    let persist = false

    stateObj.mouseover((e) => {
        stateObj.node.style.fill = color_highlight
        stateObj.node.style.cursor = 'pointer'
    })

    stateObj.mouseout((e) => {
        stateObj.node.style.fill = color_old
    })

    stateObj.click((e) => {
        persist = true
        activeState = stateObj.data('name')
        $('.title-state').text(activeState)
        $('#overview-card').show()
        $('#overview-title').text(stateObj.data('name'))
        $('#literacy-male').text(literacydata['2011'][stateObj.data('name')].Male)
        $('#literacy-female').text(literacydata['2011'][stateObj.data('name')].Female)
        $('#literacy-person').text(literacydata['2011'][stateObj.data('name')].Person)
        $('.dropout-rate').text(facilitydata['target']['2015'][activeState])
        $('.optimal-dropout-rate').text(facilitydata['optimal_target'][activeState])
        if(activeDatafield) $('#filter-stat-state').text(facilitydata[activeDatafield]['2015'][activeState])

        // Hide prediction divs
        $('.prediction-results').hide()
        $('.predict-result').hide()
        $('.optimal-do').hide()
        
        setPredictionInputs()
        setGraphs()
    })

    stateObj.changeColor = (newColor) => {
        stateObj.node.style.fill = newColor
        color_old = newColor
        color_highlight = color_gray
    }

    stateObj.revertColor = () => {
        color_old = color_gray
        color_highlight = color
        stateObj.node.style.fill = color_old
    }
})

function calculateColorMap(data) {
    let min = Number.MAX_VALUE
    let max = -1
    let avg = data['2015']['National Average']

    let min_state = null
    let max_state = null

    stateNames.forEach(state => {
        if (Number(data['2015'][state]) < Number(min)) {
            min_state= state
            min = data['2015'][state]
        }
        if (Number(data['2015'][state]) > Number(max)) {
            max_state = state
            max = data['2015'][state]
        }
    })

    $('#filter-stat-avg').text(Math.round( avg * 10 ) / 10)
    $('#filter-stat-high-name').text(max_state)
    $('#filter-stat-high-data').text(max)
    $('#filter-stat-low-name').text(min_state)
    $('#filter-stat-low-data').text(min)

    states.forEach(stateObj => {
        let value = data['2015'][stateObj.data('name')]
        let colorIndex = Math.round(((value * 1.0 - min) / (max - min))*10)
        //console.log(stateObj.data('name'), value)
        //console.log(colorIndex)
        stateObj.changeColor(colorGradient[colorIndex])
    })


}

function revertColorMap() {
    console.log('reverting')
    states.forEach(stateObj => stateObj.revertColor())
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function desaturate(r, g, b) {
    var intensity = 0.3 * r + 0.59 * g + 0.11 * b;
    var k = 1;
    r = Math.floor(intensity * k + r * (1 - k));
    g = Math.floor(intensity * k + g * (1 - k)) + 15;
    b = Math.floor(intensity * k + b * (1 - k)) + 30;
    return rgbToHex(r, g, b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}