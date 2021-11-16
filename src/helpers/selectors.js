

 export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];

  if(!state.days.length) {
    return [];
  } 

  const filteredDays = state.days.filter((stateDay) => stateDay.name === day);

  if(!filteredDays.length){
    return [];
  }

  const appointmentArray = filteredDays[0].appointments;
 
  for (const appointment of appointmentArray){
    if(state.appointments[appointment] ){
      appointmentsForDay.push(state.appointments[appointment])
    }
  }

  return appointmentsForDay;
  };
