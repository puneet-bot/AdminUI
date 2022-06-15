var globalData;
var totalChecks = 0;
var multipleDelete = [];
var changeName = {};
var changeEmail = {};
var changeRole = {};
var flag = false;
var saveDeleteFlag = false;
var deletedHowmuch = 0;



$(document).ready(function () {
    async function fetchMembers(url) {
        const response = await fetch(url);
        var data = await response.json();
        globalData = data;
        await createDomTable(data);
    }
    fetchMembers('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
});


function createDomTable(data) {
    createTable(data);

    document.getElementById('multiple-del').addEventListener('click', function () {
        console.log(globalData)
        for (var i = 0; i < multipleDelete.length; i++) {
            globalData[multipleDelete[i]].ignore = 'true';
        }
        $('#multiple-del').css("display", "none");
        multipleDelete = [];
        totalChecks = 0;
        console.log(globalData)
        deleteAndReRenderTable();
        $('#alert-message').css('display', 'block');
        $('#alert-message').html('Multiple Records Deleted <strong>successfully</strong>');
        setTimeout(function () {
            $('.hide1').fadeOut('slow');
        }, 1000);
    })


}

function createTable(data) {
    //Creating Table Header 
    const table = document.getElementById('example');
    var tableHeader = document.createElement("thead");
    tableHeader.setAttribute('id', 'my-table-head')
    table.appendChild(tableHeader);
    var tableRow = document.createElement("tr");
    tableHeader.appendChild(tableRow);

    for (var i = 0; i < 5; i++) {
        var th = document.createElement("th");

        if (i == 0) {
            th.innerHTML = 'Select';
        } else if (i == 1) {
            th.innerHTML = 'Name';
        } else if (i == 2) {
            th.innerHTML = 'Email';
        } else if (i == 3) {
            th.innerHTML = 'Role';
        } else if (i == 4) {
            th.innerHTML = 'Actions';
        }
        tableRow.appendChild(th);
    }
    createTableBody(table, data);
}

function createTableBody(table, data) {
    const tableBody = document.createElement("tbody");
    tableBody.setAttribute('id', 'my-table-body')
    table.appendChild(tableBody);

    for (var i = 0; i < data.length; i++) {
        if (data[i].ignore !== 'true') {
            var contentRow = document.createElement("tr");
            contentRow.setAttribute('id', `row-${data[i].id}`);
            var td1 = document.createElement("td");
            td1.innerHTML = `<input type="checkbox" id='check-${data[i].id}'>`;
            td1.setAttribute('id', `td-one-${data[i].id}`);
            var td2 = document.createElement("td");
            td2.innerHTML = `${data[i].name}`;
            td2.setAttribute('id', `td-two-${data[i].id}`);
            var td3 = document.createElement("td");
            td3.innerHTML = `${data[i].email}`;
            td3.setAttribute('id', `td-three-${data[i].id}`);
            var td4 = document.createElement("td");
            td4.innerHTML = `${data[i].role}`;
            td4.setAttribute('id', `td-four-${data[i].id}`);
            var td5 = document.createElement("td");
            td5.setAttribute('class', `td-five`);
            var editButton = document.createElement("button");
            editButton.setAttribute('id', `edit-${data[i].id}`);
            editButton.setAttribute('class', 'btn btn-primary edit-btn')
            editButton.textContent = 'Edit';
            var deleteButton = document.createElement("button");
            deleteButton.setAttribute('id', `delete-${data[i].id}`);
            deleteButton.setAttribute('class', 'btn btn-danger delete-btn')
            deleteButton.textContent = 'Delete';
            td5.append(editButton, deleteButton);
            contentRow.append(td1, td2, td3, td4, td5);
            tableBody.appendChild(contentRow);
        }

        //Selecting multiple records 
        if (document.getElementById(`check-${data[i].id}`)) {
            document.getElementById(`check-${data[i].id}`).addEventListener('change', function () {
                if (this.checked) {
                    $('#multiple-del').css("display", "block");
                    totalChecks += 1;
                    $('#multiple-del').text(`Delete (${totalChecks}) Selected`);
                    var index = Number(this.id.split('check-')[1]) - 1;
                    multipleDelete.push(index);
                    var rowIndex = index + 1;
                    $(`#row-${rowIndex}`).addClass("highlight-color");
                } else {
                    if (totalChecks == 1)
                        $('#multiple-del').css("display", "none");
                    totalChecks -= 1;
                    $('#multiple-del').text(`Delete (${totalChecks}) Selected`);
                    var rowIndex = Number(this.id.split('check-')[1]);
                    $(`#row-${rowIndex}`).removeClass("highlight-color");
                }
            });
        }

        //Enabling edit on Name
        if (document.getElementById(`td-two-${data[i].id}`)) {
            if (flag === false) {
                flag = true;
                document.getElementById(`td-two-${data[i].id}`).addEventListener('click', function () {
                })
                document.getElementById(`td-two-${data[i].id}`).addEventListener('keypress', function () {
                    var id = Number(this.id.split('td-two-')[1]) - 1;
                    changeName.content = this.innerHTML;
                    changeName.index = Number(id);
                })
            }

        }

        // Enabling edit on Email
        if (document.getElementById(`td-three-${data[i].id}`)) {
            if (flag === false) {
                flag = true;
                document.getElementById(`td-three-${data[i].id}`).addEventListener('click', function () {
                    console.log('th');
                })
                document.getElementById(`td-two-${data[i].id}`).addEventListener('keypress', function () {
                    var id = Number(this.id.split('td-two-')[1]) - 1;
                    changeEmail = (this.innerHTML);
                })
            }
        }

        //Enabling edit on Role
        if (document.getElementById(`td-four-${data[i].id}`)) {
            if (flag === false) {
                flag = true;
                document.getElementById(`td-four-${data[i].id}`).addEventListener('click', function () {
                    console.log('th');
                })
                document.getElementById(`td-two-${data[i].id}`).addEventListener('keypress', function () {
                    var id = Number(this.id.split('td-two-')[1]) - 1;
                    changeRole = (this.innerHTML);
                })
            }

        }

        //editing the record
        if (document.getElementById(`edit-${data[i].id}`)) {
            document.getElementById(`edit-${data[i].id}`).addEventListener('click', function () {
                console.log('hhhh');
                var thisID = this.id.split('edit-')[1];
                currentTD = $(this).parents('tr').find('td');
                var count = 0;
                $.each(currentTD, function () {
                    if (count != 4) {
                        console.log('hhh')
                        $(this).prop('contenteditable', true)
                    }
                    $(`#edit-${thisID}`).text('Save');
                    $(`#edit-${thisID}`).addClass('btn-success save-button');
                    $(`#edit-${thisID}`).attr('id', `save-button-${thisID}`);
                    $(`#delete-${thisID}`).text('Cancel');
                    $(`#delete-${thisID}`).removeClass('btn-danger');
                    $(`#delete-${thisID}`).addClass('btn-warning cancel-button');
                    $(`#delete-${thisID}`).attr('id', `cancel-button-${thisID}`);
                    ++count;
                });

                // Saving record when edit is done
                if (document.getElementById(`save-button-${thisID}`)) {
                    document.getElementById(`save-button-${thisID}`).addEventListener('click', function () {
                        changeName.content = document.getElementById(`td-two-${thisID}`).textContent;
                        changeName.email = document.getElementById(`td-three-${thisID}`).textContent;
                        changeName.role = document.getElementById(`td-four-${thisID}`).textContent;
                        changeName.index = Number(thisID) - 1;
                        globalData[changeName.index].name = changeName.content;
                        globalData[changeName.index].email = changeName.email;
                        globalData[changeName.index].role = changeName.role;
                        saveDeleteFlag = true;

                        console.log(globalData);
                        $(`#save-button-${thisID}`).text('Edit');
                        $(`#save-button-${thisID}`).attr('id', `edit-${thisID}`);
                        $(`#edit-${thisID}`).removeClass('save-button btn-success');
                        $(`#edit-${thisID}`).addClass('btn-primary');
                        $(`#cancel-button-${thisID}`).text('Delete');
                        $(`#cancel-button-${thisID}`).addClass('btn-danger');
                        $(`#cancel-button-${thisID}`).removeClass('btn-warning cancel-button');
                        $(`#cancel-button-${thisID}`).attr('id', `delete-${thisID}`);
                        currentTD = $(this).parents('tr').find('td');
                        var count = 0;
                        $.each(currentTD, function () {
                            if (count != 4) {
                                $(this).prop('contenteditable', false)
                            }
                            ++count;
                        });
                        changeName = {};
                        deleteAndReRenderTable();
                        $('#alert-message').css('display', 'block');
                        $('#alert-message').html('Edited Record <strong>successfully</strong>');
                        setTimeout(function () {
                            $('.hide1').fadeOut('slow');
                        }, 1200);

                    })
                }

                // Cancel the changes made 
                if (document.getElementById(`cancel-button-${thisID}`)) {
                    document.getElementById(`cancel-button-${thisID}`).addEventListener('click', function () {
                        $(`#save-button-${thisID}`).text('Edit');
                        $(`#save-button-${thisID}`).attr('id', `edit-${thisID}`);
                        $(`#edit-${thisID}`).removeClass('save-button btn-success');
                        $(`#edit-${thisID}`).addClass('btn-primary');
                        $(`#cancel-button-${thisID}`).text('Delete');
                        $(`#cancel-button-${thisID}`).addClass('btn-danger');
                        $(`#cancel-button-${thisID}`).removeClass('btn-warning cancel-button');
                        $(`#cancel-button-${thisID}`).attr('id', `delete-${thisID}`);
                        currentTD = $(this).parents('tr').find('td');
                        var count = 0;
                        $.each(currentTD, function () {
                            if (count != 4) {
                                $(this).prop('contenteditable', false)
                            }
                            ++count;
                        });
                        changeName = {};
                        changeEmail = {};
                        changeRole = {};
                        deleteAndReRenderTable();
                        $('#alert-message').css('display', 'block');
                        $('#alert-message').html('Cancellation <strong>successfull</strong>');
                        setTimeout(function () {
                            $('.hide1').fadeOut('slow');
                        }, 1200);
                    })
                }
            });

        }


        // Delete the record
        if (document.getElementById(`delete-${data[i].id}`)) {
            document.getElementById(`delete-${data[i].id}`).addEventListener('click', function () {
                var rowGuid = Number(this.id.split('delete-')[1]) - 1;
                console.log(rowGuid);
                globalData[rowGuid].ignore = 'true';
                totalChecks = 0;
                $('#multiple-del').css("display", "none");
                deleteAndReRenderTable();
                $('#alert-message').css('display', 'block');
                $('#alert-message').html('Deleted a Record <strong>successfully</strong>');
                setTimeout(function () {
                    $('.hide1').fadeOut('slow');
                }, 1200);
            });
        }

    }
    $('#example').DataTable();
    document.querySelector('#example_filter >label>input').placeholder = 'Search By Record Value';
    function responsiveTableOnMobileScreen(screen) {
        if (screen.matches) { // If media query matches
            $('#example').addClass('table-responsive');
            console.log('here');
        } else {
            $('#example').removeClass('table-responsive');
        }
    }

    var screenWidth = window.matchMedia("(max-width: 700px)")
    responsiveTableOnMobileScreen(screenWidth)
    screenWidth.addListener(responsiveTableOnMobileScreen)

}

//Destroy the old occurence of table and Re-render table 
function deleteAndReRenderTable() {
    document.getElementById('my-table-head').remove();
    document.getElementById('my-table-body').remove();
    createDomTable(globalData);
    $('#example').dataTable({
        stateSave: true,
        "bDestroy": true
    });
}


