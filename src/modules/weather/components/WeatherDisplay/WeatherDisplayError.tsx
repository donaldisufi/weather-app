interface WeatherDisplayErrorProps {
  error: string;
}

export const WeatherDisplayError = ({ error }: WeatherDisplayErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="text-6xl">⚠️</div>
      <p className="text-lg text-gray-600 dark:text-gray-400">{error}</p>
    </div>
  );
};
