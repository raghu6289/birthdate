import moment from 'moment';

export function calculateAgeDetails(dateOfBirth) {
  const dob = moment(dateOfBirth, 'YYYY-MM-DD');
  const currentDate = moment();

  let ageYears = currentDate.diff(dob, 'years');
  let ageMonths = currentDate.diff(dob, 'months');
  let ageWeeks = currentDate.diff(dob, 'weeks');
  let ageDays = currentDate.diff(dob, 'days');
  let ageHours = currentDate.diff(dob, 'hours');
  let ageMinutes = currentDate.diff(dob, 'minutes');

  const previousBirthday = moment(currentDate).set({ month: dob.month(), date: dob.date() });
  const daysSinceBirthday = currentDate.diff(previousBirthday, 'days');

  ageDays -= daysSinceBirthday;
  if (ageDays < 0) {
    ageMonths--;
    ageDays += moment(currentDate).subtract(1, 'months').daysInMonth();
  }

  ageHours -= daysSinceBirthday * 24;
  ageMinutes -= daysSinceBirthday * 24 * 60;

  const months = currentDate.diff(previousBirthday, 'months');

  return {
    years: ageYears,
    totalMonths: ageMonths,
    months: months > 0 ? months : 0,
    weeks: ageWeeks,
    days: ageDays,
    hours: ageHours,
    minutes: ageMinutes,
    day: daysSinceBirthday > 0 ? daysSinceBirthday : 0
  };
}

export function calculateNextBirthdayDetails(dateOfBirth) {
  const dob = moment(dateOfBirth, 'YYYY-MM-DD');
  const currentDate = moment();

  const currentYear = currentDate.year();
  const birthMonth = dob.month();
  const birthDate = dob.date();

  let nextBirthday = moment().set({ year: currentYear, month: birthMonth, date: birthDate });

  if (nextBirthday.isBefore(currentDate)) {
    nextBirthday.add(1, 'year');
  }

  const diffDays = nextBirthday.diff(currentDate, 'days');
  const dayOfWeek = nextBirthday.format('dddd');

  let diffMonths = nextBirthday.month() - currentDate.month();
  if (diffMonths < 0) {
    diffMonths += 12;
  }

  return {
    days: diffDays,
    months: diffMonths,
    dayOfWeek: dayOfWeek
  };
}
