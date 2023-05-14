import * as React from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
} from "@mui/material";

type MultipleSelectOptions = {
  label: string;
  value: string;
};

export type MultiSelectProps = {
  label: string;
  options: MultipleSelectOptions[];
  onChange: (value: string[]) => void;
};

export default function MultipleSelect({
  label,
  options,
  onChange,
}: MultiSelectProps) {
  const labelArray = options.map((option) => option.label);
  const valueArray = options.map((option) => option.value);
  const [currentValue, setCurrentValue] = React.useState<string[]>(valueArray);

  const handleChange = (event: SelectChangeEvent<typeof currentValue>) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    setCurrentValue(typeof value === "string" ? value.split(",") : value);
    onChange(currentValue);
  };
  return (
    <Grid container marginTop={-1.8}>
      <InputLabel id="multi-select">{label}</InputLabel>
      <Select
        labelId="multi-select"
        defaultValue={valueArray}
        multiple
        fullWidth
        value={currentValue}
        onChange={handleChange}>
        {valueArray.map((value, index) => (
          <MenuItem key={value} value={value}>
            {labelArray[index]}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
}
