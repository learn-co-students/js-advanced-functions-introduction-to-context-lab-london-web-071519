const createEmployeeRecord = (array) => {
    let obj = new Object
    obj.firstName = array[0], 
    obj.familyName = array[1], 
    obj.title = array[2], 
    obj.payPerHour = array[3]
    obj.timeInEvents = []
    obj.timeOutEvents = []
    return obj
}

const createEmployees = (arrays) => {
    let employees = []
    arrays.forEach(array =>{
        let obj = new Object
        obj.firstName = array[0], 
        obj.familyName = array[1], 
        obj.title = array[2]
        employees.push(obj)
    })
    return employees
}

const createTimeInEvent = (employee, dateTime) =>{
    let [date, time] = dateTime.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date,
    }); return employee
}

const createTimeOutEvent = (employee, dateTime) =>{
    let [date, time] = dateTime.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date,
    }); return employee
}

const hoursWorkedOnDate = (employee, formDate) =>{
    let inEvent = employee.timeInEvents.find((timeEvent) =>{
        return timeEvent.date === formDate
    })

    let outEvent = employee.timeOutEvents.find((timeEvent) =>{
        return timeEvent.date === formDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = (employee, formDate)=>{
    let hoursWorked = hoursWorkedOnDate(employee, formDate)
    return hoursWorked * employee.payPerHour
}

const allWagesFor = (employee)=>{
    let allWagesPerDay = []
    employee.timeInEvents.forEach(event =>{
        allWagesPerDay.push(wagesEarnedOnDate(employee, event.date))
    })
    return allWagesPerDay.reduce((sum, num )=> sum + num)
}

const createEmployeeRecords = (arrayOfArrays)=>{
    return arrayOfArrays.map(employeeArray =>{
        return createEmployeeRecord(employeeArray)
    })
}

const findEmployeebyFirstName = (employeeRecords, name)=>{
    return employeeRecords.find(record => {
        return record.firstName === name
    })
}

const calculatePayroll = (employeeRecords)=>{
    return employeeRecords.reduce((acc, record)=>{
        return acc + allWagesFor(record)
    }, 0)
}