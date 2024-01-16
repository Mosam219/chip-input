import { SelectedValueType } from "./ChipInput";

interface Props {
  value: SelectedValueType;
  onClose: (id: number) => void;
}

const Chip: React.FC<Props> = ({ value, onClose }) => {
  return (
    <div className="bg-gray-100 m-2 py-1 px-2 rounded-xl text-sm">
      {value.name}
      <span
        onClick={() => onClose(value.id)}
        className="rounded-full  text-sm p-[2px] ml-2 cursor-pointer"
      >
        x
      </span>
    </div>
  );
};
export default Chip;
