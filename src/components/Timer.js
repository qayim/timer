import {useState, useEffect, Fragment} from "react";
import './Timer.css';

const Timer = () => {
  const [countDown, setCountDown] = useState(0); //setting the state and set hook
  const [runTimer, setRunTimer] = useState(true);
  const [disable, setDisable] = useState(false);
  const time = 5; //how many minutes we want

  //useEffect is used when we want to display something every time it reloads (for this example)
  useEffect(() => {
    let timerId;

    //check if true or false -> if false(button pressed) then stop
    if (runTimer) { 
      setCountDown(60 * time);
      timerId = setInterval(() => { //setInterval is a react hook -> run code after some interval
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId); //clearInterval is a react hook -> to stop the code from interval to run
    }

    return () => clearInterval(timerId);
  }, [runTimer]); //runTimer is the state we want to detect the change

  useEffect(() => {
    if(countDown < 0 && runTimer) {
        setRunTimer(false);
        setCountDown(0);
    }
    //check if countdown less than 3 minutes enable btn if it is
    if (countDown < 180) {
        setDisable(false);
    } else{
        setDisable(true);
    }
  }, [countDown, runTimer]);

  //when button is clicked then timer will reset and button becomes disabled again
  const togglerTimer = () => {
    setCountDown(time * 60);
    setRunTimer(true);
  };

  const seconds = String(countDown % 60).padStart(2, 0); //padStart is just to have it in 2 digits like 01,10,20
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0); 
  const expiring = <Fragment>Your OTP is expiring in <b>{minutes}:{seconds}</b></Fragment>;
  const expired = "Your OTP has expired.";

  return (
    <div>
      <div>
        <p>{runTimer ? expiring : expired}</p>
      </div>

      <button type="button" id="btn" onClick={togglerTimer} disabled={disable}>
         Resend OTP
    </button>
    </div>
  );
};

export default Timer;
