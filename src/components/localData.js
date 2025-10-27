export const setLocalData = (orders=[], delivering=[], valutaChanged=[]) => {
	console.log("setLocalData")
	const d = getLocalData();
	localStorage.courier_data = JSON.stringify({
  		ts: orders.map(i => [i.uid, d.ts.reduce((akk,e) => e[0] === i.uid ? e[1]: akk, Date.now())]),
  		orders,
		delivering: [...delivering],
		valutaChanged: [...valutaChanged],
    	courier_status: d.courier_status,
    	frserver_address: d.frserver_address

	});
}

export const clearLocalData = () => {
	console.log("clearLocalData")
	localStorage.courier_data = JSON.stringify({
		ts: [],
  		orders: [],
		delivering: [],
		valutaChanged: [],
    	courier_status: '',
    	frserver_address: ''

	});
}

export const setLocalValutaChanged = (valutaChanged=[]) => {
	console.log("setLocalValutaChanged")
	const d = getLocalData();

	localStorage.courier_data = JSON.stringify({
    	orders: d.orders,
		delivering: d.delivering,
    	ts: d.ts,
    	valutaChanged: [...valutaChanged],
    	courier_status: d.courier_status,
    	frserver_address: d.frserver_address

	});
}

export const setLocalDelivering = (delivering=[]) => {
	console.log("setLocalDelivering")
	const d = getLocalData();
	localStorage.courier_data = JSON.stringify({
    	valutaChanged: d.valutaChanged,
    	orders: d.orders,
		delivering: [...delivering],
    	ts: d.ts,
    	courier_status: d.courier_status,
    	frserver_address: d.frserver_address
	});
}

export const setLocalOrders = (orders=[]) => {
	console.log("setLocalOrders", orders)
	if (orders.error !== undefined) { return }
	const d = getLocalData();
	localStorage.courier_data = JSON.stringify({
    delivering: d.delivering,
    valutaChanged: d.valutaChanged,
	courier_status: d.courier_status,
	frserver_address: d.frserver_address,
  	ts: orders.map(i => [i.uid, d.ts.reduce((akk,e) => e[0] === i.uid ? e[1]: akk, Date.now())]),
		orders
	});
}

export const setLocalParams = (courier_status, frserver_address, tz_coordinates) => {
	// console.log("setLocalValutaChanged")
	const d = getLocalData();

	localStorage.courier_data = JSON.stringify({
    	orders: d.orders,
		delivering: d.delivering,
    	ts: d.ts,
    	orders: d.orders,
    	courier_status: courier_status,
    	frserver_address: frserver_address,
    	tz_coordinates: tz_coordinates
	});
}



export const getLocalData = () => {
	if (!localStorage.courier_data || !localStorage.courier_data.length) {
		return {ts: [], orders: [], status: 0, delivering: [], valutaChanged: [], courier_status: '', frserver_address: '' }
	}
	const d = JSON.parse(localStorage.courier_data);
	return ({
	  	ts: d.ts,
	    orders: d.orders,
	    status: 1,
	    delivering: d.delivering,
	    valutaChanged: d.valutaChanged,
		courier_status: d.courier_status,
		frserver_address: d.frserver_address
  })
}
