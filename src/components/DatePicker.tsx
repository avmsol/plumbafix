import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface DatePickerProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date) => void;
  onCancel: () => void;
  minDate?: Date;
  showCancelButton?: boolean;
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function DatePicker({ selectedDate, onSelect, onCancel, minDate, showCancelButton = true }: DatePickerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(selectedDate?.getMonth() || today.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate?.getFullYear() || today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    if (compareDate < todayDate) return true;
    if (minDate) {
      const minDateCompare = new Date(minDate);
      minDateCompare.setHours(0, 0, 0, 0);
      if (compareDate < minDateCompare) return true;
    }
    return false;
  };

  const isSameDay = (date1: Date | undefined, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (!isDateDisabled(date)) {
      onSelect(date);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
  
  // Get days from previous month to fill the calendar
  const prevMonthDays = firstDayOfMonth;
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);
  
  const calendarDays: Array<{ day: number; month: 'prev' | 'current' | 'next'; date: Date }> = [];
  
  // Previous month days
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      month: 'prev',
      date: new Date(prevMonthYear, prevMonth, daysInPrevMonth - i)
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      month: 'current',
      date: new Date(currentYear, currentMonth, day)
    });
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length; // 6 weeks * 7 days
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      month: 'next',
      date: new Date(nextMonthYear, nextMonth, day)
    });
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-4 border-b border-gray-100">
        <h3 className="text-lg mb-4">Select Date</h3>
        
        {/* Month/Year Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="text-center">
            <p className="text-gray-900">
              {MONTHS[currentMonth]} {currentYear}
            </p>
          </div>
          
          <button
            onClick={handleNextMonth}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-center text-xs text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-5 pt-3">
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((item, index) => {
            const isDisabled = isDateDisabled(item.date);
            const isSelected = isSameDay(selectedDate, item.date);
            const isCurrentMonth = item.month === 'current';
            const isToday = isSameDay(today, item.date);
            
            return (
              <button
                key={index}
                onClick={() => isCurrentMonth && handleDateClick(item.day)}
                disabled={isDisabled || !isCurrentMonth}
                className={`
                  h-10 flex items-center justify-center rounded-lg text-sm transition-all
                  ${!isCurrentMonth ? 'text-gray-300 cursor-default' : ''}
                  ${isCurrentMonth && !isDisabled && !isSelected ? 'text-gray-700 hover:bg-gray-100' : ''}
                  ${isDisabled && isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''}
                  ${isSelected ? 'bg-[#007AFF] text-white hover:bg-[#0051D5]' : ''}
                  ${isToday && !isSelected && isCurrentMonth ? 'ring-1 ring-[#007AFF] text-[#007AFF]' : ''}
                `}
              >
                {item.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      {showCancelButton && (
        <div className="p-5 pt-0">
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full h-11 rounded-xl border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
