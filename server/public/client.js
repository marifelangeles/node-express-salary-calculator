console.log('js');

// variables for form
let fnameInput;
let lnameInput;
let idInput;
let titleInput;
let salaryInput = 0;

class EmployeeInfo {
    constructor(fname, lname, id, title, salary) {
        this.fname = fname;
        this.lname = lname;
        this.id = id;
        this.title = title;
        this.salary = salary;
    }
}

// master array
let employeesList = [];


$(document).ready(docReady);


function docReady() {

    // when submit is clicked, add employee 
    $('#submit').on('click', addEmployee);

    // when delete is clicked, delete employee
    $('#employeesList').on('click', '.deleteButton', deleteEmployee);

} // end docReady


function addEmployee() {
    console.log('in addEmployee');

    // get values from input fields
    fnameInput = $('#fname').val();
    lnameInput = $('#lname').val();
    idInput = $('#id').val();
    titleInput = $('#title').val();
    salaryInput = $('#salary').val();
    salaryInput = Number(salaryInput);
    //console.log('input', fnameInput, lnameInput, idInput, titleInput, salaryInput);

    // display input values on DOM 
    $('#employeesList').append(`
        <tr class="employeeRow">
            <td class="fName">${fnameInput}</td>
            <td class="lName">${lnameInput}</td>
            <td class="id">${idInput}</td>
            <td class="title">${titleInput}</td>
            <td class="salary">${salaryInput}</td>
            <td><button class="deleteButton">Delete</button></td>
        </tr>
    `);

    // empty input fields
    $('#fname').val('');
    $('#lname').val('');
    $('#id').val('');
    $('#title').val('');
    $('#salary').val('');

    // create new employee 
    let newEmployee = new EmployeeInfo(fnameInput, lnameInput, idInput, titleInput, salaryInput);
    console.log('temp:', newEmployee);

    // add new employee to master array
    employeesList.push(newEmployee);
    console.log('employeesList:', employeesList);

    // calcalate data
    calculateMonthlyCosts();

} // end addEmployee


function deleteEmployee() {
    console.log('in deleteEmployee');

    // https://stackoverflow.com/questions/306583/how-to-get-the-children-of-the-this-selector

    // get table row index
    //console.log('this', $(this) );
    let rowIndex = $(this).closest('tr').index();
    console.log('rowIndex', rowIndex);

    // remove employee with rowIndex from array
    console.log('employeesList[rowIndex]', employeesList[rowIndex]);
    employeesList.splice(rowIndex, 1);

    // remove employee row from DOM
    $(this).closest('tr').remove();

    // calculate data
    calculateMonthlyCosts();

} // end deleteEmployee

function calculateMonthlyCosts() {
    console.log('in calculateMonthlyCosts');

    let monthlySalary = [];

    // loop through employees
    for (let i = 0; i < employeesList.length; i++) {
        // get annual salary and divide by 12\
        // push to monthly salary array
        monthlySalary.push(employeesList[i].salary / 12);
        console.log('monthlySalary:', monthlySalary);

    } // end employeesList loop

    let total = 0;
    // loop through monthly salary array
    for (let employee in monthlySalary) {
        console.log('in monthlySalary');
        // add each value to total
        total += monthlySalary[employee];
        console.log('total:', total);
    } // end monthlySalary loop

    // target span and change text to total
    $('#totalMonthlyCost').text(` $${total.toFixed(2)}`);

    // if total exceeds $20,000, change background color to red
    if (total >20000) {
        $('#totalMonthlyCost').css('color', 'red');
        $('#exceedsBudget').show();
    }

} // end calculateMonthlyCosts
