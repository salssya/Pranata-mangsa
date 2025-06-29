import { FC } from 'react';

interface ProvinceCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const ProvinceCard: FC<ProvinceCardProps> = ({ name, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg transform hover:-translate-y-1 ${
        isSelected
          ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 text-green-800 shadow-lg'
          : 'border-gray-200 hover:border-green-300 text-gray-700 bg-white hover:bg-green-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-base sm:text-lg">{name}</span>
          <div className="text-xs text-gray-500 mt-1">Provinsi</div>
        </div>
        {isSelected && (
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </button>
  );
};

export default ProvinceCard;
