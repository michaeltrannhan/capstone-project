import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { useField, useFormikContext } from "formik";
type Props<TInputDate, TDate> = {
  name: string;
} & Omit<DatePickerProps<TInputDate, TDate>, "onChange" | "value">;

const FormikDatePicker = <TInputDate, TDate = TInputDate>(
  props: Props<TInputDate, TDate>
) => {
  const { name, ...rest } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <DatePicker
      {...rest}
      value={field.value ?? null}
      onChange={(val) => {
        setFieldValue(name, val);
      }}
    />
  );
};
export default FormikDatePicker;
