import PropTypes from 'prop-types';
import { Field } from 'formik';
// =============================================
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const GroupedAutocompleteField = ({
  id,
  name,
  options,
  getOptionLabel,
  groupBy,
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const currentValue =
          options.find(
            (option) =>
              option.full_name === field.value || option.title === field.value
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
            onChange={(event, value) => {
              form.setFieldValue(
                name,
                value ? value.full_name || value.title : ''
              );
            }}
            disableClearable={true}
            renderInput={(params) => (
              <TextField
                {...params}
                name={name}
                error={Boolean(params.error)}
                helperText={params.helperText}
              />
            )}
          />
        );
      }}
    </Field>
  );
};

GroupedAutocompleteField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  groupBy: PropTypes.func.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default GroupedAutocompleteField;
