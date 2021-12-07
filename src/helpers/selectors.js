// Function to take in state and day and return the appointments for that day as an array of objects
export function getAppointmentsForDay(state, day) {
  let appointments = [];
  state.days.forEach((value) => {
    if (value.name === day) {
      const today = value;
      today.appointments.forEach((appt) => {
        appointments.push(state.appointments[appt]);
      });
    }
  });
  return appointments;
}

// Function to take in state and day return the interviewers for that day as an array of objects
export function getInterviewersForDay(state, day) {
  let interviewers = [];

  state.days.forEach((value) => {
    if (value.name === day) {
      const today = value;
      today.interviewers.forEach((int) => {
        interviewers.push(state.interviewers[int]);
      });
    }
  });
  return interviewers;
}

// Function to take in state and interview and return an object with interviewer and student
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer];

  const interviewObject = {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: interviewerInfo.name,
      avatar: interviewerInfo.avatar,
    },
  };
  return interviewObject;
}
