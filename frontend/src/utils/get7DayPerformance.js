export default function getLast7Days(data, endDate = new Date()) {
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  const dayOfWeek = end.getDay();

  // Nombre de jours depuis lundi
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Lundi de la semaine
  const start = new Date(end);
  start.setDate(end.getDate() - daysSinceMonday);
  start.setHours(0, 0, 0, 0);

  return data.filter((session) => {
    const sessionDate = new Date(session.date);

    return sessionDate >= start && sessionDate <= end;
  });
}