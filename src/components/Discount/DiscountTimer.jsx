import { useEffect, useState } from "react";

const DiscountTimer = () => {
    const TargetDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 25 // Set 25 Days CountDown

    const getTimeRemaining = () =>{
        const now = new Date().getTime()
        const diffrence = TargetDate - now

        return {
            days : Math.floor(diffrence / (1000 * 60 * 60 * 24)),
            hours : Math.floor((diffrence/(1000*60*60)) % 24),
            min : Math.floor((diffrence/ (1000 * 60)) % 60),
            sec : Math.floor((diffrence/1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    useEffect(()=>{
        const timer = setInterval(()=>{
            setTimeLeft(getTimeRemaining());
        },1000) ;

        return () => clearInterval(timer)
    },[])

  return (
    <div className="flex justify-center md:justify-start space-x-8 text-2xl font-semibold my-6">
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.days}</span>
        <br />
        Days
      </div>
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.hours} </span>
        <br />
        Hours
      </div>
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.min} </span>
        <br />
        Min
      </div>
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.sec} </span>
        <br />
        Sec
      </div>
    </div>
  );
};

export default DiscountTimer;
