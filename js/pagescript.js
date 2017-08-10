let datafields = [
    {
        label: "Percentage single-classroom schools",
        inputType: "slider",
        dataName: "Single-Classroom Schools"
    },

    {
        label: "Percentage single-teacher schools",
        inputType: "slider",
        dataName: "Single-Teacher Schools"
    },

    {
        label: "Percentage schools with buildings",
        inputType: "slider",
        dataName: "Schools with Building"
    },

    {
        label: "Percentage schools with girls toilets",
        inputType: "slider",
        dataName: "Schools with Girls Toilet"
    },

    {
        label: "Percentage schools with boys toilets",
        inputType: "slider",
        dataName: "Schools with Boys Toilet"
    },

    {
        label: "Percentage schools with toilets for CWSN (Children With Special Needs)",
        inputType: "slider",
        dataName: "Schools with Toilet for CWSN"
    },

    {
        label: "Percentage schools with drinking water",
        inputType: "slider",
        dataName: "Schools with Drinking Water"
    },

    {
        label: "Percentage schools with electricity",
        inputType: "slider",
        dataName: "Schools with Electricity"
    },

    {
        label: "Percentage schools with ramps, if needed",
        inputType: "slider",
        dataName: "Schools with Ramp if Needed"
    },

    {
        label: "Percentage schools with a library",
        inputType: "slider",
        dataName: "Schools with Library"
    },

    {
        label: "Percentage schools with a full time librarian",
        inputType: "slider",
        dataName: "Schools with Full time Librarian"
    },

    {
        label: "Percentage schools with a boundary wall",
        inputType: "slider",
        dataName: "Schools with Boundary wall"
    },

    {
        label: "Percentage schools exclusively for CWSN",
        inputType: "slider",
        dataName: "Schools Exclusively for CWSN"
    },

    {
        label: "Percentage schools with a lab assistant",
        inputType: "slider",
        dataName: "Schools with Lab. Assistant"
    },

    {
        label: "Percentage schools with a Head Master Room",
        inputType: "slider",
        dataName: "Schools with Head Master Room"
    },

    {
        label: "Percentage schools with a hostel for boys",
        inputType: "slider",
        dataName: "Schools with Hostel for Boys"
    },

    {
        label: "Percentage schools with a hostel for girls",
        inputType: "slider",
        dataName: "Schools with Hostel for Girls"
    },

    {
        label: "Percentage schools with computers and internet",
        inputType: "slider",
        dataName: "Schools with Computer & Internet"
    },

    {
        label: "Percentage schools with an ICT Laboratory",
        inputType: "slider",
        dataName: "Schools with ICT Laboratory"
    },

    {
        label: "Percentage schools with a playground facility",
        inputType: "slider",
        dataName: "Schools with Playground Facility"
    },

    {
        label: "Percentage schools which conducted medical check-ups",
        inputType: "slider",
        dataName: "Schools Conducted Med. Check-up"
    },

    {
        label: "Percentage schools having SMDC",
        inputType: "slider",
        dataName: "Schools Having SMDC"
    },

    {
        label: "Percentage schools with a School Building Committee",
        inputType: "slider",
        dataName: "Schools with Sch. Bld. Committee"
    },

    {
        label: "Percentage schools having a PTA",
        inputType: "slider",
        dataName: "Schools Having PTA"
    },

    {
        label: "Percentage schools sstablished since 2006",
        inputType: "slider",
        dataName: "Schools Established Since 2006"
    },

    {
        label: "Pupil-teacher ratio",
        inputType: "text",
        dataName: "Pupil-Teacher Ratio"
    },

    {
        label: "Student-classroom ratio",
        inputType: "text",
        dataName: "Student-Classroom Ratio"
    },

    {
        label: "Average number of teachers per school",
        inputType: "text",
        dataName: false
    },

    {
        label: "Percentage female teachers",
        inputType: "slider",
        dataName: "Female Teachers"
    },

    {
        label: "Percentage girls enrolment",
        inputType: "slider",
        dataName: "Girls Enrolment"
    }

]

