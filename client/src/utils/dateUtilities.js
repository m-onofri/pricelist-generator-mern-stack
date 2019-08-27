export const twoIntString = value => {
    let stringValue = value.toString();
    if (stringValue.length < 2) stringValue = `0${stringValue}`;
    return stringValue;
}

export const dateValue = timestamp => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${twoIntString(date.getMonth() + 1)}-${twoIntString(date.getDate())}`;
}

export const getTimestamp = event => {
    const date = event.target.value.split("-");
    date[1] = (date[1] - 1).toString();
    return new Date(...date).getTime();
}

export const renderDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

//date, startDate, endDate: timestamps (ms)
export const is_included = (date, startDate, endDate) => {
    if(date >= startDate && date <= endDate) return true;
    return false;
}

//rooming, price: objects
export const dailyAmount = (rooming, price) =>{
    const total = (rooming.ad * price.ad +
                  rooming.ad34 * price.ad34 +
                  rooming.chd3 * price.chd3 +
                  rooming.chd4 * price.chd4 +
                  rooming.inf * price.inf +
                  rooming.animal * price.animal +
                  rooming.culla * price.culla +
                  rooming.sing * price.sing);
    return Math.round(total * 100) / 100;
  }

  export const periodAmount = (rooming, price) => {
    const total = rooming
                    .map(([category, number]) => number * price[category])
                    .reduce((a, b) => {
                      return a + b;
                    }, 0);
    return Math.round(total * 100) / 100;
  }

  export const totalAmount = (props) => {
    let totalAmount = [];
    const {days, rooming, priceList, data} = props;
    
    for(let i = 0; i < days.length; i++) {
      for(let j = 0; j < days[i][1].length; j++) {
        totalAmount.push(dailyAmount(rooming, data[priceList][days[i][0]].prices));
      }
    }
    return (Math.ceil(totalAmount.reduce((a, b) => a + b, 0) * 100) /100);
  }

//priceList: object {a: {}, b: {}, ...}
//return {a: [], b: [], ...}
export const selectPeriods = priceList => {
    return Object
                .keys(priceList)
                .reduce((obj, item) => {
                  obj[item] = [];
                  return obj;
                }, {});
}

//days: array [["a", {...}], ["b", {...}]]
//priceList: string
//data: object {priceList1: {a: {prices: {}, ...}, b: {prices: {}, ...}, ...}, ...}
//Return prices of the selected periods: array [["a", {...}], ["b", {...}]]
export const selectPrices = (days, priceList, data) => days.map(([period, ]) => [period, data[priceList][period].prices]);

//Return all days from arrival to departure
  //date, endDate: timestamps (ms)
  //priceList: object {a: {}, b: {}, ...}
  //return [["a", [timestamp1, timestamp2, ...], [...]]]
  // eslint-disable-next-line react-hooks/exhaustive-deps
export const manageDays = (date, endDate, priceList) => {
    const realEndDate = endDate - 86400000;
    let daysReservation = selectPeriods(priceList); //{a: [], b: [], ...}
    const periodsList = Object.keys(daysReservation);
    while(date <= realEndDate) {
      for(let x = 0; x < periodsList.length; x++) {
        const p = periodsList[x];
        if(is_included(date, new Date(priceList[p].start).getTime(), new Date(priceList[p].end).getTime())) {
          daysReservation[p].push(date);
        }
      }
      date += 86400000;
    }
    return (Object.entries(daysReservation).filter( x => x[1].length > 0));
  }