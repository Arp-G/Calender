import React from 'react';
import './Calender.css';

const MONTH = [
  // MONTH[monthnum]
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const DAY = [
  // DAY[daynum]
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function getDaysInMonth(month, year) {
  // month starts from 1 here
  return new Date(year, month, 0).getDate();
}

class Calender extends React.Component {
  constructor(props) {
    super(props);
    var date = new Date();
    this.state = {
      cur_date: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(action) {
    if (action === "<") {
      this.setState(function(oldState, props) {
        var day = oldState.cur_date.day;

        var month = oldState.cur_date.month - 1;
        var year = oldState.cur_date.year;
        if (month < 0) {
          year--;
          month = 11;
        }

        return { cur_date: { day: day, month: month, year: year } };
      });
    } else {
      this.setState(function(oldState, props) {
        var day = oldState.cur_date.day;
        var month = oldState.cur_date.month + 1;
        var year = oldState.cur_date.year;
        if (month > 11) {
          year++;
          month = 0;
        }

        return { cur_date: { day: day, month: month, year: year } };
      });
    }
  }

  render() {
    return (
      <div className="calender">
        <CalenderHeader
          cur_date={this.state.cur_date}
          handleClick={this.handleClick}
        />
        <CalenderWeekHeading/>
        <CalenderBody cur_date={this.state.cur_date} />
      </div>
    );
  }
}

function CalenderHeader(props) {
  return (
    <div className="calenderHeader">
      <CalenderChangeButton
        handleClick={props.handleClick}
        action="<"
        actionSymbol={<i class="fa fa-chevron-circle-left"></i>}
        cname="calenderLeftButton"
      />

      {`${MONTH[props.cur_date.month]} ${props.cur_date.year}`}

      <CalenderChangeButton
        handleClick={props.handleClick}
        action=">"
        actionSymbol={<i class="fa fa-chevron-circle-right"></i>}
        cname="calenderRightButton"
      />
    </div>
  );
}

function CalenderBody(props) {
  var days = getDaysInMonth(props.cur_date.month + 1, props.cur_date.year);
  days = Array(days).fill(1);

  days = days.map((value, index) => (
    <CalenderDay
      key={index}
      day={index + 1}
      today={
        index + 1 === props.cur_date.day &&
        props.cur_date.month === new Date().getMonth() &&
        props.cur_date.year === new Date().getFullYear()
      }
    />
  ));

  return <div className="calenderBody"> {days} </div>;
}

function CalenderDay(props) {
  return (
    <div className={props.today ? "calenderDay today" : "calenderDay"}>
      {props.day}
    </div>
  );
}

function CalenderChangeButton(props) {
  return (
    <div
      className={props.cname}
      onClick={props.handleClick.bind(null, props.action)}
    >
      {props.actionSymbol}{" "}
    </div>
  );
}

function CalenderWeekHeading(props) {
  var weekDays = DAY.map((day)=><div className="weekDay">{day}</div>);
  return (<div className="CalenderWeekHeader">{weekDays}</div>);  
}

export default Calender;
