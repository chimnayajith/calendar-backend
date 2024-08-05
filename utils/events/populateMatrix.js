const Tasks = require("../../models/taskModel");

const populateMatrix = async (matrix , year , month , userId) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const firstDay = new Date(year, month - 1, 1);
    const firstDayWeekday = firstDay.getDay();
    const tasks = await Tasks.find({
        createdBy : userId , 
        date : { $gte: startDate, $lte: endDate }
    });
    
    tasks.forEach(task => {
        const dayOfMonth = task.date.getDate();
        const weekIndex = Math.floor((dayOfMonth + firstDayWeekday -1) / 7);
        const dayIndex = (dayOfMonth  + firstDayWeekday -1 ) % 7 ;
    
        if (matrix[weekIndex] && matrix[weekIndex][dayIndex]) {
        matrix[weekIndex][dayIndex].events.push(task);
        }
    });

    return matrix;
}

module.exports = populateMatrix;