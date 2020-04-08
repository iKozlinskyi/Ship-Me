import React from 'react';
import {Formik} from 'formik';
import {Button, Form} from 'react-bootstrap';
import * as yup from 'yup';
import {get} from 'lodash';

const schema = yup.object({
  name: yup.string().required('Name is a required field'),
  payload: yup.number()
      .min(1).max(99999).required('Max payload is required'),
  width: yup.number().min(1).max(9999).required('Width is required'),
  height: yup.number().min(1).max(9999).required('Height is required'),
  length: yup.number().min(1).max(9999).required('Length is required'),
});

const EditLoadForm = ({
  load,
  setIsEditMode,
  onUpdateLoad,
  onCreateLoad,
}) => {
  const handleSubmit = async (formValues) => {
    const loadData = {
      name: formValues.name,
      payload: formValues.payload,
      dimensions: {
        width: formValues.width,
        height: formValues.height,
        length: formValues.length,
      },
    };

    load !== undefined ? await onUpdateLoad(load._id, loadData) :
        await onCreateLoad(loadData);
    setIsEditMode(false);
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        name: get(load, 'name', ''),
        payload: get(load, 'payload', ''),
        width: get(load, 'dimensions.width', ''),
        height: get(load, 'dimensions.height', ''),
        length: get(load, 'dimensions.length', ''),
      }}
    >{({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
      }) => (
        <Form>
          <Form.Group controlId="formLoadName">
            <Form.Label>Load Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter load name"
              value={values.name}
              name="name"
              onChange={handleChange}
              isInvalid={touched.name && !!errors.name}
            />

            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formpayload">
            <Form.Label>Payload</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter load payload"
              value={values.payload}
              name="payload"
              onChange={handleChange}
              isInvalid={touched.payload && !!errors.payload}
            />

            <Form.Control.Feedback type="invalid">
              {errors.payload}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Width</Form.Label>
            <Form.Control
              type="number"
              placeholder="Width"
              value={values.width}
              name="width"
              onChange={handleChange}
              isInvalid={touched.width && !!errors.width}
            />
            <Form.Control.Feedback type="invalid">
              {errors.width}
            </Form.Control.Feedback>

            <Form.Label className="mt-1">Height</Form.Label>
            <Form.Control
              type="number"
              placeholder="Height"
              value={values.height}
              name="height"
              onChange={handleChange}
              isInvalid={touched.height && !!errors.height}
            />
            <Form.Control.Feedback type="invalid">
              {errors.height}
            </Form.Control.Feedback>

            <Form.Label className="mt-1">Length</Form.Label>
            <Form.Control
              type="number"
              placeholder="Length"
              value={values.length}
              name="length"
              onChange={handleChange}
              isInvalid={touched.length &&!!errors.length}
            />
            <Form.Control.Feedback type="invalid">
              {errors.length}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="warning"
            type="button"
            onClick={() => setIsEditMode(false)}
            className="mr-2"
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
          >
                Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditLoadForm;
