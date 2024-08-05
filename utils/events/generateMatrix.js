const generateMatrix = async (year, month)=> {

    // Get the first day of the month and its weekday
    const firstDay = new Date(year, month - 1, 1);
    const firstDayWeekday = firstDay.getDay();
    
    // Get the number of days in the month
    const numDays = new Date(year, month, 0).getDate();
    
    // Create an empty calendar matrix
    const calendarMatrix = [];
    for(i=0;i<=5;i++){
      calendarMatrix.push([])
    };
    // Initialize rows and adjust for preceding empty days
    let emptyDaysAtStart = firstDayWeekday;
    while (emptyDaysAtStart) {
      calendarMatrix[0].push({ day: null, events: [] });
      emptyDaysAtStart--;
    };
    
    // Fill in the days of the month
    let day = 1;
    let row = 0;
    let col = firstDayWeekday ;
    
    for (; day <= numDays; day++) {
      calendarMatrix[row].push({ day, events: [] });
      col++;
    
      if (col === 7) {
        col = 0;
        row++;
      }
    };
    
    // Add empty days at the end
    while(row < 6){
      calendarMatrix[row].push({ day: null, events: [] });
      col ++
      
      if(col === 7){
        col=0;
        row++
      }
    }  
  
    return calendarMatrix;
    
  };

module.exports = generateMatrix;