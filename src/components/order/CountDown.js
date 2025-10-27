import React, { useRef, useState } from 'react';

export default ({ deliver_at = '', deliver_time = 0, ts }) => {
  const time = useRef();
  const [clock, setClock] = useState();

  clearInterval(time.current)
	let dt;

	// передан deliver_time
	if (deliver_time > 0) {
    dt = deliver_time * 60 - Math.ceil((Date.now() - ts)/1000)

  	if (dt < 0) {
      // return <div style={{textAlign: 'center', color: 'red'}}>вы опоздали</div>
      return <>вы опоздали</>
  	}

	}
	// не передан deliver_time, вычисляю по deliver_at
	else {

    if (!deliver_at.length) {
    	// нет данных о времени доставки
    	return null
    }

  	const at = deliver_at.split(':')
  	if (at.length !== 2) {
  		// не хватает данных о времени доставки
    	return null;
  	}

    let date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

  	deliver_at = Math.ceil(new Date(year, month, day, at[0], at[1], 0)/1000);

  	if (Math.ceil(Date.now()/1000) > deliver_at) {
      // return <div style={{textAlign: 'center', color: 'red'}}>вы опоздали</div>
      return <>вы опоздали</>
  	}

    dt = deliver_at - Math.ceil(Date.now()/1000);
	}

  // получить текущее время в формате hh:mm
  const getTime = () => {

		const h = Math.floor(dt / 60 / 60)
		const m = Math.floor((dt - h * 60 * 60)/60)
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
		return `осталось ${hh}:${mm}`
		// const s = Math.floor(dt - m * 60 - h * 60 * 60)
    // const ss = String(s).padStart(2, '0');
		// return `${hh}:${mm}:${ss}`
  };

  time.current = setInterval(() => setClock(getTime()), 6000)

  // return <div style={{textAlign: 'center', color: 'green'}}>{clock}</div>
  return <>{clock}</>

}
