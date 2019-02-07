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

    // calculate data
    calculateMonthlyCosts();

} // end deleteEmployee

function calculateMonthlyCosts() {
    console.log('in calculateMonthlyCosts');
    //console.log('input:', fnameInput, lnameInput, idInput, titleInput, salaryInput);

    let monthlySalary = [];

    for (let i = 0; i < employeesList.length; i++) {
        console.log('employeesList[i]:', Math.floor(employeesList[i].salary / 12));

        monthlySalary.push(Math.floor(employeesList[i].salary / 12));
        console.log('monthlySalary:', monthlySalary);

    } // end employeesList loop

    let total = 0;
    for (let employee in monthlySalary) {
        console.log('in monthlySalary');

        total += monthlySalary[employee];
        console.log('total:', total);
    } // end monthlySalary loop

    $('#totalMonthlyCost').text(` $ ${total}`);

} // end calculateMonthlyCosts


// STEP 3: Create a delete button that removes an employee from the DOM.
// target #employeesList, if it has .deleteButton, on click...
// target this employeeRow and remove closest tr

// delete target employee from master employeesList



// STEP 4: Once the employee is deleted, update the total spend on salaries account for this employee's removal. 
// in deleteEmployee...
// when delete is clicked, 
// target #totalMonthlyCost replace text with new total