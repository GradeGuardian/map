$(document).ready(() => {
    $('#overview-card').hide()

    let datafields = [
        "Percentage single-classroom schools",
        "Percentage single-teacher schools",
        "Percentage schools with buildings",
        "Percentage schools with girls toilets",
        "Percentage schools with boys toilets",
        "Percentage schools with toilets for CWSN (Children With Special Needs)",
        "Percentage schools with drinking water",
        "Percentage schools with electricity",
        "Percentage schools with ramps, if needed",
        "Percentage schools with a library",
        "Percentage schools with a full time librarian",
        "Percentage schools with a boundary wall",
        "Percentage schools exclusively for CWSN",
        "Percentage schools with a lab assistant",
        "Percentage schools with a Head Master Room",
        "Percentage schools with a hostel for boys",
        "Percentage schools with a hostel for girls",
        "Percentage schools with computers and internet",
        "Percentage schools with an ICT Laboratory",
        "Percentage schools with a playground facility",
        "Percentage schools which conducted medical check-ups",
        "Percentage schools having SMDC",
        "Percentage schools with a School Building Committee",
        "Percentage schools having a PTA",
        "Percentage schools sstablished since 2006",
        "Pupil-teacher ratio",
        "Student-classroom ratio",
        "Average number of teachers per school",
        "Percentage female teachers",
        "Percentage girls enrolment"
    ]

    let row = null;
    datafields.forEach((filterText, index) => {
        if (index % 3 === 0) {
            row = $('<div>', { class: 'row' })
        }

        let formGroup = $('<div>', { class: 'form-group col-sm-12 col-lg-6 col-xl-4' })

        let input = '<input class="chb" name="group1" type="checkbox" id="df' + index + '">'
        let label = $('<label>', {
            for: 'df' + index,
            text: filterText
        })

        formGroup.append(input)
        formGroup.append(label)
        formGroup.appendTo(row)
        row.appendTo($('#filter-container'))
    })


    $(".chb").change(function () {
        var checked = $(this).is(':checked');
        $(".chb").prop('checked', false);
        if (checked) {
            $(this).prop('checked', true);
        }
    });

    
    $(".chb").click(function () {
        let data_id = $(this).attr('id')
        if($(this).is(':checked')) {
            calculateColorMap(facilitydata[data_id])
        } else {

        }
    })
    
})