import data from './data.json';

const chart = () => {
  const monthlyData = data.monthly.map(m => ({
    name: m.month,
    sales: m.actual,
  }));

  return (
    // ... same as before, just replace `data` with `monthlyData`
    <BarChart data={monthlyData}>...</BarChart>
  );
};
