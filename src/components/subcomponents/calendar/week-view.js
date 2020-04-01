import React, { createRef } from "react";
import { connect } from "react-redux";
import { setDate } from "../../../store/actions";
import { dayIDsInWeek } from "../../utils";
import moment from "moment";

class WeekView extends React.Component {
  getDaysFromWeek = week => {
    return dayIDsInWeek().map(d =>
      moment()
        .week(week)
        .day(d)
        .date()
    );
  };

  weekViewRef = createRef();

  isDayChecked = day => {
    const selectedDay = moment(this.props.selectedDate).date();
    return selectedDay === day;
  };

  onDayChange = e => {
    const selectedDay = e.target.value;
    const selected = moment(this.props.selectedDate);
    this.updateDate(selected.year(), selected.month(), selectedDay);
  };

  updateDate(yr, mon, day) {
    const selectedDate = moment(new Date(yr, mon, day), "YYYY MM DD");
    this.props.setDate(selectedDate);
  }

  getWidthOfPerItem() {
    const percentage = 0.103;
    return window.screen.width * percentage;
  }

  render() {
    const width = this.getWidthOfPerItem();
    const { selectedDate } = this.props;
    const weekNo = moment(selectedDate).isoWeek();
    const selectedDay = moment(selectedDate).date();

    const styleDayPosition = (id, day) => {
      if (Math.abs(day - selectedDay) > 6) {
        return {
          display: "none"
        };
      } else if (day === selectedDay) {
        return {
          transform: `translateX(${id * width}px`,
          borderRadius: "50%",
          color: "#ffffff",
          backgroundColor: "#0653b6",
          fontWeight: "bold"
        };
      } else {
        return {
          transform: `translateX(${id * width}px`
        };
      }
    };

    return (
      <div ref={this.weekViewRef} className="week-view">
        <span className="week-no">{weekNo}</span>
        <div className="week-days d-flex">
          {this.getDaysFromWeek(weekNo).map((day, id) => (
            <label
              key={id}
              className="position-absolute day"
              style={styleDayPosition(id, day)}
            >
              <input
                type="radio"
                checked={this.isDayChecked(day)}
                onChange={this.onDayChange}
                value={day}
              />
              {day}
            </label>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedDate: state.selectedDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDate: date => dispatch(setDate(date))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekView);
