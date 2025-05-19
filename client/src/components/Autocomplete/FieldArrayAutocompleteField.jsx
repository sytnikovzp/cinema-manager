import { Field } from 'formik';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function FieldArrayAutocompleteField({
  uuid,
  name,
  options,
  getOptionLabel,
  groupBy,
}) {
  return (
    <Field name={name}>
      {({ field, form }) => {
        let fieldValue = field.value;

        if (typeof fieldValue === 'object' && fieldValue !== null) {
          fieldValue = fieldValue.fullName || fieldValue.title || '';
        }

        const currentValue =
          options.find(
            (option) =>
              option.fullName === fieldValue || option.title === fieldValue
          ) || null;

        return (
          <Autocomplete
            disableClearable
            disablePortal
            fullWidth
            getOptionLabel={getOptionLabel}
            groupBy={groupBy}
            id={uuid}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(form.errors[name] && form.touched[name])}
                helperText={
                  form.errors[name] && form.touched[name]
                    ? form.errors[name]
                    : ''
                }
              />
            )}
            value={currentValue}
            onChange={(event, newValue) => {
              form.setFieldValue(
                name,
                newValue ? newValue.fullName || newValue.title || '' : ''
              );
            }}
          />
        );
      }}
    </Field>
  );
}

export default FieldArrayAutocompleteField;
