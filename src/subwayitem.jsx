import React, {useState} from 'react';

const SubwayItem = ({getSubwayArrivalTimes, value}) => {
  
  const [northTime, setNTime] = useState([]);
  const [southTime, setSTime] = useState([]);

  const getArrivalTimes = async () => {
    const time = await getSubwayArrivalTimes(value.id);
    setNTime(time.data[0].N);
    setSTime(time.data[0].S);
  }

  return (
    <div onClick={getArrivalTimes}>
      <h4 > {value.name}</h4>
      {`north times`}
      {northTime.length !== 0 ? 
        northTime.map((time, i) => {
          return (
            <div key={i}>
              <p>{time.time}</p>
            </div>
          )
        }): null}
      <br/>
      {`south times`}
      {southTime.length !== 0 ? 
      southTime.map((time, i) => {
        return (
          <div key={i}>
            <p>{time.time}</p>
          </div>
        )
      }): null}
    </div>
  );
};

export default SubwayItem;