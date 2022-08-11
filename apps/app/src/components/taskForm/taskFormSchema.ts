import * as Yup from 'yup';

const taskFormSchema = Yup.object({
  title: Yup.string().required(),

  description: Yup.string().required(),
});

export default taskFormSchema;
