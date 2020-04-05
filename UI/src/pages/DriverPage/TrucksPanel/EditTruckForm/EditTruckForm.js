import React from 'react';
import {Formik} from 'formik';
import {Button, Form} from 'react-bootstrap';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is a required field'),
  maxPayload: yup.number()
      .min(1).max(99999).required('Max payload is required'),
  width: yup.number().min(1).max(9999).required('Width is required'),
  height: yup.number().min(1).max(9999).required('Height is required'),
  length: yup.number().min(1).max(9999).required('Length is required'),
});

const EditTruckForm = ({truck, setIsEditMode, onUpdateTrucks}) => {
  const handleSubmit = async (formValues) => {
    const truckData = {
      name: formValues.name,
      maxPayload: formValues.maxPayload,
      dimensions: {
        width: formValues.width,
        height: formValues.height,
        length: formValues.length,
      },
    };

    await onUpdateTrucks(truck._id, truckData);
    setIsEditMode(false);
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        name: truck.name,
        maxPayload: truck.maxPayload,
        width: truck.dimensions.width,
        height: truck.dimensions.height,
        length: truck.dimensions.length,
      }}
    >{({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
      }) => (
        <Form>
          <Form.Group controlId="formTruckName">
            <Form.Label>Truck Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter truck name"
              value={values.name}
              name="name"
              onChange={handleChange}
              isInvalid={touched.name && !!errors.name}
            />

            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formMaxPayload">
            <Form.Label>Maximum Payload</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter max truck payload"
              value={values.maxPayload}
              name="maxPayload"
              onChange={handleChange}
              isInvalid={touched.maxPayload && !!errors.maxPayload}
            />

            <Form.Control.Feedback type="invalid">
              {errors.maxPayload}
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

export default EditTruckForm;
