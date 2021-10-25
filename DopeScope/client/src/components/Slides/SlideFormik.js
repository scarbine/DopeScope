import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';

export const SlideFormik = () => (

  <div>
    <h1>Add New Slide</h1>
    <Formik
      initialValues={{
        id:'',
        name:'',
        description: '',
        imageUrl: '',
        microscopeId: '',
        dateCreated: '',
        magnification: ''
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
        if(slideId){
            updateSlide({
              id:slide.id,
              name:slide.name,
              description: slide.description,
              imageUrl: slide.imageUrl,
              microscopeId: slide.microscopeId,
              dateCreated: slide.dateCreated,
              magnification: slide.magnification
      
            }).then(history.push(`/slide/${slide.id}`))
          } else {
            addSlide({
              name:slide.name,
              description: slide.description,
              imageUrl: slide.imageUrl,
              microscopeId: slide.microscopeId,
              magnification: slide.magnification
      
            }).then(history.push("/slide"))
          }
      }}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" placeholder="Name" />

        <label htmlFor="description">Description</label>
        <Field id="description" name="description" placeholder="Description" />

        <label htmlFor="magnification">Magnification</label>
        <Field
          id="magnification"
          name="magnification"
          placeholder="10"
          type="text"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);
