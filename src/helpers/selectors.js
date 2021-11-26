// Function to take in state and day and return the appointments for that day as an array of objects
export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];

  if (!state.days.length) {
    return [];
  }
  // Filter selected day from state.days array
  const filteredDays = state.days.filter((stateDay) => stateDay.name === day);
  
  if (!filteredDays.length) {
    return [];
  }
  // Place the appointments array for the filtered day in a variable
  const appointmentArray = filteredDays[0].appointments;
  
  for (const appointment of appointmentArray) {
  //Push state.appointments objects to the appointmentsForDay array
    appointmentsForDay.push(state.appointments[appointment]);
  }

  return appointmentsForDay;
};

// Function to take in state and day return the interviewers for that day as an array of objects
// Same basic funtionality as getAppointmentsForDay
export function getInterviewersForDay(state, day) {
  let interviewersForDay = [];

  if (!state.days.length) {
    return [];
  }

  const filteredDays = state.days.filter((stateDay) => stateDay.name === day);

  if (!filteredDays.length) {
    return [];
  }
 
  const interviewerArray = filteredDays[0].interviewers;
  
  for (const interviewer of interviewerArray) {
    interviewersForDay.push(state.interviewers[interviewer]);
  }
  
  return interviewersForDay;
};

// Function to take in state and interview and return an object with interviewer and student
export function getInterview(state, interview) {
  if(!interview){
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer];

  const interviewObject ={
    "student": interview.student,
    "interviewer": {
      "id": interview.interviewer, 
      "name": interviewerInfo.name, 
      "avatar": interviewerInfo.avatar
    }
  };
  
  return interviewObject;
};