$(document).ready(() => {
    $('#overview-card').hide()

    // Filters
    let row = null;
    datafields.forEach((filterText, index) => {
        if (index % 3 === 0) {
            row = $('<div>', { class: 'row' })
        }

        let formGroup = $('<div>', { class: 'form-group col-sm-12 col-lg-6 col-xl-4' })

        let input = '<input class="chb" name="group1" type="checkbox" id="df' + index + '">'
        let label = $('<label>', {
            for: 'df' + index,
            text: filterText.label
        })

        formGroup.append(input)
        formGroup.append(label)
        formGroup.appendTo(row)
        row.appendTo($('#filter-container'))
    })

    // Prediction modal inputs
    /*
    datafields.forEach((datafield, index) => {
        if (datafield.dataName) {
            let row = $('<div>', { class: 'row justify-content-center hover-shadow' })
            row.append($('<h4>', { text: datafield.label, class: 'text-center' }).css({ width: '100%' }))
            //row.append('<br>')

            if (datafield.inputType === "slider") {
                let input = $('<form class="range-field" style="width: 70%"><input type="range" id="df'+index+'-predict" dataName="' + datafield.dataName + '" min="0" max="100"/></form>')
                row.append(input)
            } else {
                let input = $('<div class="md-form" style="width: 70%"><input class="text-center" id="df'+index+'-predict" dataName="' + datafield.dataName + '" type="text" onkeypress="return isNumberKey(event)"></div>')
                row.append(input)
            }

            row.appendTo($('.datasliders'))
        }
    })*/

    // Reset button
    $('#reset-button').click(() => {
        setPredictionInputs()
        console.log('done')
    })

    $('#predict-button').click(() => {
        $('.prediction-results').hide(400)
        $('.predict-result').hide()

        let data = {}
        data.State = activeState

        datafields.forEach((datafield, index) => {
            if (datafield.dataName) {
                let value = $("#df" + index + "-predict").val()
                if (datafield.inputType === "slider") value = Number(value) / 100

                data[datafield.dataName] = String(value)
            }
        })

        $.ajax({
            type: 'POST',
            url: 'http://159.203.94.60/predictByState',
            data: JSON.stringify(data),
            success: function (data) {
                let currentRate = facilitydata['target']['2015'][activeState]
                let val = data.Prediction.predictedValue
                val = Number(val).toFixed(2)

                $('.api-result').text(val)
                $('.prediction-results').show(1000, () => {
                    $('.current-do').slideDown(1000, () => {
                        $('.optimal-do').slideDown(1000)
                    })
                })

                if (Number(val) > Number(currentRate)) {
                    console.log('higher', $('.predict-higher'))
                    $('.predict-result').hide()
                    $('.predict-higher').show("slow")
                } else if (Number(val) < Number(currentRate)) {
                    console.log('lower', $('.predict-lower'))
                    $('.predict-result').hide()
                    $('.predict-lower').show("slow")
                } else {
                    $('.predict-result').hide()
                    $('.predict-same').show("slow")
                }
            },
            contentType: "application/json",
            dataType: 'json'
        });
    })


    $(".chb").change(function () {
        var checked = $(this).is(':checked');
        $(".chb").prop('checked', false);
        if (checked) {
            $(this).prop('checked', true);
        }
    });


    $(".chb").click(function () {
        activeDatafield = $(this).attr('id')
        if ($(this).is(':checked')) {
            calculateColorMap(facilitydata[activeDatafield])
            $('#filter-title').text($(this).siblings('label').text())
            $('#filter-stat-state').text(facilitydata[activeDatafield]['2015'][activeState])
            $('#filter-content').show(600)
        } else {
            revertColorMap()
            $('#filter-content').hide(600)
        }
    })

})

function setPredictionInputs() {
    datafields.forEach((datafield, index) => {
        if (datafield.dataName) {
            let value = facilitydata["df" + index]['2015'][activeState]
            $("#df" + index + "-predict").val(value)
        }
    })
}

function setGraphs() {
    let lowCorr = []
    let medCorr = []
    let highCorr = []

    // Sort datafields based on correlation
    datafields.forEach((datafield, index) => {
        if (datafield.dataName) {
            let value = correlationData[datafield.dataName]
            value = Number(value)

            if (value >= 0.2) {
                highCorr.push("df" + index)
            } else if (value >= 0.1) {
                medCorr.push("df" + index)
            } else {
                lowCorr.push("df" + index)
            }
        }
    })

    lowCorrChart.data.datasets = processDataForGraph(lowCorr, '#d32f2f')
    medCorrChart.data.datasets = processDataForGraph(medCorr, '#FFC107')
    highCorrChart.data.datasets = processDataForGraph(highCorr, '#4CAF50')

    lowCorrChart.update()
    medCorrChart.update()
    highCorrChart.update()
}

function processDataForGraph(datasets, color) {
    let graphData = []

    datasets.forEach(dataset => {
        let graph = {}
        graph.label = facilitydata[dataset]['type']
        graph.borderColor = color
        graph.fill = false
        graph.data = []

        graph.data.push(facilitydata[dataset]['2013'][activeState])
        graph.data.push(facilitydata[dataset]['2014'][activeState])
        graph.data.push(facilitydata[dataset]['2015'][activeState])

        graphData.push(graph)
    })

    let targetGraph = {}
    targetGraph.label = "% Dropout Rate"
    targetGraph.borderColor = "#3F51B5"
    targetGraph.fill = false
    targetGraph.data = []

    targetGraph.data.push(facilitydata['target']['2013'][activeState])
    targetGraph.data.push(facilitydata['target']['2014'][activeState])
    targetGraph.data.push(facilitydata['target']['2015'][activeState])

    graphData.push(targetGraph)

    return graphData
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}