import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // axios calls to get db info and set state
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);


  // Function to update spots remaining and return a state.days copy with the update
  const updateSpots = (appointments) => {
    let dayIndex = 0;
    let count = 0;
    // Grab index of the day
    for (const day of state.days) {
      if (day.name === state.day){
        dayIndex = day.id - 1;
      } 
    }
    // Loop through that day's appointments and count the ones without an interview booked
    for (const appointment of state.days[dayIndex].appointments) {
      if (!appointments[appointment].interview) {
        count++;
      }
    }
    // Copy state and adjust the spot number with the count and return the copy
    const stateDaysCopy = { ...state };
    stateDaysCopy.days[dayIndex].spots = count;
    return stateDaysCopy.days;
  };


  // Function to book interview and update db and state
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // To decrement spots when appointment added
    const days = updateSpots(appointments);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  // Function to cancel(delete) and interview and update db and state
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // To increment spots with interview deleted
    const days = updateSpots(appointments);


    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
