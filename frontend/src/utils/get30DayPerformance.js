export default function getLast30Days(data, endDate = new Date(), periode) {
  const end = new Date(endDate);

  const start = new Date(end);
  start.setDate(start.getDate() - periode);

  return data.filter((session) => {
    const sessionDate = new Date(session.date);

    return sessionDate >= start && sessionDate <= end;
  });
}