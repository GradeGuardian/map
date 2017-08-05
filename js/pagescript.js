$(document).ready(() => {
    $('#overview-card').hide()

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


    $(".chb").change(function () {
        var checked = $(this).is(':checked');
        $(".chb").prop('checked', false);
        if (checked) {
            $(this).prop('checked', true);
        }
    });

    
    $(".chb").click(function () {
        activeDatafield = $(this).attr('id')
        if($(this).is(':checked')) {
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