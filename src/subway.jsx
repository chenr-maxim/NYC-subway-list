import React, { useState, useEffect } from 'react';

import SubwayItem from './subwayitem';

const axios = require('axios');

const Subway = () => {
  const [subwayData, setSubwayData] = useState({});
  const [search, setSearch] = useState('');
  useEffect(() => {
    const getSubwayData = async () => {
      const subwaydata = await axios.get('https://raw.githubusercontent.com/jonthornton/MTAPI/master/data/stations.json')
      .then((response) => {
        return response.data;
      });
      setSubwayData(subwaydata);
    }
    getSubwayData();
  }, [])

  const getSubwayArrivalTimes = async (id) => {
    const arrivalTimes = await axios.get(`https://api.wheresthefuckingtrain.com/by-id/${id}`)
    .then((response) => {
      return response.data;
    })
    return arrivalTimes;
  }

  const subwayList = Object.entries(subwayData).map(([key, value]) => {
    return (
      <SubwayItem key={key} getSubwayArrivalTimes={getSubwayArrivalTimes} value={value}/>
    )
  });

  const filteredSubwayList = subwayList.filter(subway => {
    const subwayName = subway.props.value.name.toLowerCase();
    return subwayName.includes(search.toLowerCase());
  })

  return (
    <div>
      <h4> subway data </h4>
      <p> click on a subway to vew north and south times</p>
      <input
        placeholder="search for a subway"
        type="text"
        onChange={e => setSearch(e.target.value)}
        value={search}
      >
      </input>
      { filteredSubwayList }
    </div>
  );
};

export default Subway;