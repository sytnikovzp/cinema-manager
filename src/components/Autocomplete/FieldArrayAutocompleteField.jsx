import PropTypes from 'prop-types';
import { Field } from 'formik';
// =============================================
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const FieldArrayAutocompleteField = ({
  id,
  name,
  options,
  getOptionLabel,
  groupBy,
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        let fieldValue = field.value;

        if (typeof fieldValue === 'object' && fieldValue !== null) {
          fieldValue = fieldValue.full_name || fieldValue.title || '';
        }

        const currentValue =
          options.find(
            (option) =>
              option.full_name === fieldValue || option.title === fieldValue
          ) || null;

        return (
          <Autocomplete
            disablePortal
            id={id}
            options={options}
            groupBy={groupBy}
            getOptionLabel={getOptionLabel}
            fullWidth
            value={currentValue}
            onChange={(event, newValue) => {
              form.setFieldValue(
                name,
                newValue ? newValue.full_name || newValue.title || '' : ''
              );
            }}
            disableClearable
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
          />
        );
      }}
    </Field>
  );
};

FieldArrayAutocompleteField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  groupBy: PropTypes.func,
};

export default FieldArrayAutocompleteField;
