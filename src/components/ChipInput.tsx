import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Chip from "./Chip";
import useClickAway from "../hooks/useClickAway";

interface Props {
  options: { name: string; email: string }[];
  label: string;
  inputPlaceHolder: string;
}
export interface SelectedValueType {
  id: number;
  name: string;
  email: string;
}
const ChipInput: React.FC<Props> = ({ label, options, inputPlaceHolder }) => {
  const [allOptions, setAllOptions] = useState<SelectedValueType[]>([]);
  const [selectedValue, setSelectedValue] = useState<SelectedValueType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [relatedSuggestions, setRelatedSuggestions] = useState<
    SelectedValueType[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useClickAway(suggestionsRef, () => setShowSuggestions(false));
  useEffect(() => {
    const componentOptions = options.map((item, index) => ({
      id: index,
      name: item.name,
      email: item.email,
    }));
    setAllOptions(componentOptions);
    setRelatedSuggestions(componentOptions);
    inputRef.current?.focus();
  }, [options]);

  const deleteValue = (value: number) => {
    setSelectedValue((prev) =>
      selectedValue.filter((item) => item.id !== value)
    );
    setRelatedSuggestions(
      allOptions.filter(
        (item) =>
          item.id === value || !selectedValue.find((val) => val.id === item.id)
      )
    );
  };

  const addElement = (value: SelectedValueType) => {
    setRelatedSuggestions(
      allOptions.filter(
        (item) => ![...selectedValue, value].find((val) => val.id === item.id)
      )
    );
    setSelectedValue((prev) => [...prev, value]);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const related =
      e.target.value === ""
        ? allOptions.filter(
            (item) => !selectedValue.find((val) => val.id === item.id)
          )
        : allOptions
            .filter((item) => item.name.includes(e.target.value))
            .filter((item) => !selectedValue.find((val) => val.id === item.id));
    setRelatedSuggestions(related);
    setInputValue(e.target.value);
  };

  const focusInput = () => {
    inputRef.current?.focus();
    setShowSuggestions(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !showSuggestions ||
        (e.code !== "ArrowUp" && e.code !== "ArrowDown" && e.code !== "Enter")
      )
        return;
      switch (e.code) {
        case "ArrowUp":
          if (focusIndex === 0) setFocusIndex(relatedSuggestions.length - 1);
          else setFocusIndex(Math.max(0, focusIndex - 1));
          break;
        case "ArrowDown":
          setFocusIndex((focusIndex + 1) % relatedSuggestions.length);
          break;
        case "Enter":
          addElement(relatedSuggestions[focusIndex]);
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusIndex, relatedSuggestions, showSuggestions]);

  return (
    <div className="relative w-[500px]">
      <div className="text-gray-600 mb-1">{label}</div>
      <div
        className="max-w-full border-b-2 border-blue-600 flex flex-wrap items-center"
        onClick={() => focusInput()}
      >
        {selectedValue.map((item) => (
          <Chip value={item} onClose={deleteValue} />
        ))}
        <div className="relative">
          <input
            value={inputValue}
            ref={inputRef}
            className="border-none focus:border-none selection:border-none outline-none p-2 bg-transparent max-w-full"
            onChange={(e) => handleInputChange(e)}
            onFocus={() => setShowSuggestions(true)}
            {...(inputPlaceHolder && { placeholder: inputPlaceHolder })}
          />
          {showSuggestions ? (
            <div
              ref={suggestionsRef}
              className="absolute top-full w-[300px] min-w-[200px] shadow-lg z-30  overflow-scroll"
              onBlur={() => {
                setShowSuggestions(false);
              }}
            >
              <ul>
                {relatedSuggestions.length ? (
                  relatedSuggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSuggestions(true);
                        addElement(item);
                      }}
                      onMouseEnter={() => setFocusIndex(index)}
                      className={`cursor-pointer ${
                        focusIndex === index && `bg-gray-300`
                      }`}
                    >
                      <div className="p-2 border-b-2 w-full flex justify-around">
                        <h1>{item.name}</h1>
                        <h6>{item.email}</h6>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>
                    <div className="p-2 border-b-2 w-full flex justify-around">
                      No User Available
                    </div>
                  </li>
                )}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ChipInput;
