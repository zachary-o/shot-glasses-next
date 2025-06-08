import { Continent, ContinentsCheckboxGroupProps } from "@/types";
import { useLocale } from "next-intl";
import { Checkbox } from "../ui/checkbox";

const ContinentsCheckboxGroup = ({
  value,
  isMulti,
  onValueChange,
  options,
}: ContinentsCheckboxGroupProps) => {
  const locale = useLocale();
  const selectedValues: Continent[] = Array.isArray(value)
    ? value.filter((v) => v.continentEng)
    : value && value.continentEng
    ? [value]
    : [];

  const handleToggle = (option: Continent, checked: string | boolean) => {
    if (isMulti) {
      const newSelected = checked
        ? [...selectedValues, option]
        : selectedValues.filter((v) => v !== option);
      onValueChange(newSelected);
    } else {
      const newSelected = checked
        ? option
        : { continentEng: "", continentUkr: "" };
      onValueChange(newSelected as Continent);
    }
  };

  return (
    <>
      {options.map((item: Continent) => (
        <div className="flex items-center space-x-2" key={item.continentEng}>
          <Checkbox
            className="cursor-pointer"
            id={item.continentEng}
            checked={
              selectedValues.length > 0 &&
              selectedValues[0].continentEng === item.continentEng
            }
            onCheckedChange={(checked) => handleToggle(item, checked)}
          />
          <label className="cursor-pointer" htmlFor={item.continentEng}>
            {locale === "en" ? item.continentEng : item.continentUkr}
          </label>
        </div>
      ))}
    </>
  );
};
export default ContinentsCheckboxGroup;
