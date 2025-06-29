import { FC } from 'react';

interface CityCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const CityCard: FC<CityCardProps> = ({ name, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg transform hover:-translate-y-1 ${
        isSelected
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800 shadow-lg'
          : 'border-gray-200 hover:border-blue-300 text-gray-700 bg-white hover:bg-blue-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-base sm:text-lg">{name}</span>
          <div className="text-xs text-gray-500 mt-1">Kota/Kabupaten</div>
        </div>
        {isSelected && (
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </button>
  );
};

export default CityCard;
