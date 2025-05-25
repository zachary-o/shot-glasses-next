import { continentsArr } from "@/geoData";
import { Continent } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { useLocale } from "next-intl";

type ContinentsCheckboxGroupProps = {
  isMulti: boolean;
  onValueChange: (value: string | string[]) => void;
  options: Continent[];
};

const ContinentsCheckboxGroup = ({
  isMulti,
  onValueChange,
  options,
}: ContinentsCheckboxGroupProps) => {
  const locale = useLocale();

  const [selectedContinent, setSelectedContinent] = useState<string[]>([]);
  console.log("continentsArr", continentsArr);
  console.log("selectedContinent", selectedContinent);

  const toggleOptions = (option: string, checked: string | boolean) => {
    const newSelectedValues = checked
      ? [...selectedContinent, option]
      : selectedContinent.filter((value) => value !== option);
    setSelectedContinent(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const toggleOption = (option: string, checked: string | boolean) => {
    const newValue = checked ? option : "";
    setSelectedContinent(checked ? [option] : []);
    onValueChange(newValue);
  };

  return (
    <>
      {options.map((item: Continent) => (
        <div className="flex items-center space-x-2" key={item.continentEng}>
          <Checkbox
            id={item.continentEng}
            checked={selectedContinent.includes(item.continentEng)}
            onCheckedChange={(checked) =>
              isMulti
                ? toggleOptions(item.continentEng, checked)
                : toggleOption(item.continentEng, checked)
            }
          />
          <label htmlFor={item.continentEng}>
            {locale === "en" ? item.continentEng : item.continentUkr}
          </label>
        </div>
      ))}
    </>
  );
};
export default ContinentsCheckboxGroup;
