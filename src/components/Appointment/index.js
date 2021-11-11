import React from "react";
import "components/Appointment/styles.scss"

export default function Appointment(props) {


  const availableAppointments = () => {
    if(!props.time){
      return "No Appointments";
    } else {
      return `Appointment at ${props.time}`
    }
  };

  return (
    <article className="appointment">{availableAppointments()}</article>
  );
}