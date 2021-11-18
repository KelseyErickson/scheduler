export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];

  if (!state.days.length) {
    return [];
  }

  const filteredDays = state.days.filter((stateDay) => stateDay.name === day);

  if (!filteredDays.length) {
    return [];
  }

  const appointmentArray = filteredDays[0].appointments;

  for (const appointment of appointmentArray) {
    if (state.appointments[appointment]) {
      appointmentsForDay.push(state.appointments[appointment]);
    }
  }

  return appointmentsForDay;
};

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
    if (state.interviewers[interviewer]) {
      interviewersForDay.push(state.interviewers[interviewer]);
    }
  }

  return interviewersForDay;
};

export function getInterview(state, interview) {
  if(!interview){
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer]

  const interviewObject ={
    "student": interview.student,
    "interviewer": {
      "id": interview.interviewer, 
      "name": interviewerInfo.name, 
      "avatar": interviewerInfo.avatar
    }
  }

  return interviewObject;
};

